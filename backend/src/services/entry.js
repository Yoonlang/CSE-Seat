const dateService = require('./date');
const seatModel = require('$/models/seat');
const entryModel = require('$/models/entry');

const initProperty = (entryDTO)=>{
    entryDTO.building_id *= 1;
    entryDTO.seat_num *= 1;
    entryDTO.part *= 1;
    entryDTO.date = dateService.getTodayDate() ;
    entryDTO.time = dateService.getNowTime();
}

module.exports ={
    checkIn : async (entryDTO)=>{

        try{
            initProperty(entryDTO);
            let part1ApplyId;
            let part2ApplyId;

            if (entryDTO.part1) {
                entryDTO.part = 1;
                let result = await seatModel.exist(entryDTO);
                if (!result) throw new Error("예약 좌석이 아닙니다");
                if (result.user_sid != entryDTO.user_sid)
                throw new Error("예약자가 본인이 아닙니다");
                part1ApplyId = result.apply_id;
            }
            if (entryDTO.part2) {
                entryDTO.part = 2;
                let result = await seatModel.exist(entryDTO);
                if (!result) throw new Error("예약 좌석이 아닙니다");
                if (result.user_sid != entryDTO.user_sid)
                throw new Error("예약자가 본인이 아닙니다");
                part2ApplyId = result.apply_id;
            }

            if(entryDTO.part1){
                entryDTO.part = 1;
                entryDTO.apply_id = part1ApplyId;
                await entryModel.checkIn(entryDTO);
            }else{
                entryDTO.part = 2;
                await entryModel.checkIn(entryDTO);
            }
            
        }catch(e){
            console.log('entry error: ', e);
            return e;
        }
    },
    checkOut : async (entryDTO)=>{

        try{
            initProperty(entryDTO);
            let part1ApplyId;
            let part2ApplyId;

            if (entryDTO.part1) {
                entryDTO.part = 1;
                let result = await seatModel.exist(entryDTO);
                if (!result) throw new Error("예약 좌석이 아닙니다");
                if (result.user_sid != entryDTO.user_sid)
                throw new Error("예약자가 본인이 아닙니다");
                part1ApplyId = result.apply_id;
            }
            if (entryDTO.part2) {
                entryDTO.part = 2;
                let result = await seatModel.exist(entryDTO);
                if (!result) throw new Error("예약 좌석이 아닙니다");
                if (result.user_sid != entryDTO.user_sid)
                throw new Error("예약자가 본인이 아닙니다");
                part2ApplyId = result.apply_id;
            }

            if(entryDTO.part1){
                entryDTO.part = 1;
                entryDTO.apply_id = part1ApplyId;
                await entryModel.checkIn(entryDTO);
            }else{
                entryDTO.part = 2;
                await entryModel.checkIn(entryDTO);
            }
            
        }catch(e){
            console.log('entry error: ', e);
            return e;
        }
    },
}