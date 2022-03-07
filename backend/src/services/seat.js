const seatModel = require("$/models/seat");
const logModel = require("$/models/log");
const dateService = require("../services/date");
const entryModel = require("../models/entry");

const initProperty = (seatDTO) => {
  seatDTO.building_id *= 1;
  seatDTO.seat_room = seatDTO.seat_room[0] * 1; // 임시
  seatDTO.seat_num *= 1;
  seatDTO.date = seatDTO.isToday
    ? dateService.getTodayDate()
    : dateService.getTomorrowDate();
  seatDTO.apply_time = dateService.getNowTime();
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
  reserve: async (seatDTO) => {
    //실시간 방식
    try {
      //랜덤 생성 임시
      if (!seatDTO.seat_num) {
        if (seatDTO.seat_room[0] == "101") {
          seatDTO.seat_num = getRandomInt(2, 15);
        } else if (seatDTO.seat_room[0] == "104") {
          seatDTO.seat_num = getRandomInt(16, 47);
        } else if (seatDTO.seat_room[0] == "108") {
          seatDTO.seat_num = getRandomInt(48, 71);
        }
      }

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

      let insertId = await seatModel.apply(seatDTO);

      if (seatDTO.part1) {
        seatDTO.part = 1;
        seatDTO.apply_id = insertId;
        await seatModel.reserve(seatDTO);
      }
      if (seatDTO.part2) {
        seatDTO.part = 2;
        seatDTO.apply_id = insertId;
        await seatModel.reserve(seatDTO); //여기 오류시 롤백
      }

      await logModel.reservation(seatDTO);
      return true;
    } catch (e) {
      return e;
    }
  },
  cancelReservation: async (seatDTO) => {
    try {
      seatDTO.building_id *= 1;
      seatDTO.seat_room *= 1;
      seatDTO.seat_num *= 1;
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
