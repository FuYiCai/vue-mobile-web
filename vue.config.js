
module.exports = {
    pwa: {
      iconPaths: {
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
      }
    },
    pages:{
      index: {
        entry: 'src/main.js',
        title: '贵州驭浪科技有限公司',
      },
    },
    devServer: {
      proxy: {
        '/api': {  
          target: 'https://sys.api.yulangsat.com/api/',
          ws: true,
          changeOrigin: true,
          pathRewrite : {
            "^/api" : ""
          }
        },
      }
    }
}
// 196  164