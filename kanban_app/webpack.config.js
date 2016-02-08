const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};
const common = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }
};
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer:{
      contentBase:PATHS.build,
      historyApiFallback: true,
      hot:true,
      inline:true,
      progress: true,
      stats:'errors-only',
      host:process.env.HOST,
      port: process.env.PORT
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
if (TARGET === 'build') {
  module.exports = merge(common, {});
}
