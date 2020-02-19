module.exports = {
  target: "web",
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              ["@babel/env", { targets: { browsers: ["last 7 versions"] } }]
            ]
          }
        }
      }
    ]
  }
};
