'use strict'
const Employees = require('../../models/employees')

module.exports = function*(next){
    try {
                
        this.body = {
            data: Employees, 
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