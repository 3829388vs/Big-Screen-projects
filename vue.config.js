const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8081,
    proxy: {
      // "/kfq": {
      //   target: 'http://192.168.3.42:8080',
      //   changeOrigin: true,
      //   secure: false,
      // },
	  "/kfq": {
	    target: 'https://203.88.203.38:8080/',
	    changeOrigin: true,
	    secure: false,
	  },
    }
  }
})
