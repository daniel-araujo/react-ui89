import fs from 'fs/promises'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import svgr from '@svgr/rollup'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

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
      svgr(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        modules: true,
        extract: true,
        minimize: true,
        sourceMap: true
      }),
    ],
    external: Object.keys(packageJson.peerDependencies),
  }
]
