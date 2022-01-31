expressLoader = require('./express')
sessionLoader = require('./session')

module.exports = async ({expressApp}) => {
  expressLoader({app:expressApp});
  console.log('Express Initialized');
  sessionLoader({app:expressApp});
  console.log('Session Initialized');
}