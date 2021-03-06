'use strict'
const Mongorito = require('mongorito')

module.exports = class Employee extends Mongorito.Model {
    get collection() { 
        return 'employees';
    }
    
    static getConnectionUrl() {
        return `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT || 27017}/${process.env.MONGO_DB}`;
    }
}