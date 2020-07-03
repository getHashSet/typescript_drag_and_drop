// README: webpack does not look for this by default

const path = require("path"); // this is built into NodeJS
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production", // tell webpack this is a a production build.
  // this is how you export in NodeJS
  entry: "./src/app.ts", // tell webpack where our root file is relevent to this config file.
  output: {
    // tell webpack where we want our final javascript file to end up and what the name should be.
    // filename: "bundle.[contenthash].js", // you can create unique names using [contenthash]
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), //the path is NOT relevent to this config file and must use your root directory for directions.
  },
  devtool: "none", // make sure there are no generated dev tools
  module: {
    // see webpack module property for more information.
    rules: [
      {
        test: /\.ts$/, // regular expression used to identify files that end with .ts. \. = escape the dot, ts is the extesion, $ tells RegX this is where the line ends.
        use: "ts-loader", // the script that our .ts file will be handed to. ts-loader knows what to do with .ts files.
        exclude: /node_modules/, // if you do not exclude node modules you can break your npm installed items.
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // these are the accepted types of files after webpack builds a bundle.
  },
  plugins: [
    // these are extensions of webpack. This only matters in produciton.
    new CleanPlugin.CleanWebpackPlugin(), // this will clear the output folder keywords: delete remove clear
  ],
};
