const seatChartModel = require('../models/seat_chart')
const historyModel = require('../models/history')
const dateService = require('./date')

const makeRoomsArr = async(apply_id)=>{
  rooms = [];
  roomsData = await historyModel.findRoomsById(apply_id);
  for (const i in roomsData){
    rooms.push(roomsData[i].seat_room);
  }
  return rooms;
}
const makeFriendsArr = async(apply_id)=>{
  friends = [];
  friendsData = await historyModel.findFriendsById(apply_id);
  for (const i in friendsData){
    friends.push(friendsData[i].friend_sid);
  }
  return friends;
}

const getEntryState = (history) => {
  //입실전 0 입실중 1 퇴실 2
  // if state = 0 and part1End = true, 1부퇴실, 2부 미입실 상황
  if (history.part1){
    if (!history.part1InTime) history.state = 0;
    else if (history.part1OutTime){
      if (history.part2)
        if(!history.part2InTime) {
          history.state = 0;
          history.part1End = true;
        }
        else if(!history.part2OutTime) history.state = 1;
        else history.state = 2
      else history.state = 2; 
    }
    else history.state = 1;
  }
  else if (history.part2){
    if(!history.part2InTime) history.state = 0;
    else if(!history.part2OutTime) history.state = 1;
    else history.state = 2;
  }
}

const makeHistorys = async (historyDTO)=>{
  try {
    let result = await historyModel.getHistorys(historyDTO);
    const dataSet = new Array();
    let prev_id = -1;
    for (let i=0; i<result.length; i++){
      if (result[i].apply_id === prev_id){
        dataSet[dataSet.length-1].part2InTime = result[i].in_time;
        dataSet[dataSet.length-1].part2OutTime = result[i].out_time;
      }
      else{
        if(result[i].part == 1){
          result[i].part1InTime = result[i].in_time;
          result[i].part1OutTime = result[i].out_time;
          
        }else if(result[i].part == 2){
          result[i].part2InTime = result[i].in_time;
          result[i].part2OutTime = result[i].out_time;
        }
        delete result[i].in_time;
        delete result[i].out_time;
        delete result[i].part;
        result[i].want_seat_room = await makeRoomsArr(result[i].apply_id);
        result[i].friends = await makeFriendsArr(result[i].apply_id);
        
        dataSet.push(result[i]);
        result[i].part1 == 1 ? result[i].part1 = true : result[i].part1 = false;
        result[i].part2 == 1 ? result[i].part2 = true : result[i].part2 = false; 
        result[i].cancel_marker == 1 ? result[i].cancel_marker = true : result[i].cancel_marker = false;
        prev_id = result[i].apply_id;
      }
      getEntryState(dataSet[dataSet.length-1]);
    }
    return dataSet;
  } catch (e) {
    console.log('history error: ',e);
    return e
  }
}
module.exports = {
    getHistorys : makeHistorys,
    makeRoomsArr : makeRoomsArr,
}