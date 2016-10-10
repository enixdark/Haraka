/**
 * Created by cqshinn on 30/09/2016.
 */
var Sequelize = require('sequelize');
var util = require('util');
var Email = undefined;
exports.init = function(host,port, username, password, database, table ) {
    if(!Email){
        var sequelize = new Sequelize(util.format('mysql:\/\/%s:%s@%s:%s\/%s', username, password, host, port, database));
        Email = sequelize.define(table , {
            subject: Sequelize.STRING,
            status: Sequelize.STRING,
            account_id: Sequelize.STRING,
            campaign_id : Sequelize.STRING,
            header: Sequelize.STRING,
            recipient: Sequelize.STRING,
            from: Sequelize.STRING,
            body: Sequelize.STRING,
            domain_id: Sequelize.STRING,
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        },{timestamps: false} );
    }
    return Email;
};