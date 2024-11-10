import fs from 'fs/promises'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'

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
