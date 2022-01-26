//if you want to access my DB, contant to chanwooDev / pove2019@gmail.com 

const fs = require('fs');
const mysql = require('mysql2');
const path = require('path')
var jsonFile = fs.readFileSync(path.resolve(__dirname, "../config/keys.json"), 'utf8');
const DB_key = JSON.parse(jsonFile).DB_key;
const pool = mysql.createPool(DB_key);
module.exports = function getConnection(callback){
    pool.getConnection(function(err, conn){  
        if ( err ) 
            throw err;
        else{
             callback(conn); 
             conn.release();
        }
    });
}



