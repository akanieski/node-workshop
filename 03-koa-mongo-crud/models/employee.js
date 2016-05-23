'use strict'
const Mongorito = require('mongorito')

module.exports = class Employee extends Mongorito.Model {
    get collection() { 
        return 'employees';
    }
}