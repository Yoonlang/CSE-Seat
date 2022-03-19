const dateService = require('../services/date.js');
(()=>{
  let sec = dateService.getMillisecDiffFromNow('2202-03-12 02:21') //수정해야함 
  setTimeout(function run (){
    console.log('hello');
    setTimeout(run,1000*60*60*24);
  },sec);
  
  
})();

module.exports = true;