/*
    CSE-Seat project
    
    18 배찬우
    18 최윤석

*/
const express = require('express');
const mysql = require('mysql');
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require ('passport-local').Strategy
const flash = require('connect-flash')
const router = require('./api/router/index')
const fs = require('fs');
var jsonFile = fs.readFileSync('./config/keys.json', 'utf8');
const DB_key = JSON.parse(jsonFile).DB_key;
const sessionKeySecret = JSON.parse(jsonFile).session_key.secret;
//if you want to access my DB, contant to chanwooDev / pove2019@gmail.com 
let connection = mysql.createConnection(DB_key)
connection.connect();

async function startServer() {
    app.listen(3000, function(){
        console.log("start!! express server on port 3000")
    });
}

startServer();


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

