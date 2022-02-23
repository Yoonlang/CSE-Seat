let db = require('./mysql');

module.exports = {

    check : async (entryDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO entry_log SET ?"
        set = {
            apply_id : entryDTO.apply_id,
            reservation_sid : entryDTO.user_sid,
            in_out : entryDTO.inout,
            time : entryDTO.time,
            reservation_part : entryDTO.part,
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),



}