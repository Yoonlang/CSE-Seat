const db = require('./mysql');

module.exports = {
    findOne : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation_log where apply_id = ? and reservation_sid = ?";
        let set  = [
            seatDTO.apply_id,
            seatDTO.user_sid
        ]
        let result = await db.query(sql,set);
        if (!result) return reject(Error('log findOne error'));
        else if (result.length == 1) return resolve(result[0]);
        else if (result.length == 0) return resolve(false);
        else return reject(new Error('database PK error'));
    }),
    reservation : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO reservation_log SET ?"

        const set = {
            apply_id : seatDTO.apply_id,
            apply_user_sid : seatDTO.user_sid,
            reservation_sid : seatDTO.user_sid,  //현재는 신청자 == 앉을 사람
            part1 : seatDTO.part1,
            part2 : seatDTO.part2,
            building_id : seatDTO.building_id,
            seat_room : seatDTO.seat_room,
            seat_num : seatDTO.seat_num,
            date : seatDTO.date,
            cancel_marker : false
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
    updateCancel : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "UPDATE reservation_log SET ? WHERE apply_id = ? and reservation_sid = ?";

        const set = {
            cancel_marker : true
        }
        let result = await db.query(sql,[set,
            seatDTO.apply_id,
            seatDTO.user_sid
        ]);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
    updatePart : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "UPDATE reservation_log SET ? WHERE apply_id = ? and reservation_sid = ?";

        const set = {
            part1 : !seatDTO.part1,
            part2 : !seatDTO.part2
        }
        console.log(set);
        let result = await db.query(sql,[set,
            seatDTO.apply_id,
            seatDTO.user_sid
        ]);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
}