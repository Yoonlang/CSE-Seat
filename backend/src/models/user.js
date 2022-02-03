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
            sid : userDTO.sid,
            name : userDTO.name,
            birth : userDTO.birth,
            password : userDTO.password,
            password_salt : userDTO.password_salt,
            only_friend : userDTO.only_friend,
            major : userDTO.major,
            email : userDTO.email
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return true;
        return false;
    }
}