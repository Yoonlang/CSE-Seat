const seatModel = require('$/models/seat');
const logModel = require('$/models/log');
const dateService = require('../services/date');

const initProperty = (seatDTO)=>{
    if(seatDTO.isToday == 'true') seatDTO.isToday = true;
    if(seatDTO.isToday == 'false') seatDTO.isToday = false;
    if(seatDTO.part1 == 'true') seatDTO.part1 = true;
    if(seatDTO.part1 == 'false') seatDTO.part1 = false;
    if(seatDTO.part2 == 'true') seatDTO.part2 = true;
    if(seatDTO.part2 == 'false') seatDTO.part2 = false;
    seatDTO.building_id *= 1;
    //seatDTO.seat_room *= 1;
    seatDTO.seat_num *= 1;
    seatDTO.date = seatDTO.isToday ? dateService.getTodayDate() : dateService.getTomorrowDate();
    seatDTO.apply_time = dateService.getNowTime();
}

module.exports = {
    
    reserve : async (seatDTO) => {  //실시간 방식
        try{
            initProperty(seatDTO);
            if (seatDTO.part1){
                seatDTO.part = 1;
                let result = await seatModel.exist(seatDTO);
                if (result) throw Error('이미 예약된 좌석입니다.');
            }
            if (seatDTO.part2){
                seatDTO.part = 2;
                let result = await seatModel.exist(seatDTO);
                if (result) throw Error('이미 예약된 좌석입니다.');
            }

            let insertId = await seatModel.apply(seatDTO);

            if (seatDTO.part1){
                seatDTO.part = 1;
                seatDTO.apply_id = insertId;
                await seatModel.reserve(seatDTO);
                await logModel.reservation(seatDTO);
            }
            if (seatDTO.part2){
                seatDTO.part = 2;
                seatDTO.apply_id = insertId;
                await seatModel.reserve(seatDTO);
                await logModel.reservation(seatDTO);
            }
            return true;
        }catch(e){
            return e;
        }
    },
    cancelReservation : async (seatDTO) => {
        try{
            initProperty(seatDTO);
            // part 1  part 2 둘다 되게 해야함
            if (seatDTO.part1){
                seatDTO.part = 1;
                let result = await seatModel.exist(seatDTO);
                if(!result) throw new Error('예약 좌석이 아닙니다');
                if(result.user_sid != seatDTO.user_sid) throw new Error('예약자가 본인이 아닙니다')
            }
            if (seatDTO.part2){
                seatDTO.part = 2;
                let result = await seatModel.exist(seatDTO);
                if(!result) throw new Error('예약 좌석이 아닙니다');
                if(result.user_sid != seatDTO.user_sid) throw new Error('예약자가 본인이 아닙니다')
            }

            if (seatDTO.part1){
                seatDTO.part = 1;
                await seatModel.deleteReservation(seatDTO);
                await logModel.updateCancel(seatDTO); // 여기서 오류시 롤백해야함
            }
            if (seatDTO.part2){
                seatDTO.part = 2;
                await seatModel.deleteReservation(seatDTO);
                await logModel.updateCancel(seatDTO);
            }
            return true;
        }catch(e){
            console.log('seat services error',e);
            return e;
        }
    }
}