import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

export default merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://54.151.129.129:8000",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        onProxyReq: function (proxyReq, req) {
          if (req.headers.authorization) {
            proxyReq.setHeader("Authorization", req.headers.authorization);
          }
        },
      },
    ],
    static: {
      directory: "./dist",
      watch: true,
      publicPath: "/",
    },
    client: {
      overlay: true,
      progress: true,
      reconnect: true,
    },
    watchFiles: ["src/**/*", "public/**/*"],
    compress: true,
  },
  optimization: {
    minimize: false,
  },
});
