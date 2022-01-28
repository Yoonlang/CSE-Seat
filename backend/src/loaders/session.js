const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require ('passport-local').Strategy
const flash = require('connect-flash')

module.exports = ({app}) => {
    const sessionKeySecret = require(__dirname+'/../config').session_key.secret;
    app.use(session({
        secret: sessionKeySecret,
        resave: false,
        saveUninitialized: true 
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    return app;
}