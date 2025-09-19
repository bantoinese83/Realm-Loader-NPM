import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import replace from '@rollup/plugin-replace'

import { readFileSync } from 'fs'
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'RealmLoader'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env': JSON.stringify({}),
        preventAssignment: true
      }),
      resolve({
        browser: true
      }),
      commonjs(),
      postcss({
        extract: true,
        minimize: true
      }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ],
    external: []
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
]
