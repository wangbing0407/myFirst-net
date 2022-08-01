module.exports = {
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