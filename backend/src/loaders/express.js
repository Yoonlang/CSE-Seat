const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require(path.join(__dirname , '/../api/routes'))
const cors = require('cors');
const logger = require('$/middlewares/winston');
const morgan = require('morgan');
const combined = ':remote-addr :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"' 
// 기존 combined 포멧에서 timestamp만 제거
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined; // NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발
console.log(morganFormat);

module.exports = ({app}) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
    app.use(morgan(morganFormat, {stream : logger.stream}));
    app.use('/api', routes);
    return app;
}