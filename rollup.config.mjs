import fs from 'fs/promises'

import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import css from "rollup-plugin-import-css";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from "vite-plugin-svgr";

const packageJson = JSON.parse(await fs.readFile('./package.json'))

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // Don't want peer dependencies of react-modal bundled in.
      peerDepsExternal({
        includeDependencies: true,
      }),
      svgr({
        include: "**/*.svg",
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      css({
        output: "index.css",
        minify: true,
      }),
    ],
    external: Object.keys(packageJson.peerDependencies),
  }
]
