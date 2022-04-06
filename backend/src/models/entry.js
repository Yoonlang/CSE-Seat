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
    getCheckInData : async (entryDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from entry_log where apply_id = ? and reservation_sid = ? and part = ?";
        let set  = [
            entryDTO.apply_id,
            entryDTO.user_sid,
            entryDTO.part
        ]
        let result = await db.query(sql,set);
        if (!result) return reject(Error('log findOne error'));
        else if (result.length == 1) return resolve(result[0]);
        else if (result.length == 0) return resolve(false);
        else return reject(new Error('database PK error'));
    }),
    deleteCheckInData : async (entryDTO) => new Promise( async (resolve, reject) => {
        let sql = "DELETE FROM entry_log WHERE apply_id = ? and reservation_sid = ? and part = ?"
        let result = await db.query(sql,[
            apply_id = entryDTO.apply_id,
            reservation_sid = entryDTO.user_sid,
            part = entryDTO.part,
        ]);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else if (result.affectedRows == 0){
            console.log(entryDTO);
            return reject(new Error('Nothing changed'));
        }
        else{
            console.log(entryDTO);
            return reject(new Error('database PK error'))
        }
    }),

}