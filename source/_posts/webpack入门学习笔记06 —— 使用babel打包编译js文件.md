---
title: webpack入门学习笔记01 —— webpack基本简介
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-6-30 00:00:00
---

## 1. 写在前面

在前端项目中，占主导地位的文件，我想应该是 **.js** 文件。随着 **JS语言** 的不断升级改进，越来越多的高级语法被加入到该语言中，比如我们熟知的 **ES6语法、ES7语法** 等。

虽然  **ES6语法、ES7语法** 我们写起来感觉非常方便，但是目前市面上的浏览器却不认识这些语法，这就导致我们辛辛苦苦做出来的项目却不能运行，让人很抓狂。这个时候我们要怎么办呢？

办法肯定是有的，我们可以借助webpack这一工具，来将这些高级语法，转换成浏览器能够识别的低级语法（如ES5语法），这样就可以使项目正常运行了。而webpack之所以能够做到这一点，是因为它使用了 **babel** 这一工具。这是一个什么工具呢？这篇博客就会来讲解。

为了方便不同的读者都能从这篇博客中有所收获，本篇博客准备在前半部分介绍如何在webpack中配置 **babel** 来编译转换高版本语法，在后半部分会讲解关于 **babel** 的知识。大家各取所需，根据自己的实际情况来选择阅读哪一部分。

## 2. 在webpack中配置babel，编译高本版JS语法

既然要使用 **babel** 我们就要先安装这些依赖包，这里我们需要安装三个包：**babel-loader 、 @babel/core 、 @babel/preset-env** ，安装命令如下：

```shell
yarn add babel-loader @babel/core @babel/preset-env -D
```

简单介绍一下这是三个包的：**babel-loader** 和 **@babel/core** 是核心插件。**@babel/preset-env** 是babel的 **预设** ，它的主要功能是将 **ES6** 语法转成 **ES5** 语法。

依赖包安装完成之后，要到 **webpack.config.js** 文件中进行配置，配置的步骤和前面博客中讲述的配置 **.css** 文件的步骤类似，这里直接给出配置代码（重点关注有注释的部分）

```js
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtract = require('mini-css-extract-plugin')

module.exports = {
    devServer: {
        port: 3000,  
        progress: true,  
        contentBase: "./build",  
        compress: true  
    },
    mode: "development",  
    entry: "./src/index.js",  
    output: {  
        filename: "index.js",  
        path: path.resolve(__dirname, "build")  
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true
        }),
        new MiniCssExtract({
            filename: 'main.css'
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtract.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtract.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,      // 匹配js文件，然后用下面所配置的工具对这些文件进行编译处理
                use: {
                    loader: 'babel-loader',     // babel的核心模块
                    options: {
                        presets: [              // 配置babel的预设，将ES语法转成ES5语法
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    }
}
```

配置完成之后，我们就可以在项目中使用 **ES6** 语法来编写项目了。注意我这里说的是 **ES6** 语法，如果在项目中你使用了更新的 **ES7** 语法，仅靠上面的配置是不行的，在你进行打包编译的时候会报错，比如在项目中使用了以下的 **ES7** 语法：

```js
class A {
    className = 'A' 
}

let a = new A();
```

这个时候再进行打包编译的时候，会报错以下错误：根据提示，是因为我们没有安装所需要的依赖包。

![](http://q1d2135zd.bkt.clouddn.com//webpack-06-01.png)


道理很简单，仅靠上面书写的 **babel** 配置，只能转换 **ES6** 语法，如果要转换更高版本的语法，就要进行其他配置，比如这里转换 **ES7** 语法。

根据提示，我们需要安装所需的包：**@babel/plugin-proposal-class-properties** ，安装代码如下：

```shell
yarn add @babel/plugin-proposal-class-properties -D
```

安装完成之后，修改 **webpack.config.js** 文件中的 **babel** 配置，修改后的代码如下:

```js
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [	// 配置babel插件，转换更更高版本语法
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }
}
```

同理，如果你在项目中使用了其他的高级语法，比如 **装饰器** ，那么也是需要额外配置的，这里就不一一阐述，到时候你可根据webpack的报错信息，进行查找配置即可。

到这里webpack打包编译 **.js** 文件的相关知识已经讲完，下面结合自己的认识，介绍一些 **babel** 的知识。

## 3. babel是个什么东西

首先列出babel的中文官网，更多知识可查阅该官网：**<https://www.babeljs.cn/>**  。

根据官网的定义：Babel 是一个 **工具链** ，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。 在具体的实践中，babel可以帮我们做一下事情：

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 [@babel/polyfill](https://www.babeljs.cn/docs/babel-polyfill) 模块)
- 源码转换 (codemods)
- 更多 ...

对于前端小白来说，上面的文字还不足以帮助他们了解babel，下面我用大白话来说一下：我们将babel类比成手机上使用的 **中英词典APP**。

我们知道，手机上安装的 **中英词典APP** 可以帮助我们将不认识的英文翻译成我们熟知的汉语，这样我们就可以理解单词和句子表达的意义了。类似，**babel** 可以将我们写的 **ES6** 语法翻译成浏览器熟悉的 **ES5** 语法，这样，浏览器就可以知道这些 **JS** 代码要做什么事情了。比如下面的例子：

![](http://q1d2135zd.bkt.clouddn.com//webpack-06-02.png)


**中英词典APP** 在我们安装之初，就可以将英文成中文，是因为开发程序员在这个APP中预先设置了中英翻译功能。同理，**babel** 在配置之初就可以将 **ES6** 语法翻译成 **ES5** 语法，是因为我们在配置之初，给 **babel** 指定了 **预设（presets）** ，才使得 **babel** 可以做到这一点。

默认状态下，**中英词典APP** 可以将英语翻译成汉语，但是不能将俄语翻译成汉语，因为程序员在开发之前，没有预先设置这个功能，如果我们想要这款APP也可以翻译俄语，那么就需要下载额外的 **俄语翻译扩展包** ，下载完成之后，就可以实现这个功能。

同理，在默认配置下， **babel** 可以将 **ES6** 翻译成 **ES5** ，但是不能将 **ES7** 翻译成 **ES5**。这是因为在 **babel** 中有将 **ES6** 翻译成 **ES5** 的 **预设（presets）** ，没有将 **ES7** 翻译成 **ES5** 的 **预设（presets）** 。如果要实现这个功能，我们就需要下载配置额外的 **插件**，比如第一节提到的 **@babel/plugin-proposal-class-properties** 。**插件** 配置下载配置完成之后，就可以将 **ES7** 等更高级语法翻译成 **ES5** 语法。

通过babel的中文官网，我们可以看到对于不同版本的语法，有不同的插件。相当于在 **中英词典APP** 中，对于不同的语言，有不同的扩展包，需要什么扩展包，我们下载即可。

![](http://q1d2135zd.bkt.clouddn.com//webpack-06-03.png)


根据个人的经验，在使用这些插件的时候，项目开发之初不用配置。在打包编译的时候，如果报错了，再根据报错信息，查看缺少什么插件，然后再进行配置即可。当然，如果你经验很丰富，一开始就知道要使用那些插件，那么肯定要提前配置，

## 4. 写在最后 

好了，以上就是本篇博客的所有内容了，只是个人学习过程中的一些心得体会，如果有不当的地方，还希望各位大神给出指点。

如果你想深入学习 **babel** ，可以看他们官网的文档，个人觉得还是非常详细的：**<https://www.babeljs.cn/docs/>** 