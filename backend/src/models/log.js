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
            cancle_marker : false
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else
            return reject(new Error('database PK error'))
    }),

    


    // apply : async (seatDTO) => new Promise( async (resolve, reject) => {
    //     let sql = "INSERT INTO reservation_apply SET ?"
    //     set = {
    //         user_sid : seatDTO.user_sid,
    //         apply_time : seatDTO.apply_time,
    //         want_building_id : seatDTO.want_building_id,
    //         want_seat_room : seatDTO.want_seat_room,
    //         want_seat_num : seatDTO.want_seat_num,
    //         reservation_date : seatDTO.reservation_date,
    //         part1 : seatDTO.part1,
    //         part2 : seatDTO.part2,
    //     }
    //     let result = await db.query(sql,set);
    //     if (result && result.affectedRows > 0)
    //         return resolve(result.insertId);
    //     else
    //         return reject(new Error('database PK error'))
    // }),
}