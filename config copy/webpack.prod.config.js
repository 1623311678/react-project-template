/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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

  const publicPath = "https://cdn1.funpinpin.com/admin/static/";

  const fileLoaderPath = "file-loader?name=[name].[hash].[ext]";
  return {
    mode: "production",
    devtool: false,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [pathsPlugin],
      alias: {
        "@src":path.resolve(__dirname,'../src'),
      },
    },
    entry: {
      fitShop: path.resolve(__dirname,'../src/app.tsx')
    },
    output:{
      chunkFilename: `[name].[chunkhash].js`,
      filename: `[name].[chunkhash].js`,
      path: resolve(dashboardBuildPath),
      publicPath
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
           MiniCssExtractPlugin.loader,
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
            MiniCssExtractPlugin.loader,
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
    optimization: {
      minimize: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: {
        minSize: 10000,
        chunks: "all",
        cacheGroups: {
          editorjs: {
            name: "chunk-editjs",
            priority: 10,
            test: /[\/]node_modules[\/]@editorjs[\/]/,
            enforce: true
          },
          material: {
            name: "chunk-material",
            priority: 11,
            test: /[\/]node_modules[\/]@material-ui[\/]/,
            enforce: true
          },
          react: {
            name: "chunk-react",
            priority: 82,
            test: /[\/]node_modules[\/](react|react-dom|react-router|react-router-dom)[\/]/,
            enforce: true
          },
          antd: {
            name: "chunk-antd",
            priority: 13,
            test: /[\/]node_modules[\/](antd|@ant-design|rc-\w+)[\/]/,
            enforce: true
          },
          echarts: {
            name: "chunk-echarts",
            priority: 13,
            test: /[\/]node_modules[\/](echarts)[\/]/,
            enforce: true
          },
          moment: {
            chunks: "all",
            name: "moment",
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](moment|moment-timezone)[\\/]/,
            priority: 24,
            enforce: true
          }
        }
      },
      minimizer: [
        // webpack:production模式默认有配有js压缩，但是如果这里设置了css压缩，js压缩也要重新设置,因为使用minimizer会自动取消webpack的默认配置
        new CssMinimizerPlugin({
          parallel: true,
          minimizerOptions: {
            preset: [
              "default",
              {
                discardComments: { removeAll: true }
              }
            ]
          },
          minify: CssMinimizerPlugin.cleanCssMinify
        }),
        new TerserPlugin({
          include: path.resolve(__dirname,'../src'),
          exclude: /node_modules/,
          terserOptions: {
            ecma: 5,
            parse: {},
            compress: {},
            drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
            drop_debugger: true, //干掉那些debugger;
            pure_funcs: ["console.log"], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
            module: false,
            format: {
              comments: false
            }
          },
          extractComments: false
        })
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
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
      }),
    ]
  };
};