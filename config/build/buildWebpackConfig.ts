import path from "path";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { IBuildOptions } from "./types/config";
import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
export const buildWebpackConfig = (
  options: IBuildOptions
): webpack.Configuration => {
  const { mode, paths, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
  };
};
