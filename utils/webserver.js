const WebpackDevServer = require("webpack-dev-server"),
    webpack = require("webpack"),
    config = require("../webpack.config"),
    env = require("./env"),
    path = require("path");

let options = (config.chromeExtensionBoilerplate || {});
let excludeEntriesToHotReload = (options.notHotReload || []);

for (let entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] =
      [
        ("webpack-dev-server/client?http://localhost:" + env.PORT),
        "webpack/hot/dev-server"
      ].concat(config.entry[entryName]);
  }
}

config.plugins =
  [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);

delete config.chromeExtensionBoilerplate;

let compiler = webpack(config);

let server =
  new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "../build"),
    sockPort: env.PORT,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true
  });

server.listen(env.PORT);
