expressLoader = require('./express')
sessionLoader = require('./session')

module.exports = async ({expressApp}) => {
  mysqlLoader = require('./mysql')
  console.log('mysql Initialized');
  await expressLoader({app:expressApp});
  console.log('Express Initialized');
  sessionLoader({app:expressApp});
  console.log('Session Initialized')
}