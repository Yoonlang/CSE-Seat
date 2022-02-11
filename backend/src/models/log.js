const db = require('./mysql');

module.exports = {
    reservation : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO reservation_log SET ?"

        const set = {
            apply_id : seatDTO.apply_id,
            apply_user_sid : seatDTO.user_sid,
            reservation_sid : seatDTO.user_sid,  //현재는 신청자 == 앉을 사람
            part : seatDTO.part,
            building_id : seatDTO.want_building_id,
            seat_room : seatDTO.want_seat_room,
            seat_num : seatDTO.want_seat_num,
            date : seatDTO.reservation_date,
            cancel_marker : false
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
    updateCancel : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "UPDATE reservation_log SET ? WHERE building_id = ? and seat_room = ? and seat_num = ? and part = ? and date = ?";

        const set = {
            cancel_marker : true
        }
        let result = await db.query(sql,[set,
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.seat_num,
            seatDTO.part,
            seatDTO.date,
        ]);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
}