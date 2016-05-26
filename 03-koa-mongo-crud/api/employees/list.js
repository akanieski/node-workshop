'use strict'
const Mongorito = require('mongorito');
const Employee = require('../../models/employee')

module.exports = function*(next){
    try {
        Mongorito.connect(Employee.getConnectionUrl())
        
        let employees = yield Employee.all()
        
        this.body = {
            data: employees.filter(e => e.toJSON()), 
            success: true
        }
        
        yield next
    } catch (err) {
        console.log(err)
        this.body = err
        this.response.status = 500
        yield next
    }
}