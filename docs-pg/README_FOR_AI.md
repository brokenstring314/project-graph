# 项目介绍

这是一个绘制网状节点图的工具。目前采用json存储数据工程文件。

## 技术栈

基于 Tauri 框架，TypeScript + React + Rust。其中Rust只负责基础的本地文件处理部分，绝大部份功能由前端完成。

前端UI采用 tailwindcss 完成。

使用 monorepo 管理项目，主要分为 app（应用程序本体） 和 docs（软件官网） 两个部分。

使用 pnpm 作为包管理工具。

## 代码要求

rust中的函数提供给前端调用，函数在运行中绝对不能出现报错，必须要保证函数内部捕获所有可能出现的错误，函数的健壮性。否则会导致程序直接闪退
