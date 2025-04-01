import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";

export const buildPlugins = (): webpack.WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new webpack.ProgressPlugin(),
  ];
};
