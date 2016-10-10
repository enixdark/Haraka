// auth/auth_mysql

// documentation via: haraka -c /home/cqshinn/GIT/maillog/Haraka -h plugins/auth/auth_mysql

// Put your plugin code here
// type: `haraka -h Plugins` for documentation on how to create a plugin
var mysql  = require('mysql');
var async = require('async');
var crypto = require('crypto');
var util = require('util');
var auth = require('./../models/mysql/auth');
exports.hook_capabilities = function (next, connection) {
  connection.loginfo('connected as id 1');
  // if (connection.using_tls) {
    var methods = [ 'LOGIN' ];
    connection.capabilities.push('AUTH ' + methods.join(' '));
    connection.notes.allowed_auth_methods = methods;
  // }
  next();
}

exports.register = function () {
  this.inherits('auth/auth_base');

}


exports.md5_password = function (plain_pw, encrypted, cb) {
    if (plain_pw == null) {
        return cb(false);
    }
    var md5 = crypto.createHash('md5').update(plain_pw.toString()).digest("hex");

    if (md5 === encrypted) {
        return cb(true);
    }
    return cb(false);
};

exports.check_plain_passwd = function (connection, user, passwd, cb) {
    // Get Mysql config
    var config = this.config.get('auth_mysql.ini');

    var rejectUnauthorized = (config.core.rejectUnauthorized != undefined) ?
    config.core.rejectUnauthorized : true;
    var tablename = config.core.auth_tablename;
    var Auth = auth.init(config.core.host, config.core.port, config.core.username, config.core.password,
                         config.core.auth_database, config.core.auth_tablename);

    Auth.findOne({ where: { email: user} }).then(function (model) {
        return exports.md5_password(passwd,model.dataValues.encrypted_password, cb);
    }, function (err) {
        connection.loginfo("auth_mysql: " + err.message);
        return cb(false);
    });

}

