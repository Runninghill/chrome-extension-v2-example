const webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin,
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
let alias = {};
let secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));
let fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

let options = {
  mode: process.env.NODE_ENV || "development",
  // Define Javascript files under the entry key
  entry: {
    background: path.join(__dirname, "src", "background-script.js"),
    contentScript: path.join(__dirname, "src", "content-script.js"),
    extensionDialogPage: path.join(__dirname, "src", "pages", "extension-dialog-page", "extension-dialog.page.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["contentScript"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin([{
      from: "src/manifest.json",
      transform: function (content, path) {
        // Adds the description and version in the package.json to the manifest.json file
        return Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        }))
      }
    }]),
    // Define html files under the plugins key using the HtmlWebpackPlugin (one entry per html file)
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "extension-dialog-page", "extension-dialog.page.html"),
      filename: "extension-dialog.page.html",
      chunks: ["extension-dialog.page"]
    }),
    new WriteFilePlugin()
  ]
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;