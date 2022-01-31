const express = require('express')
const bodyParser = require('body-parser')
const router = require(__dirname + '/../api/routes')
const cors = require('cors')
module.exports = async ({app}) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors());
    app.use(router);
    return app;
}