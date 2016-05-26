'use strict'
const Mongorito = require('mongorito');
const Employee = require('../../models/employee')

module.exports = function*(next){
    try {
        Mongorito.connect(Employee.getConnectionUrl())
        
        let emp = yield Employee.findOne({employeeId: this.params.id})
        
        if (!emp) {
            this.body = {data: null, success: false, error: "Could not find employee"}
            this.response.status = 404
            yield next
            return
        }
        
        for (var key in this.request.body) {
            emp.set(key, this.request.body[key])
        }
        
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