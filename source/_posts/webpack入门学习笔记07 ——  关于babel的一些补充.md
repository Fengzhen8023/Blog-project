---
title: webpack入门学习笔记07 ——  关于babel的一些补充
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-7-13 00:00:00
---

## 1. 写在前面

在之前的一篇博客中：**[使用babel打包编译js文件](https://github.com/Fengzhen8023/webpack-learning/blob/master/blog/6.%20%E4%BD%BF%E7%94%A8babel%E6%89%93%E5%8C%85%E7%BC%96%E8%AF%91js%E6%96%87%E4%BB%B6.md)** ，简单介绍了如果在webpack中使用babel对高级JS语法进行转换，以方便浏览器能够识别。

但是babel的相关知识很多，不能面面俱到全部讲解，只能将我们项目中经常使用的一些插件或者配置介绍一下。我的目的是抛砖引玉，更多知识大家还是到babel官网学习：**<https://babeljs.io/>** 。

这篇博客中，根据我的学习，对babel做一些补充。随着自己学习的深入，我也会时常跟新这篇博客，完善babel相关的知识点。这篇博客的主要内容如下：

- **@babel/plugin-transform-runtime、@babel/runtime** 插件的介绍

## 2. @babel/plugin-transform-runtime、@babel/runtime插件 

首先说一下这两款插件的使用场景，在之前的博客中提到过：babel默认配置的转化能力有限，只能将部分ES6语法转换成ES6语法，如果想要将更高级的ES6语法或者ES7等语法转成低级语法，需要进行额外的配置。

熟悉ES6语法的程序员肯定了解ES6语法中的 **Generator 函数** 和 **Promise 对象** ，并且在项目中也会使用到这些高级语法。比如以下语法：

```js
function * generator() {
    yield 1;
}

console.log(generator().next(() => {
    console.log('generator 执行完毕');
}));
```

那么问题来了，当你打包编译项目之后，在浏览器端运行的时候，会发现控制台报错了：

![](https://upload-images.jianshu.io/upload_images/3879603-2b78e688ff596b0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这是因为babel的默认配置不支持转换这些高级语法，如果需要达到这个目的，就需要安装配置额外的插件，也就是我们现在提到的**@babel/plugin-transform-runtime、@babel/runtime** 插件。下面说一下如何安装配置：

首先安装 **@babel/plugin-transform-runtime** ，这是一个开发依赖，打包之后不需要这个包，所以执行下面的命令进行安装：

```shell
yarn add @babel/plugin-transform-runtime -D
```

然后安装 **@babel/runtime** ，需要说明的是，这是运行环境中所需要的依赖包，打包编译之后还是也是需要它的，所以执行下面的命令进行安装：

```shell
yarn add @babel/runtime
```

安装完成之后进行配置，配置的时候在上一篇博客配置babel的基础上进行配置即可，这里给出部分代码，具体的配置可以参考上一篇博客：**[使用babel打包编译js文件](https://github.com/Fengzhen8023/webpack-learning/blob/master/blog/6.%20%E4%BD%BF%E7%94%A8babel%E6%89%93%E5%8C%85%E7%BC%96%E8%AF%91js%E6%96%87%E4%BB%B6.md)** 。

```js
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'     // 预设，将ES6转成ES5
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',   
                        '@babel/plugin-transform-runtime'	// 配置运行时的转换插件
                    ]
                }
            },
            include: path.resolve(__dirname, 'src')  // 只转换src目录下的代码
        }
    ]
}
```

进行如上配置之后，就可以顺利运行项目中的  **Generator 函数** 和 **Promise 对象** 等语法了。

这里提一句：上面配置中的 **include** ，表示只对 **src目录** 下的 **.js** 文件进行匹配。除此之外，还可以使用 **exclude** 进行显示，表示匹配出这些文件夹之外的 **.js** 文件，支持使用正则表达式，比如：`exclude: /node_modules/ ` 。

## 3. 写在后面

以上就是本篇博客的全部内容，随和后面学习的升入，博客会被时常更新，错误之处，还希望各位大神指出。
