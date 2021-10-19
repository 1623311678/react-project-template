/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const createHappyPlugin = (id, loaders) =>
  new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: process.env.HAPPY_VERBOSE === "1" // make happy more verbose with HAPPY_VERBOSE=1
  });

require("dotenv").config();
const resolve = path.resolve.bind(path, __dirname);

const pathsPlugin = new TsconfigPathsPlugin({
  configFile: path.resolve(__dirname,'../tsconfig.json')
});
const environmentPlugin = new webpack.EnvironmentPlugin({
  APP_MOUNT_URI: "/",
  DEPLOY_ENV: process.env.DEPLOY_ENV || "test"
});

const dashboardBuildPath = path.resolve(__dirname,'../build')

module.exports = (env, argv) => {
  const fileLoaderPath = "file-loader?name=[name].[ext]";

  return {
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
      port: 9004
    },
    mode:'development',
    devtool:  "sourceMap",
    entry: {
      fitShop: path.resolve(__dirname,'../src/app.tsx')
    },
    output:{
      chunkFilename: "[name].js",
      filename: "[name].js",
      path: resolve(dashboardBuildPath),
      publicPath: "/"
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [pathsPlugin],
      alias: {
        "@src":path.resolve(__dirname,'../src'),
      },
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: "happypack/loader?id=happybabel",
          // options: { 使用happypack, 需要把options写到对应的plugin里
          //   configFile: resolve("./babel.config.js")
          // },
          test: /\.(jsx?|tsx?)$/
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
    },
    plugins: [
      new WebpackBar(),
      environmentPlugin,
      createHappyPlugin("happybabel", [
        {
          loader: "babel-loader",
          options: {
            babelrc: true,
            configFile: path.resolve(__dirname,'../babel.config.js'),
            cacheDirectory: true // 启用缓存
          }
        }
      ]),
      new HtmlWebpackPlugin({
        title: "fitshop",
        template: path.resolve(__dirname,'../src/index.html'), // 源模板文件
        filename: "index.html"
      }),
    ]
  };
};