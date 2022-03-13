const dateService = require('../services/date');
const db = require('../models/mysql');


module.exports = {
  getApplications : async (entryDTO) => new Promise( async (resolve, reject) => {

    let total_result = await db.querys((conn) => new Promise( async (resolve, reject) => {
      let sql = "select id as apply_id, user_sid, apply_time, want_building_id as building_id, want_seat_num as seat_num, part1, part2" +
      " from reservation_apply where reservation_date = ?";
      let set  = [
        dateService.getTomorrowDate()
      ]
      
      let [applications, fields] = await conn.query(sql,set);
      
      if (!applications) return reject(new Error('apply db error'));
            
      for (const i in applications){
        applications[i].friends = []
        applications[i].seat_room = []
        sql = "select f.friend_sid from reservation_apply a, friend_request f where a.id = ? and a.id = f.apply_id ";
        set  = [applications[i].apply_id]
        
        let [friendsObj, fields1] = await conn.query(sql,set);
        if (!friendsObj) return reject(new Error('friends db error'));
        for(const j in friendsObj){
          applications[i].friends.push(friendsObj[j].friend_sid);
        }
        sql = "select w.seat_room from reservation_apply a, want_rooms w where a.id = ? and a.id = w.apply_id";
        set  = [applications[i].apply_id];
        let [roomsObj, fields2] = await conn.query(sql,set);
        if (!roomsObj) return reject(new Error('rooms db error'));
        for(const j in roomsObj){
          applications[i].seat_room.push(roomsObj[j].seat_room);      
        }  
      }
      return resolve(applications);
    }));
    return resolve(total_result);
  }),
}