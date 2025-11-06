const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/index.ts',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
   },
   mode: 'development',
   module: {
      rules: [
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader',
         },
      ],
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
   },
   devtool: 'source-map',
   plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [{ from: 'public' }],
      }),
   ],
   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
      watchFiles: ['src/**/*', 'public/**/*'],
   },
};
