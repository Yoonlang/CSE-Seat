const bodyParser = require('body-parser')
const express = require('express')
const router = require(__dirname + '/../routs/index')
const cors = require('cors')
module.exports = async ({app}) => {
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.set('view engine', 'ejs')
    
    app.use(cors());
    app.use(router)
    return app;
}