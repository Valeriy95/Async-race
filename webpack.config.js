const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
    //     test: /\.svg$/,
    //     // use: 'svg-loader',
    //     use: [
    //         {
    //           loader: 'svg-loader',
    //           options: {
    //             // name: '[name].[ext]',
    //             outputPath: 'assets/',
    //             publicPath: '/assets/',
    //           },
    //         },
    //       ],
    //   },
    //   {
    //     test: /\.(png|jpe?g|gif)$/i,
    //     // use: [
    //     //   {
    //         // loader: 'file-loader',
    //         // options: {
    //         //   name: '[name].[ext]',
    //         //   outputPath: path.resolve(__dirname, 'assets/'),
    //         //   publicPath: path.resolve(__dirname, 'dist/assets/images/'),

    //         //   outputPath: 'assets/',
    //         //   publicPath: '/assets/',
    //     //     },
    //     //   },
    //     // ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/assets/'),
        to: path.resolve(__dirname, 'dist/assets/'),
      },
      ],
    }),
  ],
};