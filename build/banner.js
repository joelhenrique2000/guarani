'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * MeUI Framework${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright 2020-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/joelhenrique2000/meui/blob/main/LICENSE)
  */`
}

module.exports = getBanner
