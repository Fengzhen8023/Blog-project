---
title: webpack入门学习笔记04 —— 安装和配置webpack开发服务器
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-6-21 00:00:00
---

## 1. 写在前面

在之前的博客中，每次使用webpack打包编译完成之后，我们都需要手动打开编译后的index.html文件，这样对于前端开发的调试很不方便。为了解决这一问题，webpack给出了 **开发服务器** 这一方案。在进行开发的过程中，我们可以使用webpack启动一个开发服务器，来实时查看自己的项目，很方便进行调试。

相信很多前端开发者都用过webpack的开发服务器，但是有些开发者不是很了解它。那么在这篇文章中，我就给大家介绍webpack的开发服务器，主要内容包括：

- 安装webpack的开发服务器
- 初步配置webpack的开发服务器
- 深入配置webpack的开发服务器

## 2. 安装webpack的开发服务器

首先执行一下命令来安装webpack的开发服务器：

```shell
yarn add webpack-dev-server -D
```

安装完成之后，我们就可以通过 **`npx webpack-dev-server`** 命令启动开发服务器，或者在 **package.json** 文件中新建一条脚本，后续就可以很方便地使用 **npm run** 或 **yarn** 来启动开发服务器。脚本配置如下：

```json
{
  "name": "webpack-learning",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server"
  },
  "devDependencies": {
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.5.1"
  }
}
```

启动本地服务器之后，我们便可以在浏览器中通过 **http://localhost:8080**  来访问项目了。截图如下：

