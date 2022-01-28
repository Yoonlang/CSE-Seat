//if you want to access my DB, contant to chanwooDev / pove2019@gmail.com 
const mysql = require('mysql');
const path = require('path')
const DB_key = require(__dirname+'/../config').DB_key;

pool = mysql.createPool(DB_key);

pool.getConnection(function(err, conn){  
    if ( err ) 
        throw err;
    else{
        console.log('Database connected successfully');
        conn.release();
    }
});
module.exports = {
    getPool : ()=>{return pool},

    getConnection : async (callback) => {
        pool.getConnection(function (err, conn) {
            if(!err) {
              callback(conn);
            }
            else{
                throw err;
            }
        });
    },
}





