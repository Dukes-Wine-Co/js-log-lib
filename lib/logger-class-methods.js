"use strict";

var _require = require('./logger-methods'),
    logDetails = _require.logDetails;

var logError = function logError(logger, msg, req) {
  var msgObj = {
    log: msg
  };

  if (req) {
    logger.error(Object.assign(msgObj, logDetails(req)));
  } else {
    logger.error(msgObj);
  }
};

var logInfo = function logInfo(logger, msg, req) {
  var msgObj = {
    log: msg
  };

  if (req) {
    logger.info(Object.assign(msgObj, logDetails(req)));
  } else {
    logger.info(msgObj);
  }
};

var logRequest = function logRequest(logger, req, res, next) {
  logger.http(logDetails(req));
  next();
};

var logReqError = function logReqError(logger, err, req, res, next) {
  logger.error(logDetails(err));
  next();
};

module.exports = {
  logError: logError,
  logInfo: logInfo,
  logReqError: logReqError,
  logRequest: logRequest,
  logDetails: logDetails
};