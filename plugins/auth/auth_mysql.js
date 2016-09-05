// auth/auth_mysql

// documentation via: haraka -c /home/cqshinn/GIT/maillog/Haraka -h plugins/auth/auth_mysql

// Put your plugin code here
// type: `haraka -h Plugins` for documentation on how to create a plugin
var mysql  = require('mysql');
var async = require('async');
var crypto = require('crypto');
var util = require('util');
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


exports.check_plain_passwd = function (connection, user, passwd, cb) {
    // Get Mysql config

    var config = this.config.get('auth_mysql.ini');

    var rejectUnauthorized = (config.core.rejectUnauthorized != undefined) ?
    config.core.rejectUnauthorized : true;
    var tablename = config.core.tablename;
    var client = mysql.createConnection({
      host     : config.core.host,
      user     : config.core.username,
      password : config.core.password,
      database : config.core.database,
      // ssl      : {
      //     rejectUnauthorized: rejectUnauthorized
      // }
    });
    var self = this;


    client.connect(function(err) {
      if (err) {
         connection.logerror('error connecting: ' + err.stack);
         return;
      }

      connection.loginfo('connected as id ' + client.threadId);
        var md5_password = function (plain_pw, encrypted) {
            if (plain_pw == null) {
                return cb(false);
            }
            var md5 = crypto.createHash('md5').update(plain_pw.toString()).digest("hex");

            if (md5 === encrypted) {
                return cb(true);
            }
            return cb(false);
        };
        var query = util.format("select encrypted_password from %s where  email='%s' limit 1;", tablename, user);
        client.query(query, function (err, rows){
                if(err){
                    connection.loginfo("auth_mysql: " + err.message);
                    return cb(false);
                }
                else if(rows.lenght === 0){
                    connection.loginfo("no data for email: " + user);
                }
                else{
                    return md5_password(passwd,rows[0].encrypted_password);
                }
            });
    });
}

