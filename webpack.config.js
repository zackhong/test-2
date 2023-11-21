const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
mode: argv.mode === 'production' ? 'production' : 'development',

// This is necessary because Figma's 'eval' works differently than normal eval
devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    code: './src/code.ts', // This is the entry point for our plugin code.
    bundle: './src/main.js', // entry point for our ui code in Svelte
  },
  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: 'svelte-loader',
      },
    ],
  },
  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: ['.ts', '.js', '.svelte'],
    conditionNames: ['import', 'module', 'require', '.svelte'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/template.html',
      filename: 'ui.html',
      chunks: ['bundle'], // Include only main.js in the HTML
    }),
  ],
});