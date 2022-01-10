const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    hot: true,
    static: path.join(__dirname, "static"),
    historyApiFallback: {
      index: "./index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    extensions: [".ts", ".tsx", "js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: path.resolve("src"),
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            // 处理CSS兼容性，自动添加厂商前缀
            loader: "pastcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // 75px 转换成 1rem
              remPrecesion: 8, // 转换计算精度保留8位小数
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "static"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
};
