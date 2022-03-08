const seatModel = require("$/models/seat");
const logModel = require("$/models/log");
const dateService = require("../services/date");
const entryModel = require("../models/entry");
const userModel = require("../models/user")

const initProperty = (seatDTO) => {
  seatDTO.date = seatDTO.isToday
    ? dateService.getTodayDate()
    : dateService.getTomorrowDate();
  seatDTO.apply_time = dateService.getNowTime();
};


const checkRightSeat = (rooms, seat)=>{

  for (const i in rooms){
    if (rooms[i] === "101"){
      if (2<= seat*1 && seat*1 <= 15) return true;
    }
    else if(rooms[i] === "104"){
      if (16<= seat*1 && seat*1 <= 47) return true;
    }
    else if(rooms[i] === "108"){
      if (48<= seat*1 && seat*1 <= 71) return true;
    }
  }  
  return false;
}
module.exports = {
  apply: async (seatDTO) => {
    try{
      if (checkRightSeat(seatDTO.seat_room, seatDTO.seat_num) == false)
        throw new Error('잘못된 좌석번호입니다.');
      for (const i in seatDTO.friends){
        if (!await userModel.findById(seatDTO.friends[i]))
        throw new Error('친구의 학번이 잘못 입력되었거나 유저목록에 존재하지 않습니다.')
      }
      seatDTO.date = dateService.getTomorrowDate();
      seatDTO.apply_time = dateService.getNowTime();
      let insertId = await seatModel.apply(seatDTO);
      return true;
    }catch(e){
      console.log(e);
      return e;
    }
  },
  reserve: async (seatDTO) => {
    try{
      initProperty(seatDTO);
    
      if (seatDTO.part1) {
        seatDTO.part = 1;
        let result = await seatModel.existInDate(seatDTO);
        if (result) throw Error("이미 예약하셨습니다.");
        result = await seatModel.exist(seatDTO);
        if (result) throw Error("이미 예약된 좌석입니다.");
      }
      if (seatDTO.part2) {
        seatDTO.part = 2;
        let result = await seatModel.existInDate(seatDTO);
        if (result) throw Error("이미 예약하셨습니다.");
        result = await seatModel.exist(seatDTO);
        if (result) throw Error("이미 예약된 좌석입니다.");
      }

      seatDTO.seat_room = [seatDTO.seat_room];
      let insertId = await seatModel.apply(seatDTO);
      seatDTO.seat_room = seatDTO.seat_room[0];

      if (seatDTO.part1) {
        seatDTO.part = 1;
        seatDTO.apply_id = insertId;
        await seatModel.reserve(seatDTO);

        seatDTO.part1_building_id = seatDTO.building_id;
        seatDTO.part1_seat_room = seatDTO.seat_room;
        seatDTO.part1_seat_num = seatDTO.seat_num;
      }
      if (seatDTO.part2) {
        seatDTO.part = 2;
        seatDTO.apply_id = insertId;
        await seatModel.reserve(seatDTO); //여기 오류시 롤백

        seatDTO.part2_building_id = seatDTO.building_id;
        seatDTO.part2_seat_room = seatDTO.seat_room;
        seatDTO.part2_seat_num = seatDTO.seat_num;
      }

      await logModel.reservation(seatDTO);
      return true
    } catch (e) {
      return e;
    }
  },
  cancelReservation : async (seatDTO) => {
    try {
      seatDTO.date = seatDTO.isToday
        ? dateService.getTodayDate()
        : dateService.getTomorrowDate();
      let part1ApplyId;
      let part2ApplyId;

      if (seatDTO.part1) {
        seatDTO.part = 1;
        let result = await seatModel.exist(seatDTO);
        if (!result) throw new Error("예약 좌석이 아닙니다");
        if (result.user_sid != seatDTO.user_sid)
          throw new Error("예약자가 본인이 아닙니다");
        part1ApplyId = result.apply_id;
      }
      if (seatDTO.part2) {
        seatDTO.part = 2;
        let result = await seatModel.exist(seatDTO);
        if (!result) throw new Error("예약 좌석이 아닙니다");
        if (result.user_sid != seatDTO.user_sid)
          throw new Error("예약자가 본인이 아닙니다");
        part2ApplyId = result.apply_id;
      }
      if (seatDTO.part1) {
        seatDTO.part = 1;
        seatDTO.apply_id = part1ApplyId;
        if (await entryModel.getCheckInData(seatDTO)) throw new Error('이미 입실하셔서 취소가 불가능합니다.');
        await seatModel.deleteReservation(seatDTO);
      }
      if (seatDTO.part2) {
        seatDTO.part = 2;
        seatDTO.apply_id = part1ApplyId;
        if (await entryModel.getCheckInData(seatDTO)) throw new Error('이미 입실하셔서 취소가 불가능합니다.');
        await seatModel.deleteReservation(seatDTO);
      }
      if(seatDTO.part1 && seatDTO.part2){
        if(part1ApplyId === part2ApplyId){
          seatDTO.apply_id = part1ApplyId;
          await logModel.updateCancel(seatDTO);
        }
        else{
          seatDTO.apply_id = part1ApplyId;
          await logModel.updateCancel(seatDTO);
          seatDTO.apply_id = part2ApplyId;
          await logModel.updateCancel(seatDTO);
        }
      }
      else if(seatDTO.part1 || seatDTO.part2){
        if (part1ApplyId) seatDTO.apply_id = part1ApplyId;
        else if (part2ApplyId) seatDTO.apply_id = part2ApplyId;
        let result = await logModel.findOne(seatDTO);
        if (result.part1 && result.part2){
          await logModel.updatePart(seatDTO);
        }
        else await logModel.updateCancel(seatDTO); 
      }

      return true;
    } catch (e) {
      console.log("seat services error", e);
      return e;
    }
  },
};
