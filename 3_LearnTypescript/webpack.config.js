const path = require("path"); // this is built into NodeJS

module.exports = {
  mode: 'development', // tell webpack this is a local build. This will skip steps and make the code easier to debug.
  // this is how you export in NodeJS
  entry: "./src/app.ts", // tell webpack where our root file is relevent to this config file.
  output: {
    // tell webpack where we want our final javascript file to end up and what the name should be.
    // filename: "bundle.[contenthash].js", // you can create unique names using [contenthash]
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), //the path is NOT relevent to this config file and must use your root directory for directions.
    publicPath: 'dist', // this is the public path. This is needed for the webpack-dev-server. This is for local only and has no affect on production code.
  },
  devtool: "inline-source-map", // tell webpack that we are making source maps already
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
};
