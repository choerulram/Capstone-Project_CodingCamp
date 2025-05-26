import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

export default merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
