/* global process */
'use strict'
const async = require('async');
const bluebird = require('bluebird');

class AsyncSample {
    
    constructor() {
        // Add constructor logic here 
    }
    
    startSynchronous() {
        // Completely Wrong
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        console.log('Done');
    }
    
    startNestedCallbacks() {
        // Working but pretty bad style
        this.executeQuery('select * from users', () => {
            this.executeQuery('select * from users', () => {
                this.executeQuery('select * from users', () => {
                    this.executeQuery('select * from users', () => {
                        this.executeQuery('select * from users', () => {
                            console.log('Done');
                        });
                    });
                });     
            });
        });  
    }
    
    startAsyncPackage() {
        // A little better
        async.series([
            (next) => { this.executeQuery('select * from users', next) },
            (next) => { this.executeQuery('select * from users', next) },
            (next) => { this.executeQuery('select * from users', next) },
            (next) => { this.executeQuery('select * from users', next) },
            (next) => { this.executeQuery('select * from users', next) },
        ], () => {
            console.log('Done');
        });
    }
    
    startPromises() {
        // a little better
        this.executeQueryAsync('select * from users')
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => {
                console.log('Done'); 
            });
    }
    
    startLegacyPromises() {
        // a little better, and allows you to recommission old "UnPromised" callbacks
        var executeQueryPromise = bluebird.promisify(this.executeQuery, this);
        executeQueryPromise('select * from users')
            .then(() => executeQueryPromise('select * from users'))
            .then(() => executeQueryPromise('select * from users'))
            .then(() => executeQueryPromise('select * from users'))
            .then(() => executeQueryPromise('select * from users'))
            .then(() => {
                console.log('Done'); 
            });
    }
    
    startGenerators() {
        // the best option! wrapping your generator in bluebird's coroutine allows for 
        // synchronous style of programming you are used to in classic C#/VB
        let app = this;
        bluebird.coroutine(function*(){
            var users = yield app.executeQueryAsync('select * from users');
            console.log(users.length);
            
            yield app.executeQueryAsync('select * from users');
            yield app.executeQueryAsync('select * from users');
            yield app.executeQueryAsync('select * from users');
            yield app.executeQueryAsync('select * from users');
            console.log('Done');
        })();
    }
    
    
    
    
    
    
    
    
    // Below are the definition of the "work" functions
    
    executeQuery(query, callback) {
        setTimeout(() => {
            console.log('Work Done.')
            if (callback) callback(0, []);
        }, 1000);
    }
    
    executeQueryAsync(query) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Work Done.')
                resolve([{
                    id: 1,
                    username: 'bob'
                },{
                    id: 2,
                    username: 'billy'
                }]);
            }, 1000);
        });
    }
    
}

module.exports = AsyncSample;