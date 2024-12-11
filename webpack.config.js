module.exports = {
  entry: "./src/game.js", // Your entry JavaScript file
  output: {
    filename: "bundle.js", // Output bundled file
    path: __dirname + "/dist", // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel only to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
