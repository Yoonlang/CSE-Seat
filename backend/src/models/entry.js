let db = require('./mysql');

module.exports = {

    checkIn : async (entryDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO entry_log SET ?"
        set = {
            apply_id : entryDTO.apply_id,
            reservation_sid : entryDTO.user_sid,
            part : entryDTO.part,
            in_time : entryDTO.time,
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
    checkOut : async (entryDTO) => new Promise( async (resolve, reject) => {
        let sql = "UPDATE entry_log SET ? WHERE apply_id = ? and reservation_sid = ? and part = ?"
        set = {
            out_time : entryDTO.time,
        }
        let result = await db.query(sql,[set,
            apply_id = entryDTO.apply_id,
            reservation_sid = entryDTO.user_sid,
            part = entryDTO.part,
        ]);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else if (result.affectedRows == 0)
            return reject(new Error('Nothing changed'));
        else
            return reject(new Error('database PK error'))
    }),



}