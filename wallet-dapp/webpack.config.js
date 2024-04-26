const path = require('path');

module.exports = {
  entry: './src/app.js',  // path to the entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    static: './dist',
    open: true,  // Automatically open the browser
  },
  mode: 'development',  // Use 'production' for production builds
};
