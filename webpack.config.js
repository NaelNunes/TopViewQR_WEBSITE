const path = require('path');

module.exports = {
  entry: './src/pages/main.jsx',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
};
