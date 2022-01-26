
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require ('passport-local').Strategy
const flash = require('connect-flash')
const fs = require('fs');
const express = require('express')
const router = require('router')

module.exports = async ({app}) => {
    var jsonFile = fs.readFileSync(__dirname +'/../config/keys.json', 'utf8');
    const sessionKeySecret = JSON.parse(jsonFile).session_key.secret;

    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.set('view engine', 'ejs')

    app.use(session({
        secret: sessionKeySecret,
        resave: false,
        saveUninitialized: true 
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    app.use(router)
    return app;
}