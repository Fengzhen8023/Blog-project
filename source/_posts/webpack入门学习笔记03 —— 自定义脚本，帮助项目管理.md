---
title: webpack入门学习笔记03 —— 自定义脚本，帮助项目管理
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-6-19 00:00:00
---

## 1. 写在前面

经过前两章博客的基础讲解，我们知道如果想要打包编译项目，可以执行 **`npx webpack`** 命令，然后webpack就会根据配置文件 **webpack.config.js** 来对项目进行打包编译。但是现在我们可能遇到以下需求：

- webpack的配置文件不要叫做webpack.config.js,而是叫做 webpack.config.allen.js
- 每次打包编译的时候，都要使用 **`npx webpack`** 命令。我不喜欢这个命令，给我改成 **`yarn build`** 命令
- ......

看似都是一些很无理的要求，但是确实是我们在架构项目的时候需要考虑到的问题。既然如此，本篇博客就来介绍如何满足以上两个需求。

## 2. 指定webpack配置文件

首先我们来讲一下，如果指定webpack的配置文件。

前面提到，在打包编译项目的时候，我们需要运行  **`npx webpack`** 命令，然后webpack就会根据webpack.config.js文件来进行打包编译。这里要说的是， **`npx webpack`** 命令是可以指定一些参数的，比如如果我们想要指定webpack的配置文件为 **webpack.config.allen.js** ，那么可以执行以下命令：

```shell
npx webpack --config webpack.config.allen.js
```

通过上面的指令，我们便可以使用 **webpack.config.allen.js** 作为webpack的配置文件，对项目进行打包编译。

## 3. 自定义脚本命令

现在来解决第二个需求：如何使用  **`yarn build`** 命令来进行项目的打包编译。

在之前的博客中，我提到过 **package.json** 文件的作用，其中一个就是自定义一些脚本，然后使用 **npm run** 或者 **yarn** 来运行这些脚本，执行所定义的命令。这里我们就可以使用这种方式，自定义脚本来进行打包编译。

新建脚本的步骤非常简单，在 **package.json** 文件中新建 **scripts** 属性，该属性为一个对象，给这个对象添加属性键值对即可新建脚本。如果要满足上述第二个需求，可以这样配置：

```
{
  "name": "webpack-learning",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --config webpack.config.allen.js"
  },
  "devDependencies": {
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  }

```

现在自定义脚本已经创建完成，我们便可以通过 **`npm run build`** 或者 **`yarn build  `** 来执行webpack的打包编译命令了。

## 4. 后记

这篇博客我们主要讲解了如何自定义脚本来帮助我们管理项目，这里只介绍了如何创建webpack打包编译的脚本，其他脚本也是非常类似的，在后面的博客中会陆续提到。

大家加油！