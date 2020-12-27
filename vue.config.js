module.exports = {
  // 选项...
  // publicPath: '/demo2',
  devServer: {
      port: 8001, // 端口号，如果端口号被占用，会自动加1
      host: "localhost", //主机名， 127.0.0.1，  真机 0.0.0.0
      https: false, //协议
      open: true, //启动服务时自动打开浏览器访问
      proxy: {
        [process.env.VUE_APP_BASE_API]:{   //自动获取，注意要[]，在.env.development里配置
          
          target: process.env.VUE_APP_SERVICE_URL,
          changeOrigin: true,   //开启代理服务器
          pathRewite: {
            ['^' + process.env.VUE_APP_BASE_API]: ''   //自动获取
          }
        }
      }
  },

  lintOnSave: false, // 默认true，警告会被输出到命令行，但不会使得编译失败。如果为false，则不输出警告
  outputDir: "dist2", // 打包之后所在目录， 默认值 dist
  assetsDir: "assets", // 静态资源打包之后 存放路径 ，（相对于outputDir指定的路径）, 默认值 ''
  indexPath: "out/index.html", // index.html 主页面打包之后存放的目录（相对于outputDir指定的路径），默认值 index.html
  productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度 
  // filenameHashing: false, 打包时，静态文件不会生成hash值，一般不要这个
  
}