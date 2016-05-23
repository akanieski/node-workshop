'use strict'
const Employees = require('../../models/employees')

module.exports = function*(next){
    try {
        
        let result = Employees.find(x => x.id == this.params.id)
        
        if (result) {
            this.body = {
                data: result, 
                success: true
            }
        } else {
            this.body = {
                success: true, 
                data: null
            }
            this.response.status = 404
        }
        
        yield next
    } catch (err) {
        console.log(err.stack)
        this.body = err
        this.response.status = 500
        yield next
    }
}