/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require('webpack-merge');
const Base = require('./webpack.base.config')

require("dotenv").config();
const resolve = path.resolve.bind(path, __dirname);

const dashboardBuildPath = path.resolve(__dirname,'../build')
const fileLoaderPath = "file-loader?name=[name].[ext]";
const devConfig = {
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, dashboardBuildPath),
    historyApiFallback: true,
    open: true,
    proxy: {
      "/admin/internal/web/graphql/core": {
        // target: "https://gaea-dashboard-api-test-7qy5ieof5a-uc.a.run.app/",
        target: "https://junkai-wang-shop.myfunpinpin.top/",
        secure: false,
        changeOrigin: true
      },
      "/admin/file": {
        target: "https://gaea-file-api-test-7qy5ieof5a-uc.a.run.app/",
        // target: "https://dongge.myfunpinpin.top/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          // "^/admin/file": ""
        }
      },
      "/admin/core-analyze": {
        // target: "https://gaea-core-analyze-api-test-7qy5ieof5a-uc.a.run.app/",
        target: "https://dongge.myfunpinpin.top/",
        secure: false,
        changeOrigin: true,
      }
    },
    hot: true,
    port: 9002
  },
  mode:'development',
  devtool:  "sourceMap",
  output:{
    chunkFilename: "[name].js",
    filename: "[name].js",
    path: resolve(dashboardBuildPath),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ].concat([
          {
            loader: "sass-resources-loader",
            options: {
              resources:  path.resolve(__dirname,'../src/styles/base.scss')
            }
          }
        ])
      },
      {
        include: [
          path.resolve(__dirname,'../node_modules'),
          path.resolve(__dirname,'../assets'),
        ],
        loader: fileLoaderPath,
        test: /\.(eot|otf|png|gif|svg|jpg|ttf|woff|woff2)(\?v=[0-9.]+)?$/
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  }
}
module.exports = merge(Base,devConfig)