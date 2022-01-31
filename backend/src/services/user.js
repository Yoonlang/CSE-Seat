const userModel = require('../models/user')

module.exports = {
    join: async (userDTO)=>{
        if (!userDTO.sid) throw Error('학번을 입력하세요.')
        if (!userDTO.password) throw Error('비밀번호를 입력하세요.')
        let result = userModel.search(userDTO.sid);
        if(!result) throw Error('데이터 베이스 오류');
        if(result.length>0) throw Error('이미 가입한 학번이 존재합니다.');
        
        reselt = await userModel.insert(userDTO);
        return {result : result};
    },
    login : function(sid, password){
        console.log('hi');
    },
}