'use strict'
const Mongorito = require('mongorito');
const Employee = require('../../models/employee')
const Department = require('../../models/department')

module.exports = function*(next){
    try {
        Mongorito.connect(Employee.getConnectionUrl())
        
        let result = yield Employee
            .findOne({employeeId: this.params.id})
        
        if (!result) {
            this.body = {data: null, success: false}
            this.response.status = 404
        } else {
            this.body = {
                data: result.toJSON(), 
                success: true
            }
        }
        
        yield next
    } catch (err) {
        console.log(err.stack)
        this.body = err
        this.response.status = 500
        yield next
    }
}