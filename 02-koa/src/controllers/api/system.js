'use strict'
const os = require('os')

module.exports = {
    get: {
        beforeAction: ['apiVersion'],
        action: function*(next) {
            console.log("System Get called")
            this.statusCode = 200
            this.body = {
                os: {
                    uptime: os.uptime(),
                    hostname: os.hostname(),
                    platform: os.platform(),
                    type: os.type(),
                },
                pid: process.pid
            }
            yield next
        }
    }
}