const express = require('express');
const application = require('./application');
expressLoader = require('./express')
sessionLoader = require('./session')
application_process = require('./application.js');


module.exports = ({expressApp}) => {
  sessionLoader({app:expressApp});
  console.log('Session Initialized');
  expressLoader({app:expressApp});
  console.log('Express Initialized');
  return expressApp;
}