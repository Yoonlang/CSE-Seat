let db = require('./mysql');

module.exports = {
    search : async (name) => {
        let sql = "select * from user where name = ?"
        let result = await db.query(sql,[name]);
        if (result)
            return result;
        return null;
    },
    insert : async(userDTO) => {
        let sql = "INSERT INTO user SET ?"
        set = {
            name : userDTO.name,
            email : userDTO.email,
            pw : userDTO.pw
        }
        let result = await db.query(sql,set);
        if (result)
            return result;
        return null;
    }
}