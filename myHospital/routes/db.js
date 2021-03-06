var mysql = require('mysql');
var dbConfig = require('../config/config.js');
var db;

function connectDB() {
    if(!db){
        db = mysql.createConnection(dbConfig.connection);
        db.connect(function (err) {
            if(err){
                console.log(err.reason + ' problem with the db connection');
            }
        });

    }
    return db;
}

module.exports = connectDB();
