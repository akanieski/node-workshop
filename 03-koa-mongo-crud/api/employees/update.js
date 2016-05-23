'use strict'
const Mongorito = require('mongorito');
const Employee = require('../../models/employee')

module.exports = function*(next){
    try {
        Mongorito.connect(process.env.MONGO_DB)
        
        let emp = yield Employee.findById(this.params.id)
        
        delete this.request.body._id // remove id because that cannot be updated
        
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