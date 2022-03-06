const seatChartModel = require('../models/seat_chart')
const historyModel = require('../models/history')
const dateService = require('./date')

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
          
        }else{
          result[i].part2InTime = result[i].in_time;
          result[i].part2OutTime = result[i].out_time;
        }
        delete result[i].in_time;
        delete result[i].out_time;
        delete result[i].part;
        dataSet.push(result[i]);
        prev_id = result[i].apply_id;
        result[i].part1 == 1 ? result[i].part1 = true : result[i].part1 = false;
        result[i].part2 == 1 ? result[i].part2 = true : result[i].part2 = false; 
        result[i].cancel_marker == 1 ? result[i].cancel_marker = true : result[i].cancel_marker = false;
      }
    }
    return dataSet;
  } catch (e) {
    console.log('history error: ',e);
    return e
  }
}
module.exports = {
    getHistorys : makeHistorys
}