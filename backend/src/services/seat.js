const userModel = require('../models/user')
const seatChartModel = require('../models/seat_chart')
module.exports = {
    showSeatsData: (sid)=>{
        // 현재는 IT4호관 한정입니다.
        Data = {
            buildingNum : 414,
            buildingName : 'IT4호관',
            numRooms : 3,
            rooms = [room1객체,room2객체]
        }
    },
    // login : async (userDTO) => {
    //     try{
    //         if (!userDTO.sid) throw Error('학번을 입력하세요.')
    //         if (!userDTO.password) throw Error('비밀번호를 입력하세요.')
    //         rightPassword = await userModel.findById(sid)
    //         .then(result => result.password)
    //         .catch((err)=>{throw err;});
    //         if (rightPassword == makePasswordHashed(userDTO.password)){
    //             return {result: true}
    //         }
    //         else throw Error('비밀번호가 틀렸습니다.');
    //     }catch(e){
    //         console.log('userService Login error: ',e)
    //         return {result : false, message: e.message};
    //     }     
    // },
}