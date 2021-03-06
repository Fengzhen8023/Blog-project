---
title: webpack入门学习笔记08 —— 使用ESLint检查项目代码
categories:
  - Webpack
tags:
  - Webpack
  - 前端
comments: true
abbrlink: 47582
date: 2019-7-21 00:00:00
---

## 1. 写在前面

JavaScript作为一门动态语言，灵活性是它的一个优点，同时又是一个缺点。有的时候因为语法太过于灵活，导致一些隐藏的Bug被我们忽略，代码质量得不到保证。

为了提到项目代码的质量，大多数架构师在初始化项目的时候，都会使用一个检查工具来帮助实现代码的规范性和正确性，同时也可以提高项目代码后期的可维护性。在基于webpack的项目中，经常被使用到的代码检查工具是 **ESLint** 。

![](http://q1d2135zd.bkt.clouddn.com//webpack-08-01.png)


它就像是一个测试人员一样，告诉你哪里写得不对（**errors**），哪里写得不好（**warnings**）。那么在本篇博客中，就讲解如何在自己的项目中，配置使用 **ESLint** 这一检查工具。主要内容有：

- 安装并配置 ESLint-loader
- 根据实际情况，编写ESLint的配置文件

## 2. 安装并配置 ESLint-loader

**ESLint** 这一代码检查工具在项目中的使用体现是一个 **loader** ，既然是loader，那么使用步骤和之前博客中讲述的几个loader一样，首先是安装，然后在webpack配置文件中，使用这些loader。

使用以下安装命令，安装 **eslint** 和 **eslint-loader** ：

```shell
yarn add eslint eslint-loader -D
```

安装完成之后，在 **webpack.config.js** 文件中，配置使用该loader的规则，配置非常简单，代码如下：

```js
module: {
    rules: [
        /** 其他的配置规则，节省篇幅，故省略  **/ 
        {
            test: /\.js$/, 
            use: {
                loader: 'eslint-loader', 
                options: {
                    enforce: 'pre' 
                }
            },
            exclude: /node_modules/
        }
    ]
}
```

这里将其他的配置规则省略了，如果你想看其他的配置规则，可以查看我的 **[GitHub仓库 - webpack-learning](https://github.com/Fengzhen8023/webpack-learning )** ,或者通过本文末尾的链接，跳转到我之前的博客中进行查看。

这里解释一下上面代码中标有注释的两个属性： **enforce** 和 **exclude** ：

 - **enforce**:  该属性表示loader的种类，loader有四种：**前置loader、后置loader、普通loader、内联loader** 。该属性默认是 **normal(即默认loader)** 。可以根据需要设置成 **pre(前置loader)** 或者 **post(后置loader)** 。

   属性的而不同导致loader的一些行为不同，前面博客中讲过：在webpack.config.js配置文件中，loader的执行顺序是 **从右到左，从下到上**  。但是：

   如果是前置loader，那么webpack会 **优先** 使用该loader处理文件；

   如果是后置loader，那么webpack会在普通loader **之后** 处理文件；

   如果是内联loader，可以在 **.js** 文件中使用，而 **不只是** 在webpack.config.js配置文件中使用。-

- **exclude** ：排除正则表达式匹配的文件或者文件夹，比如上述规则中，不使用eslint-loader对 **node_modules** 文件夹中的代码进行校验。

好了，现在配置完成之后，你是不是想马上体验一下ESLint的强大功能？如果这个时候你进行打包编译项目，那么会得到一下错误信息：

![](http://q1d2135zd.bkt.clouddn.com//webpack-09-01.png)


错误提示易懂，是因为我们没有配置ESlint的处理规则，这也是我们下面要讲述的知识点。

## 3. 编写ESLint的配置文件

如果你对ESLint非常熟悉，那么完全可以自己动手编写该配置文件，但是大多数人可能对ESLint的配置不是那么熟悉，这里推荐大家到 **[官网的Demo配置页面](https://cn.eslint.org/demo/)** ,根据自己的需求，来获取ESLint配置文件：

![](http://q1d2135zd.bkt.clouddn.com//webpack-08-03.png)


在该页面，根据实际情况选择你的项目需要，然后点击页面底部的 **Download .eslintrc.json file** 即可下载得到一份ESLint配置文件。

将这个文件重命名（在文件名之前加一个 **点**）得到 **.eslintrc.json** 文件，然后将这个文件放到你的项目根目录下，和 **webpack.config.js** 文件同级。

如此一来，便配置好了ESLint。这个时候再来打包编译项目或者开启本地开发服务器，就可以看到ESLint发挥的作用了。比如，一个不规范的代码可能会得到以下错误提示：

![](http://q1d2135zd.bkt.clouddn.com//webpack-08-04.png)


## 4. 写在后面

以上便是这篇博客的全部内容，如果想学习更多ESLInt的知识，推荐访问ESLint的官网：<https://cn.eslint.org/> 。


