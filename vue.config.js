module.exports = {
  lintOnSave: false, // 关闭语法检查
  devServer: {
    proxy: {
      '/wang': {
        target: 'http://localhost:5000',
        pathRewrite: {'^/wang': ''},
        ws: true,
        changeOrigin: true
      },
    }
  }
}