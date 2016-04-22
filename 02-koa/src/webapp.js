'use strict'
const koa = require('koa')
const KoaRouter = require('koa-router')
const requireDir = require('requiredir')
const colors = require('colors')

class WebApp {
    
    constructor(config) {
        console.log("Application initializing ..".cyan)
        console.log("")
        this.app = koa()
        this.config = config
        this._configure()
    }
    
    _configure() {
        console.log("Configuring application routes ..".cyan)
        this.router = KoaRouter(this.app)
        this.middleware = this.middleware || require('./middleware')
        for (let key of this.middleware.pipeline) {
            if (key === 'router*') 
                this._configureControllers() // load up standard router
            else
                this.app.use(this.middleware[key]) // continue loading middleware
        }
        console.log("")
    }
    
    _configureControllers() {
        this.middleware = this.middleware || require('./middleware')
        this.routes = require('./routes')
        
        for (let route in this.routes) {
            let routeVerb = route.split(' ')[0]
            let routePath = route.split(' ')[1]
            let routeController = this.routes[route].split('.')[0]
            let routeAction = this.routes[route].split('.')[1]
            let routeConfig = require('./controllers' + routePath)[routeAction]
            
            // make route configuration accessible through request context
            this.router[routeVerb.toLowerCase()](routePath, function*(next){
                this.routeConfig = routeConfig
                yield next
            })
            
            // add beforeAction middleware to pipeline
            if (routeConfig.beforeAction) {
                for (let middleware of routeConfig.beforeAction) {
                    if (typeof middleware === 'function')
                        this.router[routeVerb.toLowerCase()](routePath, middleware)
                    else
                        this.router[routeVerb.toLowerCase()](routePath, this.middleware[middleware])
                }
            }
            
            // add action to pipeline
            this.router[routeVerb.toLowerCase()](routePath, routeConfig.action)
            
            // add afterAction middleware to pipeline
            if (routeConfig.afterAction) {
                for (let middleware in routeConfig.afterAction) {
                    if (typeof middleware === 'function')
                        this.router[routeVerb.toLowerCase()](routePath, middleware)
                    else
                        this.router[routeVerb.toLowerCase()](routePath, this.middleware[middleware])
                }
            }
            console.log(`    - ${route} to ${this.routes[route]}  [${"✓".green}]`)
        }
        
        
        this.app.use(this.router.middleware())
    }
    
    start() {
        this.app.listen(this.config.port)
        console.log('Server is listening ..'.cyan)
    }
}

module.exports = WebApp;