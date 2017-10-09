/**
 * 将hot-reload相关的代码添加到entry chunks
合并基础的webpack配置
使用styleLoaders
配置Source Maps
配置webpack插件
 */
var utils = require('./utils')
var path = require('path');
var webpack = require('webpack')
var config = require('../config')
// 一个可以合并数组和对象的插件
var merge = require('webpack-merge')
//
var vueLoaderConfig_px2rem = require('./vue-loader-px2rem.conf')
// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于更友好地输出webpack的警告、错误等信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//引入基础配置
var baseWebpackConfig = require('./webpack.base.conf')
let rules = utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
let ruleH5 = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: vueLoaderConfig_px2rem,
  include: [path.resolve(__dirname, '../src/components')]
}
rules.push(ruleH5)


// 合并基础的webpack配置
module.exports = merge(baseWebpackConfig, {
  // 配置样式文件的处理规则，使用styleLoaders
  module: {
    rules: rules
  },
  // cheap-module-eval-source-map is faster for development
  // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
