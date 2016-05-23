"use-strict"
var Koa = require('koa');
var KoaRouter = require('koa-router');
var koaBodyParser = require('koa-bodyparser');
var app = Koa();

var publicRoutes = new KoaRouter();
var securedRoutes = new KoaRouter();

app.use(koaBodyParser());

// logger
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// setup public routes
publicRoutes.get('/api/system', function*(next){
    this.body = {
        pid: process.pid,
        platform: process.platform
    };
    this.response.status = 200
    yield next
});


// add public routes
app.use(publicRoutes.routes());

app.listen(5002);