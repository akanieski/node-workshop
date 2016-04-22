'use strict'

const packageInfo = require('../../package')

function* ApiVersion(next) {
    this.set('api-version', packageInfo.version)
    yield next
}

module.exports = ApiVersion;