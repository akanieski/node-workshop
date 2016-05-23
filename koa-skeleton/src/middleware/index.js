module.exports = {
    
    requestLogger: require('./requestLogger'),
    
    apiVersion: require('./apiVersion'),
    
    json: require('koa-json')(),
    
    pipeline: [
        'json',
        'requestLogger',
        'router*'
    ],
    
    
    
}