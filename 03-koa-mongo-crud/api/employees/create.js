'use strict'
const Mongorito = require('mongorito');
const Employee = require('../../models/employee')

module.exports = function*(next){
    try {
        Mongorito.connect(Employee.getConnectionUrl())
        
        let emp = new Employee(this.request.body)
        
        yield emp.save()
        
        this.body = {
            data: emp.toJSON(), 
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