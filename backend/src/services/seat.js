const seatModel = require('$/models/seat');


module.exports = {
    apply : async (seatDTO) => {
        try{
            if(seatDTO.isTody == 'true') seatDTO.isToday = true;
            if(seatDTO.isTody == 'false') seatDTO.isToday = false;
            if(seatDTO.part1 == 'true') seatDTO.part1 = true;
            if(seatDTO.part1 == 'false') seatDTO.part1 = false;
            if(seatDTO.part2 == 'true') seatDTO.part2 = true;
            if(seatDTO.part2 == 'false') seatDTO.part2 = false;
            let result = await seatModel.exist(seatDTO);
            if (result) throw Error('이미 예약된 좌석입니다.');
            result = await seatModel.apply(seatDTO);
            return true;
        }catch(e){
            return e;
        }
    }
}