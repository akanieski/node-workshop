'use strict'
const Mongorito = require('mongorito');
const Employee = require('../../models/employee')

module.exports = function*(next){
    try {
        Mongorito.connect(process.env.MONGO_DB)
        
        let result = yield Employee.findById(this.params.id)
        
        this.body = {
            data: result.toJSON(), 
            success: true
        }
        
        yield next
    } catch (err) {
        console.log(err.stack)
        this.body = err
        this.response.status = 500
        yield next
    }
}