const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy
const bodyParser = require('body-parser')
const userService = require('$/services/user')

passport.serializeUser(function(user, done){
    console.log('passport session save : ', user.name)
    done(null, user.name)
});

passport.deserializeUser(function(name, done){
    console.log('passport session getdata : ', name)
    done(null, name); //user라는 객체에 담아 request로 전달한다
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'sid',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, sid, password, done)=>{
        console.log('passport')
        userDTO = req.body;
        userDTO.only_friend = 'true' ? true : false;
        try{
            console.log('passport.js: \n', userDTO);
            result = await userService.join(userDTO);
            if(result.message)  
                throw result;
            return done(null, {'sid' : userDTO.sid})
        }catch(e){
            console.log('오류 항목:', e.message);
            return done(null, false, {message : e.message})
        }
    }
));
