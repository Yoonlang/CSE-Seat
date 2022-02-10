const seatModel = require('$/models/seat');
const dateService = require('../services/date');

const initProperty = (seatDTO)=>{
    if(seatDTO.isToday == 'true') seatDTO.isToday = true;
    if(seatDTO.isToday == 'false') seatDTO.isToday = false;
    if(seatDTO.part1 == 'true') seatDTO.part1 = true;
    if(seatDTO.part1 == 'false') seatDTO.part1 = false;
    if(seatDTO.part2 == 'true') seatDTO.part2 = true;
    if(seatDTO.part2 == 'false') seatDTO.part2 = false;
    seatDTO.want_building_id *= 1;
    seatDTO.want_seat_room *= 1;
    seatDTO.want_seat_num *= 1;
    seatDTO.reservation_date = seatDTO.isToday ? dateService.getTodayDate() : dateService.getTomorrowDate();
    seatDTO.apply_time = dateService.getNowTime();
    if (seatDTO.part1) seatDTO.part = 1;
    else if (seatDTO.part2) seatDTO.part = 2;
}

module.exports = {
    
    reserve : async (seatDTO) => {  //실시간 방식
        try{
            initProperty(seatDTO);
            let result = await seatModel.exist(seatDTO);
            if (result) throw Error('이미 예약된 좌석입니다.');
            let insertId = await seatModel.apply(seatDTO);
            seatDTO.apply_id = insertId;
             result = await seatModel.reserve(seatDTO);
            //reservation log 추가
            return true;
        }catch(e){
            return e;
        }
    }
}