let db = require('./mysql');

module.exports = {
    getHistorys : async (historyDTO) => new Promise( async (resolve, reject) => {
        let sql = "select r.apply_id, r.date, r.part1_building_id, r.part1_seat_room, r.part1_seat_num,r.part2_building_id, r.part2_seat_room, r.part2_seat_num, r.part1, r.part2, r.apply_user_sid " +
        ",a.apply_time, a.want_building_id, a.want_seat_num,r.cancel_marker" +
        ",e.part,e.in_time,e.out_time " +
        "from reservation_log r, reservation_apply a left outer join entry_log e on a.id = e.apply_id " +
        "where r.apply_id = a.id and r.reservation_sid = ? "+
        "order by r.date desc,r.apply_id desc, e.part"
        let set  = [
            historyDTO.user_sid
        ]
        
        let result = await db.query(sql,set);
        if (result)
            return resolve(result);
        return reject(Error('History finding error'));
    }),
    findRoomsById: async (apply_id) => new Promise( async (resolve, reject) => {
      let sql = "select * from want_rooms where apply_id = ?";
      let set  = [
          apply_id
      ]
      
      let result = await db.query(sql,set);
      if (result)
          return resolve(result);
      return reject(Error('History finding error'));
  }),
    findFriendsById: async (apply_id) => new Promise( async (resolve, reject) => {
      let sql = "select * from friend_request where apply_id = ?";
      let set  = [
          apply_id
      ]
      
      let result = await db.query(sql,set);
      if (result)
          return resolve(result);
      return reject(Error('History finding error'));
  }),
}