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
            
            if (entryDTO.part1 === true) {
                entryDTO.part = 1;
                let result = await seatModel.exist(entryDTO);
                if (!result) return {result: false, message: "예약 좌석이 아닙니다."};
                if (result.user_sid != entryDTO.user_sid) return {result: false, message: "예약자가 본인이 아닙니다."};
                part1ApplyId = result.apply_id;
            }
            if (entryDTO.part2 === true) {
                entryDTO.part = 2;
                let result = await seatModel.exist(entryDTO);
                if (!result) return {result: false, message: "예약 좌석이 아닙니다."};
                if (result.user_sid != entryDTO.user_sid) return {result: false, message: "예약자가 본인이 아닙니다."};
                part2ApplyId = result.apply_id;
            }
            if(entryDTO.part1 === true){
                entryDTO.part = 1;
                entryDTO.apply_id = part1ApplyId;
                if (await entryModel.getCheckInData(entryDTO)){
                    return {result: false, message: "이미 입실하셨습니다."};
                }
                await entryModel.checkIn(entryDTO);
                
            }
            if(entryDTO.part2 === true){
                entryDTO.part = 2;
                entryDTO.apply_id = part2ApplyId;
                if (await entryModel.getCheckInData(entryDTO)){
                    return {result: false, message: "이미 입실하셨습니다."};
                }
                await entryModel.checkIn(entryDTO);
            }
            return {result: true, inTime: entryDTO.time}
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
            let inTime;
            if (entryDTO.part1 === true) {
                entryDTO.part = 1;
                let result = await seatModel.exist(entryDTO);
                if (!result) return {result: false, message: "예약 좌석이 아닙니다."};
                if (result.user_sid != entryDTO.user_sid) return {result: false, message: "예약자가 본인이 아닙니다."};
                part1ApplyId = result.apply_id;
                entryDTO.apply_id = result.apply_id;
                if (!(await entryModel.getCheckInData(entryDTO))){
                    return {result: false, message: "아직 체크인하지 않았습니다."};
                } 
            }
            if (entryDTO.part2 === true) {
                entryDTO.part = 2;
                let result = await seatModel.exist(entryDTO);
                if (!result) return {result: false, message: "예약 좌석이 아닙니다."};
                if (result.user_sid != entryDTO.user_sid) return {result: false, message: "예약자가 본인이 아닙니다."};
                part2ApplyId = result.apply_id;
                entryDTO.apply_id = result.apply_id;
                if(!entryDTO.part1)//part1이 off인상황에만 체크인 확인
                    if (!(await entryModel.getCheckInData(entryDTO))){
                        return {result: false, message: "아직 체크인하지 않았습니다."};
                    } 
            }
            
            
            let nowTime = new Date(dateService.getNowTime());
            let t = new Date(dateService.getTodayDate() + ' 18:00:00');

            if(entryDTO.part2 === true && nowTime>t){
                entryDTO.part = 1;
                part1ApplyId = await seatModel.checkMySeat(entryDTO).then((data)=>data.apply_id);
                if(part1ApplyId != undefined){
                    //1부 체크아웃 - 2부 체크아웃
                    entryDTO.apply_id = part1ApplyId;
                    entryDTO.part = 1;
                    entryDTO.time = dateService.getTodayDate() + ' 18:00:00';
                    inTime = await entryModel.getCheckInData(entryDTO).then((data)=>data.in_time);
                    await entryModel.checkOut(entryDTO);
                    await seatModel.deleteReservation(entryDTO);
                }
                
                entryDTO.part = 2;
                entryDTO.apply_id = part2ApplyId;
                entryDTO.time = dateService.getNowTime();
                if(!inTime) inTime = await entryModel.getCheckInData(entryDTO).then((data)=>data.in_time);
                await entryModel.checkOut(entryDTO);
                await seatModel.deleteReservation(entryDTO);
            }else{
                //1부 체크아웃 if 2부가 있다..? 2부 체크인 데이터 삭제
                entryDTO.part = 2;
                part2ApplyId = await seatModel.checkMySeat(entryDTO).then((data)=>data.apply_id);
                if(part2ApplyId != undefined){
                    entryDTO.apply_id = part2ApplyId;
                    if(await entryModel.getCheckInData(entryDTO)){
                        await entryModel.deleteCheckInData(entryDTO);
                    }
                }               
                entryDTO.apply_id = part1ApplyId;
                entryDTO.part = 1;
                inTime = await entryModel.getCheckInData(entryDTO).then((data)=>data.in_time);
                await entryModel.checkOut(entryDTO);
                await seatModel.deleteReservation(entryDTO);
            }
            return {result: true,inTime : inTime,outTime : entryDTO.time}
        }catch(e){
            console.log('entry error: ', e);
            return e;
        }
    },
}