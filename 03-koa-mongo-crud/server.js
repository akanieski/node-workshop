module.exports = function(cb) {
    'use strict'
    var Koa = require('koa');
    var KoaRouter = require('koa-router');
    var koaBodyParser = require('koa-bodyparser');
    var app = Koa();

    var publicRoutes = new KoaRouter();
    var securedRoutes = new KoaRouter();

    app.use(koaBodyParser());

    // logger
    app.use(require('./middleware/logger'));

    // setup public routes
    publicRoutes.get('/api/system', require('./api/system'));
    publicRoutes.get('/api/employees', require('./api/employees/list'));
    publicRoutes.post('/api/employee', require('./api/employees/create'));
    publicRoutes.get('/api/employee/:id', require('./api/employees/detail'));
    publicRoutes.put('/api/employee/:id', require('./api/employees/update'));



    // add public routes
    app.use(publicRoutes.routes());

    cb(app.listen(5002));

}