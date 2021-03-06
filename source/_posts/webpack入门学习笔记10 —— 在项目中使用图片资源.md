---
title: webpack入门学习笔记10 —— 在项目中使用图片资源
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-7-28 00:00:00
---

## 1. 写在前面

在前端项目中，图片是必不可少的一种资源。在使用图片的时候，我们可以有以下几种方式：

- 在 **.html** 文件中，通过 **`<img src="" alt=""> `** 标签引入图片
- 在 **.css** 文件中，通过 **`background: url()`** 属性来引入图片
- 在 **.js** 文件中，通过 **`import`** 或者 **`require`** 语法来引入图片

但是在基于webpack的项目中，如果你只是简单的引入，而没有对这些图片文件做一些配置处理的话，是不能成功的。比如，如果你在一个 **.js** 文件中书写以下代码：

```js
import logo from './logo.png'
console.log(logo);
```

或者在 **.css** 文件中，书写以下代码：

```css
body {
    background-color: gray;
    background: url('./logo.png')
}
```

那么在进行打包编译项目或者启动本地开发服务器的时候，会报出以下错误：

![](http://q1d2135zd.bkt.clouddn.com//webpack-10-01.png)


错误提示很明显：我们需要一个合适的loader来处理这些图片文件。

那么在这篇博客中，我们就来讲述一下：如何进行配置webpack，使得图片资源可以在项目中被正常地使用。主要内容包括：

- 使用 file-loader 处理图片资源
- 使用 html-withimg-loader 处理图片资源

## 2. 使用 file-loader 处理图片资源 

首先讲述如何使用 **file-loader** 来处理图片资源，既然是一个loader，那么第一步肯定是安装，安装命令如下：

```shell
yarn add file-loader -D
```

安装完成之后，到 **webpack.config.js** 文件中进行配置，配置规则非常简单，这里直接给出代码：

```js
module.exports = {
    /* 节省篇幅，其他配置信息已省略 */
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,  // 使用正则匹配文件图片
                use: {
                    loader: 'file-loader'   	// 使用file-loader对这些文件进行处理
                }
            }
        ]
    }
}
```

这里将其他的配置规则省略了，如果你想看其他的配置规则，可以查看我的 **[GitHub仓库 - webpack-learning](https://github.com/Fengzhen8023/webpack-learning )** ,或者通过本文末尾的链接，跳转到我之前的博客中进行查看。

这里介绍一下 **file-loader** 的作用：对项目中使用到的图片文件进行处理，将处理后的文件保存到 **输出文件夹**

，并返回输出文件夹下该文件的 **URL** 。如此一来，这个文件就可以被正常使用。

下面我们在项目中体验一下这个loader的作用，在一个 **.js** 文件中书写以下代码，使用图片资源：

```js
import logo from './logo.png'   // 引入图片
console.log(logo);  

let img = new Image();
img.src = logo;

document.getElementsByTagName('body')[0].appendChild(img);
```

打包编译之后，就可以在页面上看到这样图片了。

同理，在 **.css** 文件中也可以正常使用图片资源，参考代码如下：

```css
body {
    background-color: gray;
    background: url('./logo.png')
}
```

如果这时候，你在 **.html** 文件中 **`<img src="" alt=""> `** 标签引入图片，webpack一样会报错。仅靠file-loader做不到这一点，为了解决这个问题，我们需要 **在file-loader的基础上**，使用下面讲到的loader。

## 3. 使用 html-withimg-loader 处理图片资源

这个loader的作用是：处理 **.html** 文件中引用的图片，使得图片能够被正常使用。但是要注意，使用这个loader的时候，同时也要使用上面的 **file-loader** 。

和上面一样，首先我们要做的还是进行安装，安装命令如下：

```shell
yarn add html-withimg-loader -D
```

安装完成之后，到 **webpack.config.js** 文件中进行配置，配置规则非常简单，这里直接给出代码：

```js
module.exports = {
 	/* 节省篇幅，其他配置信息已省略 */
    module: {
        rules: [
            // 配置 file-loader
            {
                test: /\.(png|jpg|jpeg|gif)$/,   
                use: {
                    loader: 'file-loader'    
                }
            },
            // 配置 html-withimg-loader
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}
```

配置完成之后，我们就可以在 **.html** 文件中正常使用图片，比如以下代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
	<!-- 引入logo.png图片 -->
    <img src="./logo.png" alt="">		
    
</body>
</html>
```

现在进行打包编译项目，得到编译后的 **index.html** 文件代码如下：

```html
<!DOCTYPE html>
<html lang=en>

<head>
    <meta charset=UTF-8>
    <meta name=viewport content="width=device-width,initial-scale=1">
    <meta http-equiv=X-UA-Compatible content="ie=edge">
    <title>Document</title>
</head>

<body>
    <!-- 注意这里的图片引用路径不再是logo.png -->
    <!-- 这个路径是 file-loader 对文件处理后生成新文件的路径 -->
    <img src=2b9a35ac93ae4d5ea1eb21230d61c324.png alt="">
</body>

</html>
```

这个时候在浏览器中打开编译后的 **index.html** 文件，就可以看到我们的图片了。

## 4. 优化图片处理方式，减少http请求 

在编写前端项目的过程中，我们可能会用到很多图片资源，有些图片非常小，只有几KB。但是这些小图片的数量有时却非常大，有的项目中可能有几十个甚至是上百个图片。

这就会导致一个问题：项目上线之后，为了请求这些图片资源，浏览器端会大量使用http请求来获取图片，这就可能导致浏览器的开销过大，性能较低。那么怎么来解决这个问题呢？

这里我们介绍一种编码方式——Base64编码。这不是一种加密解密方式，它是一种编码方式。简单来说，它的作用就是：使用字符来表示任意二进制文件（这些字符包括：**A B ... Z a b ... z 0 1 ... 9 + /** 等64个字符）。

为了更加贴切的体会Base64编码，你可以复制以下长长的Base64编码，粘贴到浏览器地址栏，便可以看到这段Base64编码表示的图片了。

```bas
data:image/png;base64,iVBORw0KGgoAAAANSUhEU 中间省略很长很长一段编码 AABJRU5ErkJggg==
```

使用Base64对图片进行编码，就可以将这些图片切入到静态的 **.html** 文件中，这样就不需要再使用http请求来获取图片了，从而节省浏览器开销，提高性能。

为了在基于Webpack的项目中使用Base64编码处理图片，我们需要使用 **url-loader** 来进行处理。首先安装该loader，安装命令如下：

```shell
yarn add url-loader -D
```

安装完成之后，我们到 **webpack.config.js** 文件中进行相关配置，配置非常简单，代码如下：

```js
module.exports = {
   /* 节省篇幅，其他的配置信息已省略 */
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 200*1024		// 小于200k的图片，使用Base64进行处理
                    }
                }
            }
        ]
    }
}
```

这里将其他的配置规则省略了，如果你想看其他的配置规则，可以查看我的 **[GitHub仓库 - webpack-learning](https://github.com/Fengzhen8023/webpack-learning )** ,或者通过本文末尾的链接，跳转到我之前的博客中进行查看。

上述配置非常好理解：对于png、jpg等图片格式的资源，使用url-loader进行处理，如果图片小于200k，那么就是用Base64进行编码；如果图片大于200k，就不做处理，使用http请求来获取图片。

配置完成之后，当我们编译项目时，就会在生成的 **.html** 文件中看到使用Base64编码后的图片，由于内容较多，就不贴代码，想查看的编译后代码的同学，可以点击 **[Github连接](https://github.com/Fengzhen8023/webpack-learning/blob/master/history/Base64Image.html )** 进行查看。

## 5. 写在最后

这是本篇博客的全部内容，关于 **file-loader** 的更多知识，推荐大家访问 **[webpack官网 - file-loader](https://www.webpackjs.com/loaders/file-loader/)** 。