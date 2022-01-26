expressLoader = require('./express')

module.exports = async ({expressApp}) => {
  mysqlLoader = require('./mysql')
  console.log('mysql Intialized');
  await expressLoader({app:expressApp});
  console.log('Express Intialized');
}