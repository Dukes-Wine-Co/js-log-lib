"use strict";

var winston = require('winston');

var format = winston.format.combine(winston.format.json());
var logger = winston.createLogger({
  level: 'verbose',
  format: format,
  transports: new winston.transports.Console({})
});
module.exports = logger;