![](http://q1d2135zd.bkt.clouddn.com//webpack-04-01.png)


## 3. 初步配置webpack的开发服务器

现在开发服务器已经启动了，但是显而易见的是，当前的开发服务器使用的是默认配置，很大程度上不能满足我们开发的需求，比如：

- 开发服务器不要使用8080端口号，使用其他的端口号
- 开发服务器打开之后，不是在根目录下，而是在 **build** 目录下
- 开发服务器启动之后，我希望自动打开浏览器
- ......

下面我们就讲解一下，如果初步配置开发服务器，完成上述需求。之所以说是初步配置，是因为开发服务器配置内容较多，后面准备单独写一篇博客，讲述开发服务器的详细配置。

其实初步配置开发服务器很简单，在 **webpack.config.json** 文件中新增 **devServer** 属性，该属性是一个对象，我们将一些配置信息写到该对象下即可，配置代码如下：

```js
let path = require("path");

module.exports = {
    devServer: {
        port: 3000,      		// 指定开发服务器的端口号
        progress: true, 		// 显示开启本地服务器的进度
        contentBase: "./build", // 指定本地服务器默认打开的目录
        compress: true      	// 是否对代码进行压缩
    },
    mode: "development",    
    entry: "./src/index.js",    
    output: {       
        filename: "index.js",   
        path: path.resolve(__dirname, "build")  
    }
}
```

现在再次开启开发服务器，就可以通过 **http://localhost:3000** 访问到项目的 **build** 目录了，默认寻找该目录下的 **index.html** 文件进行渲染，如果没有则展示该目录下的所有文件。

## 4. 深入配置webpack的开发服务器

以上就是对webpack开发服务器的安装和初步配置，但是上述的初步配置存在一些问题：我们希望开发服务器启动之后，就会显示我们项目的页面，但是上述配置中，如果要看到项目的页面，一个前提是build目录下必须存在index.html文件。但是这个文件是打包编译后才生成的，所以在开发服务器环境下可能不会存在，而且也不会实时刷新，所以很明显初步配置不能满足我们的开发需求。

正常情况下，我们希望看到的场景是：使用 **npm run** 或 **yarn** 来启动开发服务器之后，就可以实时看到项目的页面，如果项目有代码的更新，页面也要实时更新。要做到这一点，我们需要完成以下步骤：

#### 1) 安装 html-webpack-plugin 插件

执行 **`yarn add html-webpack-plugin -D`** 进行安装该插件

#### 2） 配置 html-webpack-plugin 插件

安装完成之后，我们就需要到 **webpack.config.js** 文件中配置该插件，其实webpack之所以有这么强大的功能，就是依靠各种各样的插件。所以在webpack配置文件中，肯定会有各种插件的相关配置。这里介绍  **html-webpack-plugin** 插件的配置，其他插件的配置如出一辙。

首先在  **webpack.config.js** 文件中引入安装的  **html-webpack-plugin** 插件，然后新建一个 **plugins** 属性，该属性是一个数组，webpack使用到的插件，都要在这个数组中进行配置。我们先来看一下具体的配置代码：

```js
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin")		// 引入安装的插件

module.exports = {
    devServer: {
        port: 3000,      		// 指定开发服务器的端口号
        progress: true, 		// 显示开启本地服务器的进度
        contentBase: "./build", // 指定本地服务器默认打开的目录
        compress: true      	// 是否对代码进行压缩
    },
    mode: "development",    
    entry: "./src/index.js",    
    output: {       
        filename: "index.js",   
        path: path.resolve(__dirname, "build")   
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',		// 模板文件
            filename: 'index.html',				// 开发服务器中生成的临时文件
            minify: {
                removeAttributeQuotes: true,	// 是否去除文件中的双引号
                collapseWhitespace: true		// 是否去除文件中的空行
            },
            hash: true		// 引入文件的时候添加哈希值，防止缓存的问题
        }),
    ]
}
```

下面讲述一下以上文件中的一些配置选项：

- **template**： 模板文件。webpack开发服务器启动的时候，会将项目的代码打包编译成一个或多个 **.js** 文件，但是这些文件不能直接在浏览器中打开，需要在一个 **.html **文件中引入，才能正常被浏览器渲染。模板文件就是这个 **.html** 。webpack打包编译后的 **.js** 脚本文件会自动地被引入到该模板文件中。
- **filename**： 开发服务器中打包编译后生成的 **临时文件** 的文件名，默认是 **index.html** 。生成的这个文件是一个临时文件，存放在内存中，在项目中是看不到的。但是这个文件非常重要，当我们在浏览器中访问 **http://localhost:3000** ，看到的页面，就是这个文件渲染出来的。同时这个文件也是模板文件和webpack打包后的 **.js** 文件结合生成的。
- **minify**： 表示是否对打包编译生成的代码进行处理，比如去除空行、去除双引号等。
- **hash**：哈希值。如果在模板文件中，直接引入打包编译后的 **.js** 文件，那么有的时候会受到缓存的影响，但是加上哈希值，就不会存在这个问题。如果不加hash值，在临时文件中引入 **.js** 文件可能是这个情况：**`<script src="index.js"></script>`** ；如果加上了hash值，在临时文件中引入 **.js** 文件可能是这个情况：**`<script src="index.js?fb39b867e8a90e7cc9ec"></script>`** 。有效解决了缓存带来的影响。

这里需要说明的是， **html-webpack-plugin** 插件的配置不仅适用于开发服务器，再进行打包编译的时候，该插件的相关配置也会发挥作用，比如指定的模板、是否删除双引号、是否删除空行等。

#### 3） 创建模板文件

在上述叙述中，我们知道在启动开发服务器的时候，要有一个模板文件，所以我们要在项目中创建一个模板文件。根据上面的配置要求，该文件是位于 **src** 文件夹下的 **index.html** 文件。参考代码如下：

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

    <h1>这是一个模板文件</h1>
    
</body>
</html>
```

## 5. 后记

以上就我在学习webpack过程中对开发服务器的一些总结。总的来说，开发服务器就是对当前项目进行打包编译，将生成的文件存放在内存中，然后起一个本地服务。我们在浏览器中访问这个本地服务（如 **http://localhost:3000** ）来访问内存的 **index.html** 文件，进而看到我们的项目。

而且，这个过程是实时热更新的，一旦项目代码有变化，开发服务器会自动进行打包编译，这样我们看到的项目就是最新的。
