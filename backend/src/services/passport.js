const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy
const userService = require('$/services/user')

passport.serializeUser(function(user, done){
    //console.log('passport session save : ', user.sid)
    done(null, user.sid)
});

passport.deserializeUser(function(sid, done){
    //console.log('passport session getdata : ', sid)
    done(null, sid); //user라는 객체에 담아 request로 전달한다
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'sid',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, sid, password, done)=>{
        userDTO = req.body;
        userDTO.only_friend = 'true' ? true : false;
        try{
            result = await userService.join(userDTO);
            if(result instanceof Error) throw result;
            if(result.result == false) 
                return done(null, false, {message : result.message});
            return done(null, {sid : userDTO.sid});
        }catch(e){
            console.log(sid, ' 오류 항목:', e.message);
            return done(e);
        }
    }
));

passport.use('local-login', new LocalStrategy({
    usernameField: 'sid',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, sid, password, done)=>{
        userDTO = req.body;
        try{
            result = await userService.login(userDTO);
            if(result instanceof Error) throw result;
            if(result.result == false) 
                return done(null, false, {message : result.message});
            return done(null, {sid : userDTO.sid});            
        }catch(e){
            console.log(sid,' 오류 항목:', e.message);
            return done(e);
        }
    }
));
