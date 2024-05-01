const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Main.jsx',  // path to the entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', // Injects CSS into the DOM via a <style> tag
          'css-loader',   // Translates CSS into CommonJS modules
          'sass-loader'   // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource', // Handles and emits files as separate files and exports the URL
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'  // Path to your index.html file
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
        directory: path.join(__dirname, 'dist'),
      },
    compress: true,
    port: 8080,
    open: false // auto-opens a browser yo. 
  },
  mode: 'development',  // switch to 'production' when necessary
};
