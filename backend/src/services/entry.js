const dateService = require('./date');
const seatModel = require('$/models/seat');
const entryModel = require('$/models/entry');

const initProperty = (entryDTO)=>{
    if(entryDTO.isToday == 'true') entryDTO.isToday = true;
    if(entryDTO.isToday == 'false') entryDTO.isToday = false;
    if(entryDTO.part1 == 'true') entryDTO.part1 = true;
    if(entryDTO.part1 == 'false') entryDTO.part1 = false;
    if(entryDTO.part2 == 'true') entryDTO.part2 = true;
    if(entryDTO.part2 == 'false') entryDTO.part2 = false;
    entryDTO.building_id *= 1;
    entryDTO.seat_num *= 1;
    entryDTO.date = dateService.getTodayDate() ;
    entryDTO.time = dateService.getNowTime();
}

module.exports ={
    check : async (entryDTO)=>{

        try{
            initProperty(entryDTO);
            let result = await seatModel.checkMySeat(entryDTO);
            entryDTO.apply_id = result.apply_id;
            await entryModel.check(entryDTO);
        }catch(e){
            console.log('entry error: ', e);
            return e;
        }
        //남의 좌석에 찍었는지 -> 아래와 동일
        //없는 좌석에 찍었는지 -> part1,part2만 했는데 퇴실이 늦어진경우
        //입력을 두번 찍었는지?
        //출력을 두번 찍었는지?
    }
}