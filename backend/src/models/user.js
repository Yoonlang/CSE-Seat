let db = require('./mysql');

module.exports = {
    search : async (name) => {
        let sql = "select * from user where name = ?"
        let result = await db.query(sql,[name]);
        if (result)
            return result;
        return null;
    }
}