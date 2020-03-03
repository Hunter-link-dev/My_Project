module.exports = {
      lintOnSave: false,
      
      
      devServer:{
        port:8080,
        host:"localhost",
        https:false,
        open:true,
        proxy:{
          '/api':{
                target:'http://localhost:4000',
                changeOrigin:true,
                pathRewrite:{
                  '^/api': ''
                }
            }
        },
        // chainWebpack: config => {
        //   config.resolve.alias
        //       .set('vue$', 'vue/dist/vue.esm.js')
        //       .set('@',resolve('src'))
        //       .set('@assets',resolve('src/assets'))
        //       .set('components', resolve('src/components'))
        //       .set('common',resolve('src/common'))
        //       .set('base',resolve('src/base'))
        //       .set('api',resolve('src/api')),
        //   config.resolve.symlinks(true)
        
        // },
    },
}
