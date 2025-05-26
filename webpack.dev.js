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
    static: {
      directory: "./dist",
      watch: true,
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
