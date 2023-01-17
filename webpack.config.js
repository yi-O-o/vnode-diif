const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //入口
    entry:'./src/main.js',
    //出口
    output:{
        path:undefined,
        filename:'dist.js'
    },
    module:{
      
    },
    plugins:[
        new HtmlWebpackPlugin({template: './public/index.html'})
    ],
    mode:'development',
    devServer:{
        host:'127.0.0.1',
        port:8080,
        open: true,
        hot:true
    }
}