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
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback : true
    }, (req, name, password, done)=>{
        userDTO = req.body;
        try{
            join(userDTO);
            return done(null, {'sid' : userDTO.sid})
        }catch(e){
            return done(null, false, {message : e.message})
        }
    }
));
