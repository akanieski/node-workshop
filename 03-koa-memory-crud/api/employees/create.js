'use strict'
const Employees = require('../../models/employees')

module.exports = function*(next){
    try {
        
        let emp = this.request.body
        
        Employees.push(emp)
        
        this.body = {
            data: emp, 
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