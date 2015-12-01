// webpack.config.js
var Path = require("path");

module.exports = {
  entry: {
    bundle: ["./public/javascripts/entry.js"]
  },

  output: {
    path: Path.resolve(__dirname, "./public/javascripts/"),

    // 有 multiple entry point 時，這裏一定要用變數寫法，不然多個產出 js file 會彼此覆寫
    filename: "[name].js",      
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    root: Path.resolve('./public/'),
    extensions: ['', '.js', '.css']
  }
};