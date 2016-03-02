'use strict'
const PersonController = require('../app/controllers/person');
const express = require('express');
const bb = require('bluebird');

module.exports = function Router() {
    let router = express.Router();              // get an instance of the express Router
        
    // ROUTES FOR OUR API
    // =============================================================================
    router.get('/persons', bb.coroutine(PersonController.list));
    router.get('/persons/:id', bb.coroutine(PersonController.get));
    router.post('/persons', bb.coroutine(PersonController.create));
    router.put('/persons/:id', bb.coroutine(PersonController.update));
    router.delete('/persons/:id', bb.coroutine(PersonController.destroy));
    router.get('/test', bb.coroutine(PersonController.test));
    
    return router;
};