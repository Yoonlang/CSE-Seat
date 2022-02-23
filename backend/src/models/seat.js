const db = require('./mysql');
const date = require('../services/date');

module.exports = {
    exist : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation Where building_id = ? and seat_room = ? "
        + "and seat_num = ? and part = ? and date = ?";
        let set  = [
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.seat_num,
            seatDTO.part,
            seatDTO.date,
        ]
        let result = await db.query(sql,set);
        if (!result) return reject(Error('reservation findList error'));
        else if (result.length == 1) return resolve(result[0]);
        else if (result.length == 0) return resolve(false);
        else return reject(new Error('database PK error'));
    }),
    apply : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO reservation_apply SET ?"
        set = {
            user_sid : seatDTO.user_sid,
            apply_time : seatDTO.apply_time,
            want_building_id : seatDTO.building_id,
            want_seat_room : seatDTO.seat_room,
            want_seat_num : seatDTO.seat_num,
            reservation_date : seatDTO.date,
            part1 : seatDTO.part1,
            part2 : seatDTO.part2,
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(result.insertId);
        else
            return reject(new Error('database PK error'))
    }),
    reserve: async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO reservation SET ?"
        set = {
            user_sid : seatDTO.user_sid,
            building_id : seatDTO.building_id,
            seat_room : seatDTO.seat_room,
            seat_num : seatDTO.seat_num,
            date : seatDTO.date,
            part : seatDTO.part,
            apply_id : seatDTO.apply_id
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),
    deleteReservation: async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "DELETE FROM reservation WHERE building_id = ? and seat_room = ? and seat_num = ? and part = ? and date = ?";

        let result = await db.query(sql,[
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