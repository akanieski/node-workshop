'use strict'
module.exports = function*(next){
    this.body = {
        pid: process.pid,
        platform: process.platform
    };
    this.response.status = 200
    yield next
}