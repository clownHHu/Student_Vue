const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const timeStamp = new Date().getTime();
module.exports = defineConfig({
  publicPath:"/",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/apis": {
        target: "http://localhost:8090",
        changeOrigin: true,
        pathRewrite: {
          "^/apis": "",
        },
      }
    }
  },
  configureWebpack: {
    output: {
      // 把应用打包成umd库格式
      library:'myLibrary',
      // 输出重构  打包编译后的文件名称  【模块名称.时间戳】
      filename: `[name].${timeStamp}.js`,
      libraryTarget:'umd',
      globalObject:'this',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
    module: {
      rules: [{
        test: /\.pdf$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2,
            name: 'files/[name].[ext]'
          }
        }]
      }]
    }
  }
})
