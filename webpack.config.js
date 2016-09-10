var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname,
  entry:{
    hot:[
  	'webpack-dev-server/client?http://localhost:9090',
  	'webpack/hot/only-dev-server'
  	],
    'index': './examples/index.jsx',
  },
  output:{
    filename:'[name].bundle.js',
    publicPath:'/assets/'
  },
  module:{
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
    }],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exculde:[/node_modules/],
        loader: 'babel'
      }
    ]
  },
  devtool: 'eval',
  devServer:{
    devtool: 'eval',
    hot: true,        //自动刷新
    port: 8090,
    inline: true,
    host: '0.0.0.0',
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js', '.jsx'],
    modules: ['node_modules',],
  },
  plugins:[
    // react热启动插件
    new webpack.HotModuleReplacementPlugin(),
    // webpack-dev-server插件，可以将错误以在console中输出而不改变页面报错
    new webpack.NoErrorsPlugin(),
    new webpack.PrefetchPlugin('lodash'),
 ]
}
