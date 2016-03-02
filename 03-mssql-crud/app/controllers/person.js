'use strict'
const bb = require('bluebird');
const dbInfo = require('../../config/db');
const dbTypes = require('tedious').TYPES;

module.exports = {
    
    /**
     * List existing persons
     */
    list: function*(request, response, next) {
        var tds = require('tedious-promises');
        
        tds.setConnectionConfig(dbInfo);
                
        var results = yield tds.sql('select * from dbo.[persons]').execute();
           
        response.send(results);
    },
    
    /**
     * Get existing person
     */
    get: function*(request, response, next) {
        var tds = require('tedious-promises');
        
        tds.setConnectionConfig(dbInfo);
                
        var results = yield tds.sql('select top 1 * from dbo.[persons] where @id = id')
            .parameter('id', dbTypes.Int, request.params.id)
            .execute();
          
        if (results.length > 0) {
            response.send(results[0]);
        } else {
            response
                .status(404)
                .send({error: 'Person not found'});
        }
        
    },
    
    /**
     * Delete existing person
     */
    destroy: function*(request, response, next) {
        var tds = require('tedious-promises');
        
        tds.setConnectionConfig(dbInfo);
                
        var results = yield tds.sql('delete from dbo.[persons] where @id = id')
            .parameter('id', dbTypes.Int, request.params.id)
            .execute();
           
        response.send({});
    },
    
    
    /**
     * Create new person
     */
    create: function*(request, response, next) {
        try {
            var tds = require('tedious-promises');
            
            tds.setConnectionConfig(dbInfo);

            var results = yield tds.sql(`
                insert into dbo.[persons] (
                    firstName, 
                    lastName, 
                    streetAddress, 
                    streetAddress2, 
                    city, 
                    state, 
                    zipcode
                ) values (
                    @firstName,
                    @lastName, 
                    @streetAddress, 
                    @streetAddress2, 
                    @city, 
                    @state, 
                    @zipcode
                );
                
                select top 1 * from dbo.[persons] order by id desc;
            `)
                .parameter('firstName', dbTypes.VarChar, request.body.firstName)
                .parameter('lastName', dbTypes.VarChar, request.body.lastName)
                .parameter('streetAddress', dbTypes.VarChar, request.body.streetAddress)
                .parameter('streetAddress2', dbTypes.VarChar, request.body.streetAddress2)
                .parameter('city', dbTypes.VarChar, request.body.city)
                .parameter('state', dbTypes.VarChar, request.body.state)
                .parameter('zipcode', dbTypes.VarChar, request.body.zipcode)
                .execute();
                
            response.send(results && results.length > 0 ? results[0] : null);
            
        } catch (err) {
            
            response.status(500).send(err);
            
        } finally {
            next();   
        }
        
    },
    
    /**
     * List existing persons
     */
    test: function*(request, response, next) {
        var tds = require('tedious-promises');
        tds.setConnectionConfig(dbInfo);
        var transaction = yield tds.beginTransaction();
        
        try {
            yield transaction
                .sql('insert into dbo.[persons] (firstName) values (\'Test!!!\')')
                .execute();
            
            yield transaction
                .sql('insert into dbo.[persons] (firstName) values (\'Test!!!!!!\')')
                .execute();
                
            yield transaction.commitTransaction();
            response.send('Done');
            
        } catch (err) {
            yield transaction.rollbackTransaction();
            response.status(500).send(err);
            
        } finally {
            next();   
        }
    },
    
    
    /**
     * Update existing person
     */
    update: function*(request, response, next) {
        try {
            var tds = require('tedious-promises');
            
            tds.setConnectionConfig(dbInfo);

            var results = yield tds.sql(`
                -- Update person
                update dbo.[persons] set 
                    firstName = @firstName,
                    lastName = @lastName,
                    streetAddress = @streetAddress,
                    streetAddress2 = @streetAddress2,
                    city = @city,
                    state = @state,
                    zipcode = @zipcode
                where id = @id;
                
                -- Return update results
                select top 1 * from dbo.[persons] where id = @id;
            `)
                .parameter('id', dbTypes.Int, request.body.id)
                .parameter('firstName', dbTypes.VarChar, request.body.firstName)
                .parameter('lastName', dbTypes.VarChar, request.body.lastName)
                .parameter('streetAddress', dbTypes.VarChar, request.body.streetAddress)
                .parameter('streetAddress2', dbTypes.VarChar, request.body.streetAddress2)
                .parameter('city', dbTypes.VarChar, request.body.city)
                .parameter('state', dbTypes.VarChar, request.body.state)
                .parameter('zipcode', dbTypes.VarChar, request.body.zipcode)
                .execute();
                
            response.send(results && results.length > 0 ? results[0] : null);
            
        } catch (err) {
            
            response.status(500).send(err);
            
        } finally {
            next();   
        }
        
    },
    
};