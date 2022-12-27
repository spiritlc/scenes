// const webpack = require('webpack')
module.exports = {
  //部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === "production" ? "/online/" : "./",
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: true,
  // css相关配置
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/var.scss";`,
      },
    },
  },
  // webpack-dev-server 相关配置
  devServer: {
    // 设置代理
    hot: true, //热加载
    host: "0.0.0.0", //ip地址
    port: 8085, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
      "/apiprod": {
        target: "https://www.haigeek.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/apiprod": "",
        },
        headers: {
          host: "https://www.haigeek.com",
          origin: "https://www.haigeek.com",
          referer: "https://www.haigeek.com",
        },
      },
    },
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
  },
};
