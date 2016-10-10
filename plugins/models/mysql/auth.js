/**
 * Created by cqshinn on 30/09/2016.
 */
var Sequelize = require('sequelize');
var util = require('util');
var Auth = undefined;
exports.init = function(host,port, username, password, database, table ) {
    if(!Auth){
        var sequelize = new Sequelize(util.format('mysql:\/\/%s:%s@%s:%s\/%s', username, password, host, port, database));

        Auth = sequelize.define(table , {
            email: Sequelize.STRING,
            username: Sequelize.STRING,
            encrypted_password: Sequelize.STRING,
            password_salt: Sequelize.STRING
        },{timestamps: false} );
    }
    return Auth;
};