const bodyParser = require('body-parser')
const fs = require('fs');
const express = require('express')
const router = require('router')

module.exports = async ({app}) => {
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.set('view engine', 'ejs')
    app.use(router)
    return app;
}