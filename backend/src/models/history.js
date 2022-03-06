let db = require('./mysql');

module.exports = {
    getHistorys : async (historyDTO) => new Promise( async (resolve, reject) => {
        let sql = "select r.apply_id, r.date, r.building_id, r.seat_room, r.seat_num, r.part1, r.part2,r.apply_user_sid " +
        ",a.apply_time, a.want_building_id, a.want_seat_room, a.want_seat_num,r.cancel_marker" +
        ",e.part,e.in_time,e.out_time " +
        "from reservation_log r, reservation_apply a, entry_log e " +
        "where r.apply_id = a.id and a.id = e.apply_id and r.reservation_sid = ? "+
        "order by r.date desc,r.apply_id desc, e.part"
        let set  = [
            historyDTO.user_sid
        ]
        
        let result = await db.query(sql,set);
        if (result)
            return resolve(result);
        return reject(Error('History finding error'));
    }),
}