'use strict'

function* RequestLogger(next) {
    let start = new Date;
    
    yield next;
    
    console.log(`[${this.method}] ${this.url} - ${new Date - start}ms`);   
}

module.exports = RequestLogger;