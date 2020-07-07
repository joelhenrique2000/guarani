'use strict'

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgo from 'rollup-plugin-svgo'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'

const banner = require('./banner.js')
const BUNDLE = process.env.BUNDLE === 'true'
const ESM = process.env.ESM === 'true'
const path = require('path')
const pkg = require("./../package.json")
let fileDest = `meui${ESM ? '.esm' : ''}`
const external = ['@popperjs/core']

const globals = {
  '@popperjs/core': 'Popper'
}

const plugins = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled'
  }),
  svgo()
]

if (BUNDLE) {
  fileDest += '.bundle'
  // Remove last entry in external array to bundle Popper
  external.pop()
  delete globals['@popperjs/core']
  plugins.push(resolve())
}

const rollupConfig = {
  input: path.resolve(__dirname, `../js/index.${ESM ? 'esm' : 'umd'}.js`),
  output: {
    banner,
    file: path.resolve(__dirname, `../dist/js/${fileDest}.js`),
    format: ESM ? 'esm' : 'umd',
    globals
  },
  external,
  plugins
}

if (!ESM) {
  rollupConfig.output.name = 'meui'
}

module.exports = rollupConfig
