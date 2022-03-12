const { now } = require("moment");

const getTodayDate = () => {
    today = new Date();
    if (today.getHours() < 6){
        today.setDate(today.getDate() -1);
    }
    year = today.getFullYear();
    month = ('0'+(today.getMonth()+1)).slice(-2);
    day = ('0'+today.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

const getTomorrowDate = () => {
    today = new Date();
    today.setDate(today.getDate()+1)
    if (today.getHours() < 6){
        today.setDate(today.getDate() -1);
    }
    year = today.getFullYear();
    month = ('0'+(today.getMonth()+1)).slice(-2);
    day = ('0'+(today.getDate())).slice(-2);
    return year + '-' + month + '-' + day;
}

const getNowTime = () => {
    today = new Date();
    year = today.getFullYear();
    month = ('0'+(today.getMonth()+1)).slice(-2);
    day = ('0'+today.getDate()).slice(-2);
    hours = ('0'+today.getHours()).slice(-2);
    minutes = ('0'+today.getMinutes()).slice(-2);
    seconds = ('0'+today.getSeconds()).slice(-2);
    return year + '-' + month + '-' + day + ' ' +  hours + ':' + minutes + ':' + seconds;
}

const getTomorrowDateOf = (date) => {
    date = new Date(date);
    date.setDate(date.getDate()+1)
    year = date.getFullYear();
    month = ('0'+(date.getMonth()+1)).slice(-2);
    day = ('0'+(date.getDate())).slice(-2);
    return year + '-' + month + '-' + day;
}

const convertToKoreanTime = (date) =>{
    date.setHours(date.getHours()+9);
    return date;
}

const getMillisecDiffFromNow = (time)=>{
    time = (new Date(time)).getTime();
    let now = (new Date()).getTime();
    return (time-now);    
}

module.exports = {
    getTodayDate : getTodayDate,
    getTomorrowDate : getTomorrowDate,
    getTomorrowDateOf : getTomorrowDateOf,
    getNowTime : getNowTime,
    convertToKoreanTime :convertToKoreanTime,
    getMillisecDiffFromNow : getMillisecDiffFromNow
}