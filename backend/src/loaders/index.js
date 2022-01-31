expressLoader = require('./express')
sessionLoader = require('./session')

module.exports = async ({expressApp}) => {
  await expressLoader({app:expressApp});
  console.log('Express Initialized');
  sessionLoader({app:expressApp});
  console.log('Session Initialized');
}