import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "src/_js/main.js",
  sourceMap: true,
  plugins: [
    nodeResolve(),
    commonjs()
  ],
  output: {
    file: "_site/main.js",
    format: "iife",
    sourceMap: true,
    plugins: [terser()]
  }
};
