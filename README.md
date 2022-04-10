# K_UI

想搭建一个基于Vite+Vue3+TS的组件库开发项目，主要想要的功能点是

1. 组件开发调试
2. md文档预览
3. 组件库发布npm
4. 打包部署文档站点

想要做到的就是能够一边开发组件一边预览调试。最后能打包库发布npm也能打包文档项目发布提供出去。

## 本地开发调试

本地开发调试还是比较简单的：

在空白目录执行下列命令：

```bash
yarn create vite
```

依次填写项目名称和选择框架为 vue-ts 后，将会自动完成项目的初始化，代码结构如下：

```bash
.
├── README.md
├── index.html
├── package.json
├── public
├── src
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```
