'use strict'
const Employees = require('../../models/employees')

module.exports = function*(next){
    try {
        
        let emp = Employees.find(e => e.id == this.params.id)
        
        if (emp) {
        
            this.request.body = undefined
        
            Object.assign(emp, this.request.body)
            
            this.body = {
                data: emp, 
                success: true
            }
        
        } else {
            
            this.body = {
                data: null, 
                success: false
            }
            this.response.status = 404
            
        }
        
        yield next
    } catch (err) {
        console.log(err)
        this.body = err
        this.response.status = 500
        yield next
    }
}