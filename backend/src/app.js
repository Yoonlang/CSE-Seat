/*
    CSE-Seat project
    18 배찬우
    18 최윤석
*/

const express = require('express');
const app = express();
const loaders = require('./loaders');
require('better-module-alias')(__dirname);  // $ == backend/src


async function startServer() {
    await loaders({expressApp:app});
    app.listen(3000, function(){
        console.log("start!! express server on port 3000");
    });
}

startServer();