const vueConfig = {};
const path = require("path");
const webpack = require("webpack");

// Safari doesn't like not having quoted HTML attributes.
if (process.env.NODE_ENV === "production") {
  vueConfig.chainWebpack = config => {
    config.plugin("html").init((Plugin, args) => {
      const newArgs = {
        ...args[0]
      };
      newArgs.minify.removeAttributeQuotes = false;
      return new Plugin(newArgs);
    });
  };
  vueConfig.productionSourceMap = false;
}

module.exports = {
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        scss: path.resolve(__dirname, "src/scss")
      },
      // symlinks: false
    }
  },

  devServer: {
    host: "0.0.0.0",
    port: 3003,
    public: 'horseman.test:443',
    https: false,
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules\/(?!@bit)/,
      poll: 1000
    }
  },

  pwa: {
    workboxOptions: {
      navigateFallback: "index.html",
      skipWaiting: true
    }
  },

  transpileDependencies: [/node_modules\/@bit\/([A-z0-9-_.])+\/(?!node_modules)/],

  ...vueConfig
};
