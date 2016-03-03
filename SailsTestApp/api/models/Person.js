/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "persons",
  connection: "mssql",
  attributes: {
    firstName: {
        type: "string"
    },
    lastName: {
        type: "string"
    },
    streetAddress: {
        type: "string"
    },
    streetAddress2: {
        type: "string"
    },
    city: {
        type: "string"
    },
    state: {
        type: "string"
    },
    zipcode: {
        type: "string"
    },
    id: {
        type: "integer",
        primaryKey: true
    }
  }
};

