---
title: webpack入门学习笔记02 —— 初始化一个webpack项目
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-6-15 00:00:00
---

## 1. 写在前面

现在我们就开始正式学习 **webpack** 了，webpack是帮助我们打包编译项目的，所以在正式开始之前，我们需要初始化一个基于webpack的项目。

在本篇博客中，将会涉及到以下的知识点：

- 初始化一个基于webpack的项目
- 体会webpack的默认打包设置
- 自定义webpack的打包配置文件

## 2. 初始化一个基于webpack的项目

这一步简单，我们可以使用 **npm** 或者 **yarn** 包管理工具来帮助我们快速初始化一个项目，相信很多前端从事者对这两个工具都不会陌生。所以这里就进行深入讲解这两款工具。

我习惯于使用 **yarn** ，所以可以直接创建一个新的文件夹，然后在终端下运行命令 **`yarn init`** 即可初始化一个项目。在这一步可能会让你输入一些项目的基本信息，如下所示：

```vue
question name (test):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
```

你根据自己的实际情况输入即可，当然也可以一路回车，这样会使用默认的选项初始化一个项目。

初始化完成之后，在该文件夹下，会生成一个 **package.json** 文件，这个文件记录项目的基本信息，同时会记录之后我们安装的第三方包。在后面的项目中，我们还可以在里面定义一些脚本，帮助我们管理项目，这在后面的博客中会提到。

项目初始化完成之后，我们需要安装两个包，即 **webpack** 和 **webpack-cli** ，这两个包就是用来打包编译项目的。安装的步骤很简单，直接在终端下执行以下yarn命令即可：

```shell
yarn add webpack webpack-cli -D
```

说明一下：以上命令中的 **-D** 选项，表明这两个包是开发依赖，项目上线的时候不需要这两个包。

这两个包安装完成之后，这个基于webpack的项目也就创建好了，可以继续后续工作了。

## 3.体会webpack的默认打包设置 

项目创建好之后，我们可以不对webpack进行配置即可进行使用，因为webpack有自己默认的配置。下面来体会一下它的默认配置。

在项目目录中创建一个 **src** 目录，用来存放项目代码。在该目录下创建一个 **index.js** 文件，注意一定是这个名字，这是webpack默认配置的要求。在该文件中，我们使用node语法引入另外一个文件 **name.js** ，代码如下：

```js
let myName = require("./name.js")
console.log(myName);
```

其中 **name.js** 文件中的代码如下：

```js
module.exports = "Allen Feng"
```

上面使用的是Node.js语法，如果使用浏览器来直接渲染的话，是不能成功渲染的。这个时候我们可以使用webpack进行打包编译，直接在终端中运行命令 **`npx webpack`** ，稍微等待一会即可打包成功。

打包完成之后，观察项目目录，可以看到这个时候多出一个文件夹 **dist** ，点进去之后可以看到打包后的文件 **main.js** 。如果这个时候在 **dist** 文件夹下创建一个 **html** 文件，通过 **script标签** 引入main.js文件便可以在浏览器的控制台中看到打印出的 **Allen Feng**。

这就是使用 **webpack** 的默认配置打包出来的效果，总结一下，在webpack的默认配置中：

- src目录下一定要有**index.js**文件，这是默认配置中指定的入口文件
- webpack打包编译之后，会将最终的代码放在 **dist** 文件夹下。如果没有，就会创建该文件夹
- webpack默认打包模式是生产模式，即打包编译后的代码会被压缩。

## 4.自定义webpack的打包配置文件 

以上我们已经使用webpack的默认配置对项目进行打包编译，但是我们可能会遇到这样的需求：

- 我不想让webpack从 **index.js** 文件开始打包，而是从 **App.js** 文件开始打包
- 打包编译后的代码不放在 **dist** 目录下，而是其他目录
- 打包编译后的代码不要进行压缩
- ......

这个时候，我们就可以自定义webpack的配置，来达到想要的效果。步骤很简单，在项目的主目录下（即和package.json同级）新建一个 **webpack.config.js** 文件，这是webpack的配置文件。在该文件中，可以书写以下代码对webpack进行配置：

```js
let path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: { 
        filename: "index.js",  
        path: path.resolve(__dirname, "dist")  
    }
}
```

如代码所示，我们可以在配置文件中，指定webpack的打包模式、打包的入口文件、打包的出口文件等。下面对这三个配置选项做详细的说明：

#### 1) mode: webpack的配置模式

webpack有两种配置模式：**production（生产模式）** 和 **development（开发模式）**。默认采用的是 **生产模式**，在该模式下，打包编译后的代码会被压缩，节省体积。

如果选择 **开发模式** , 那么最终的将不会被压缩，文件的体积会稍大。

#### 2) entry： webpack的入口文件

webpack进行打包编译，肯定要有一个指定的入口文件，这个文件便可以通过该属性指定。默认的入口文件是 **index.js** 文件。如果要把它更改为其他的文件，修改该属性即可。注意这个属性可以使用 **相对路径** 指定。

#### 3) output： webpack的出口文件

webpack打包编译后的代码放在哪里，是通过该属性指定的。在配置该属性的时候，要指定出口文件的 **文件名** 和 **路径** 。默认的路径是 **dist** 文件夹下的 **index.js** 文件。如果要修改为其他的路径和文件名，修改该属性即可。要注意，出口文件的路径配置要使用 **绝对路径** ，可以参考我上面的写法。

## 5. 后记

现在讲完了webpack三个基本选项的配置，我们就可以根据自己的需求来进行配置。后续会介绍其他的一些选项配置。大家加油！