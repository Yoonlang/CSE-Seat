//if you want to access my DB, contant to chanwooDev / pove2019@gmail.com 
const mysql = require('mysql2');
const path = require('path')
const DB_key = require(__dirname+'/../config').DB_key;
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



