let db = require('./mysql');

module.exports = {
    findSeatsList : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation Where building_id = ? and seat_room = ? "
        + "and reservation_part = ? and date = ?";
        let set  = [
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.reservation_part,
            seatDTO.date
        ]

        let result = await db.query(sql,set);
        if (result)
            return resolve(result);
        return reject(null);
    }),
}