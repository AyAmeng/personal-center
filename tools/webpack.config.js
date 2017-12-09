const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack')
//用于插入html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清除输出目录，免得每次手动删除
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/main.tsx'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:4].js'
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.js', '.ts', '.tsx', '.styl', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve('src'),
        use:  ['cache-loader', 'happypack/loader?id=ts']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'template/index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    //持久化moduleId，主要是为了之后研究加载代码好看一点。
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: ['ts-loader?transpileOnly=true&happyPackMode=true']
    }),
  ]
};
