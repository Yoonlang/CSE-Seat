const userModel = require('../models/user')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const redis = require('../models/redis');
const redisClient = redis.getClient();
var appDir = path.dirname(require.main.filename);

const createSalt = () =>
            new Promise((resolve, reject) => {
                crypto.randomBytes(64, (err, buf) => {
                    if (err) reject(err);
                    resolve(buf.toString('base64'));
                });
            });

const createHashedPassword = (plainPassword) =>
new Promise(async (resolve, reject) => {
    const salt = await createSalt();

    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve({ password: key.toString('base64'), salt });
    });
});

const makePasswordHashed = (sid, password) =>
    new Promise(async (resolve, reject) => {
        const result = await userModel.findById(sid)
        const salt = result.password_salt;
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

module.exports = {
    
    join: async (userDTO)=>{
        try{
            
            if (!userDTO.sid) return {result: false, message: '학번을 입력하세요.'};
            if (!userDTO.password) return {result: false, message: '비밀번호를 입력하세요.'};
            if (!userDTO.email) return {result: false, message: '이메일을 입력하세요.'};
            if(!userDTO.authNum) return {result: false, message: '인증번호를 입력하세요.'};
            
            await redisClient.select(0);
            if((await redis.get(userDTO.email)) != userDTO.authNum){
                return {result: false, message: '인증번호가 틀렸거나 만료됐습니다.'};
            } 
            
            let result = await userModel.findById(userDTO.sid).catch((err)=>{throw err;});
            if(result) return {result: false, message: '이미 가입한 학번이 존재합니다.'};
            result = await userModel.findByEmail(userDTO.email).catch((err)=>{throw err;});
            if(result) return {result: false, message: '이미 가입한 이메일이 존재합니다.'};

            
            hashed = await createHashedPassword(userDTO.password);
            userDTO.password = hashed.password;
            userDTO.password_salt = hashed.salt;
            result = await userModel.insert(userDTO);
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            return {result : result};
        }catch(e){
            console.log('userService Join error: ',e)
            return e;
        }
    },
    login : async (userDTO) => {
        try{
            if (!userDTO.sid) return {result: false, message: '학번을 입력하세요.'};
            if (!userDTO.password) return {result: false, message: '비밀번호를 입력하세요.'};
            let result= await userModel.findById(userDTO.sid);
            if(!result) return {result: false, message: '가입한 학번이 존재하지 않습니다.'};
            let rightPassword = result.password;
            if (rightPassword == await makePasswordHashed(userDTO.sid, userDTO.password)){
                return {result: true}
            }
            else return {result: false, message: '비밀번호가 틀렸습니다.'};
        }catch(e){
            console.log('userService Login error: ',e)
            return e;
        }     
    },
    mail : async (mail_address) => {
        try{
            redisClient.select(1);
            if(await redisClient.get(mail_address) != null)
                return {result: false, message: '1분뒤 재요청할 수 있습니다.'};
            if(mail_address.split('@')[1] !='knu.ac.kr')
                return {result: false, message: '@knu.ac.kr 이메일이 아닙니다.'};

            let authNum = crypto.randomInt(100000, 999999);
            let emailTemplete;
            ejs.renderFile(appDir+'/template/mail.ejs', {authCode : authNum}, function (err, data) {
              if(err){console.log(err)}
              emailTemplete = data;
            });
        
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                },
            });
        
            let mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: mail_address,
                subject: '회원가입을 위한 인증번호를 입력해주세요.',
                html: emailTemplete,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('메일 error',error);
                    transporter.close();
                    throw new Error('메일 전송 실패: ', mail_address);
                }
                transporter.close();
            });
            
            
            await redisClient.select(0);
            await redisClient.set(mail_address, String(authNum));
            await redisClient.expire(mail_address, 600);
            await redisClient.select(1);
            await redisClient.set(mail_address, String(authNum));
            await redisClient.expire(mail_address, 60);
            return {result: true};
        }catch(e){
            console.log('emailService Login error: ',e)
            return e;
        }     
    },
}