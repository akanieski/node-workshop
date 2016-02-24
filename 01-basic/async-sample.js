/* global process */
'use strict'
const async = require('async');
const bluebird = require('bluebird');

class AsyncSample {
    
    /*
        This function fires off each executeQuery function one after the other
        however, they each call does not wait for the previous call to complete first.
        This is not the desired result.
    */
    startSynchronous() {
        // Completely Wrong
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        this.executeQuery('select * from users');
        console.log('Done');
    }
    
    /*
        The most rudimentary way of executing async calls in a series is to nest
        callbacks. This approach is typically poor style once you exceed a number
        of indents.
    */
    startNestedCallbacks() {
        // Working but pretty bad style
        this.executeQuery('select * from users', (err, users) => {
            console.log(`There are ${users.length} users.`);
            this.executeQuery('select * from users', (err, users) => {
                console.log(`First user's username is ${users[0].username}`);
                this.executeQuery('select * from users', (err, users) => {
                    this.executeQuery('select * from users', (err, users) => {
                        this.executeQuery('select * from users', (err, users) => {
                            console.log('Done');
                        });
                    });
                });     
            });
        });  
    }
    
    /*
        Using a flow control library like 'async' makes available to you a number
        of quality of life functions that will help you to better organize your
        code. This approach is an improvement on nested callback approach, however
        you are still dependent on callbacks
    */
    startAsyncPackage() {
        // A little better
        async.series([
            (next) => { 
                this.executeQuery('select * from users', (err, users) => {
                    console.log(`There are ${users.length} users.`);
                    next();
                });
            },
            (next) => { 
                this.executeQuery('select * from users', (err, users) => {
                    console.log(`First user's username is ${users[0].username}`);
                    next();
                }); 
            },
            (next) => { this.executeQuery('select * from users', next) },
            (next) => { this.executeQuery('select * from users', next) },
            (next) => { this.executeQuery('select * from users', next) },
        ], () => {
            console.log('Done');
        });
    }
    
    /*
        Promises provide a cleaner approach that allow you to chain your logic
        in a series of .then() calls. This aproach is on par with flow control 
        libraries like 'async', at least in regard to code simplicitly.
    */
    startPromises() {
        // a little better
        this.executeQueryAsync('select * from users')
            .then((users) => {
                console.log(`There are ${users.length} users.`);
                return Promise.resolve();
            })
            .then(() => this.executeQueryAsync('select * from users'))
            .then((users) => {
                console.log(`First user's username is ${users[0].username}`);
                return Promise.resolve();
            })
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => this.executeQueryAsync('select * from users'))
            .then(() => {
                console.log('Done'); 
            });
    }
    
    /*
        Promises are great, but there are alot of libraries out there that do not
        support the use of promises naturally. By using bluebird.promisify we can 
        convert our callback styled functions(error first callbacks only) to promises. 
        This allows you to reuse old code and still use promises.
    */
    startLegacyPromises() {
        // a little better, and allows you to recommission old "UnPromised" callbacks
        var executeQueryPromise = bluebird.promisify(this.executeQuery, this);
        executeQueryPromise('select * from users')
            .then((users) => {
                console.log(`There are ${users.length} users.`);
                return Promise.resolve();
            })
            .then(() => executeQueryPromise('select * from users'))
            .then((users) => {
                console.log(`First user's username is ${users[0].username}`);
                return Promise.resolve();
            })
            .then(() => executeQueryPromise('select * from users'))
            .then(() => executeQueryPromise('select * from users'))
            .then(() => executeQueryPromise('select * from users'))
            .then(() => {
                console.log('Done'); 
            });
    }
    
    /*
        Flow control and Promises are cool. But there is an even greater tool that
        has been made available in ES6, generators. Generators allow you to yield,
        or 'pause' your routine to wait for results. This is very much like C#'s 
        await command. 
        
        The major upside here is that you can write your code (inside generator function) 
        in a 'synchronous' fashion. We achieve this by using the bluebird.coroutine() 
        function.
    */
    startGenerators() {
        // the best option! wrapping your generator in bluebird's coroutine allows for 
        // synchronous style of programming you are used to in classic C#/VB
        let app = this;
        bluebird.coroutine(function*(){
            var users = yield app.executeQueryAsync('select * from users');
            
            console.log(`There are ${users.length} users.`);
            
            yield app.executeQueryAsync('select * from users');
            
            console.log(`First user's username is ${users[0].username}`);
            
            yield app.executeQueryAsync('select * from users');
            yield app.executeQueryAsync('select * from users');
            yield app.executeQueryAsync('select * from users');
            console.log('Done');
        })();
    }
    
    
    
    
    
    
    
    
    /*
        Do work for 1 second without using a promise
    */
    executeQuery(query, callback) {
        setTimeout(() => {
            console.log('Work Done.')
            if (callback) 
                callback(0, [{
                        id: 1,
                        username: 'bob'
                    },{
                        id: 2,
                        username: 'billy'
                    }]);
        }, 1000);
    }
    
    /*
        Promisified version of "executeQuery"
    */
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