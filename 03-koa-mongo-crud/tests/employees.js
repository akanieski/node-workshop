"use strict"

let assert = require('assert')
let request = require('request')
let host = 'http://127.0.0.1:5002/api'

let StartServer = require('../server')
let _server = null

before(function(done) {
    StartServer(function(server){
        _server = server
        done()
    })
})

after(function(done){
    _server.close()
    done()
})

describe('Employees API', function(){
    it('Return a list of employees', function(done){
        
        request(`${host}/employees`, function(err, response){
            
            response.body = JSON.parse(response.body)
            
            assert.notEqual(response.body, null)
            assert.notEqual(response.body.data, null)
            assert.equal(response.body.success, true)
            assert.notEqual(response.body.data.length, 0)
            
            done()
            
        })
        
    })
    it('Return a specific employee', function(done){
        
        request(`${host}/employee/100001`, function(err, response){
            
            response.body = JSON.parse(response.body)
            
            assert.notEqual(response.body, null)
            assert.notEqual(response.body.data, null)
            assert.equal(response.body.success, true)
            assert.notEqual(response.body.data._id, null)
            assert.notEqual(response.body.data.employeeId, null)
            assert.notEqual(response.body.data.firstName, null)
            assert.notEqual(response.body.data.lastName, null)
            
            done()
            
        })
    })
    it('Return an updated employee', function(done){
        
        request.put({url: `${host}/employee/100002`, json: {
            id: 100002,
            firstName: 'TEST',
            lastName: 'TEST'
        }}, function(err, response){
            
            assert.notEqual(response.body, null)
            assert.notEqual(response.body.data, null)
            assert.equal(response.body.success, true)
            assert.notEqual(response.body.data._id, 0)
            assert.equal(response.body.data.firstName, 'TEST')
            assert.equal(response.body.data.lastName, 'TEST')
            
            done()
            
        })
    })
    it('Return a newly created employee', function(done){
        
        request.post({url: `${host}/employee`, json: {
            id: 100004,
            firstName: 'Johnny',
            lastName: 'Rocket'
        }}, function(err, response){
        
            assert.notEqual(response.body, null)
            assert.notEqual(response.body.data, null)
            assert.equal(response.body.success, true)
            assert.equal(response.body.data.firstName, 'Johnny')
            assert.equal(response.body.data.lastName, 'Rocket')
            assert.notEqual(response.body.data._id, 0)
            
            done()
            
        })
    })
})