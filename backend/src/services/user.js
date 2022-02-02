const userModel = require('../models/user')

module.exports = {
    join: async (userDTO)=>{
        try{
            console.log('userService : ', userDTO);
            if (!userDTO.sid) throw Error('학번을 입력하세요.')
            if (!userDTO.password) throw Error('비밀번호를 입력하세요.')
            if (!userDTO.email) throw Error('이메일을 입력하세요.')
            if (!userDTO.birth) throw Error('생일을 입력하세요.')
            if (!userDTO.major) throw Error('학번을 입력하세요.')
            
            let result = userModel.search(userDTO.sid);
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            if(result.length>0) throw Error('이미 가입한 학번이 존재합니다.');

            reselt = await userModel.insert(userDTO);
            console.log(result)
            return {result : result};
        }catch(e){
            return {message: e.message};
        }


    },
    login : function(sid, password){
        console.log('hi');
    },
}