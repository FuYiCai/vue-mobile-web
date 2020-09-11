
module.exports = {
    pwa: {
      iconPaths: {
        favicon32: 'favicon.png',
        favicon16: 'favicon.png',
        appleTouchIcon: 'favicon.png',
        maskIcon: 'favicon.png',
        msTileImage: 'favicon.png'
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
          target: 'http://192.168.2.164:8080/api/',
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