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

  if (history.part1.isPart){
    if (!history.part1.inTime) history.state = 0;
    else if (history.part1.outTime){
      history.part1End = true;
      if (history.part2.isPart){
        history.part1End = false;
        if(!history.part2.inTime) {
          history.state = 0;
        }
        else if(!history.part2.outTime) history.state = 1;
        else history.state = 2
      }
      else history.state = 2; 
    }
    else history.state = 1;
  }
  else if (history.part2.isPart){
    if(!history.part2.inTime) history.state = 0;
    else if(!history.part2.outTime) history.state = 1;
    else history.state = 2;
  }
  //시간 지남에 따른 비활성화
  
  let t = new Date(dateService.getTomorrowDateOf(history.date)+' 07:00:00');
  let curT  = new Date(dateService.getNowTime());
  
  if (curT>t) history.state = 2;

  if(history.part1.isPart){
    t = new Date(history.date +' 18:30:00');
    if (curT>t){
      history.part1End = true;
      if(!history.part2.isPart)
        history.state = 2;
    }
  } 
  //취소에 따른 비활성화

  if(history.part1.isPart && history.part2.isPart){
    if(history.part1.cancel_marker && history.part2.cancel_marker){
      history.state = 2;
      history.part1End = true;
    }
  }
  else if(history.part1.isPart){
    if(history.part1.cancel_marker){
      history.state = 2;
      history.part1End = true;
    }
  }
  else if(history.part2.isPart){
    if(history.part2.cancel_marker){
      history.state = 2;
    }
  }

  if (history.part1End != true) history.part1End = false;
}


const makeHistorys = async (historyDTO)=>{
  try {
    let result = await historyModel.getHistorys(historyDTO);
    const dataSet = new Array();
    let prev_id = -1;
    for (let i=0; i<result.length; i++){
      if (result[i].apply_id === prev_id){
        dataSet[dataSet.length-1].part2.inTime = result[i].in_time;
        dataSet[dataSet.length-1].part2.outTime = result[i].out_time;
      }
      else{
        result[i].apply = {
          id : result[i].apply,
          time : result[i].apply_time,
          user_sid : result[i].apply_user_sid,
        };
        result[i].want = {
          building_id : result[i].want_building_id,
          seat_num : result[i].want_seat_num,
          
        };
        
        result[i].want.seat_room = await makeRoomsArr(result[i].apply_id);
        result[i].want.friends = await makeFriendsArr(result[i].apply_id);
        result[i].part1 == 1 ? result[i].part1Temp = true : result[i].part1Temp = false;
        result[i].part2 == 1 ? result[i].part2Temp = true : result[i].part2Temp = false; 
        result[i].part1_cancel_marker == 1 ? result[i].part1_cancel_marker = true : result[i].part1_cancel_marker = false;
        result[i].part2_cancel_marker == 1 ? result[i].part2_cancel_marker = true : result[i].part2_cancel_marker = false;
        prev_id = result[i].apply_id;
        
        result[i].part1 = {
          isPart: result[i].part1Temp,
          building_id : result[i].part1_building_id,
          seat_room : result[i].part1_seat_room,
          seat_num : result[i].part1_seat_num,
          cancel_marker : result[i].part1_cancel_marker == 1 ? true : false
        };
        result[i].part2 = {
          isPart: result[i].part2Temp,
          building_id : result[i].part2_building_id,
          seat_room : result[i].part2_seat_room,
          seat_num : result[i].part2_seat_num,
          cancel_marker : result[i].part2_cancel_marker == 1 ? true : false
        }
        
        result[i].part1.inTime = null;
        result[i].part1.outTime = null;
        result[i].part2.inTime = null;
        result[i].part2.outTime = null;

        if(result[i].part == 1){
          result[i].part1.inTime = result[i].in_time;
          result[i].part1.outTime = result[i].out_time;
          
        }else if(result[i].part == 2){
          result[i].part2.inTime = result[i].in_time;
          result[i].part2.outTime = result[i].out_time;
        }
        
        delete result[i].apply_time;
        delete result[i].apply_user_sid;
        delete result[i].in_time;
        delete result[i].out_time;
        delete result[i].part;
        delete result[i].part1_building_id,
        delete result[i].part1_seat_room,
        delete result[i].part1_seat_num,
        delete result[i].part2_building_id,
        delete result[i].part2_seat_room,
        delete result[i].part2_seat_num,
        delete result[i].want_building_id,
        delete result[i].want_seat_num,
        delete result[i].part1Temp,
        delete result[i].part2Temp,
        delete result[i].part1_cancel_marker,
        delete result[i].part2_cancel_marker,

        dataSet.push(result[i]);
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