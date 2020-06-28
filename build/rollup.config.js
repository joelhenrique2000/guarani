'use strict'

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const banner = require('./banner.js')
const path = require('path')
const pkg = require("./../package.json");

const plugins = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled'
  })
]

const external = ['@popperjs/core']

const rollupConfig = {
  input:  path.resolve(__dirname, './../src/index.js'),
  output: [
    {
      banner,
      file: pkg.main,
      format: 'umd'
    },
    {
      banner,
      file: pkg.module,
      format: 'es'
    }
  ],
  external,
  plugins
}

module.exports = rollupConfig
