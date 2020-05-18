const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {}

  if(isProd){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;

}

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    vendor: ["@babel/polyfill", "react"],
    index: ["@babel/polyfill", "./components/entrypoints/index.jsx"],
    admin: ["@babel/polyfill", "./components/entrypoints/admin.jsx"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "src", "public"),
  },
  optimization: optimization(),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style-min.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
        exclude: [/node_modules/, "/public/"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minify: true,
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", ".css", "*"],
  },
};

module.exports = config;