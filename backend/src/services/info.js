const userModel = require('../models/user')

module.exports = {
  getUserInfo : async (userDTO) =>{
    
    try{
      const info = {}
      let data = await userModel.findById(userDTO.user_sid);
      info.name = data.name;
      info.sid = data.sid;
      info.major = data.major;
      info.banned = data.banned == 1 ? true : false;
      return info;
    }catch(e){
      console.log(e);
      return e;
    }
    
  }
}