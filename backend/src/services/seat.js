const seatChartModel = require('../models/seat_chart')
const reservationModel = require('../models/reservation')
const dateService = require('./date')
const initSeatsState = (rNum) => {
    let seats = []
    let roomArray = seatChartModel.getRoomArray(rNum);
    let n = roomArray.length
    let m = roomArray[0].length
    for (let i = 0; i<n; i++){
        seats.push([]);
        for(let j = 0; j<m; j++){
            let seat = {}
            if (roomArray[i][j] != -1)
                seat.num = roomArray[i][j];
                seat.todayState = [0,0];
                seat.tomorrowState = [0,0];
            seats[i].push(seat)
        }
    }
    return seats;      
}

const getSeats = async (sid,rNum) => {
    let seats = initSeatsState(rNum);
    let seatsMap = seatChartModel.getRoomMap(rNum);
    let seatDTO = {
        building_id : 414,
        seat_room : rNum,
        date : dateService.getTodayDate()
    }
    let seatList = await reservationModel.findList(seatDTO);
    for (let i = 0; i<seatList.length; i++){
        let location = seatsMap.get(seatList[i].seat_num);
        let y = location[0];
        let x = location[1];
        if(!seats[y][x].todayState) seats[y][x].todayState = [0,0];

        if(seatList[i].reservation_part == 1){
            if(seatList[i].user_sid == sid) seats[y][x].todayState[0] = 2;
            else seats[y][x].todayState[0] = 1;
        }else{
            if(seatList[i].user_sid == sid) seats[y][x].tomorrowState[1] = 2;
            else seats[y][x].todayState[1] = 1;
        }// 동료 체크 구현해야함
    }
    return seats
}




module.exports = {
    getSeats: getSeats   
}