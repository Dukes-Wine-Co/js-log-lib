"use strict";

var logger = require('./logger');

var logDetails = function logDetails(req) {
  var _req$res, _req$connection, _req$correlationId, _req$res2, _req$res2$getHeaders;

  var statusCode = ((_req$res = req.res) === null || _req$res === void 0 ? void 0 : _req$res.statusCode) || '';
  var originalPath = req.originalUrl || '';
  var referer = req.headers.referer || '';
  var userAgent = req.headers['user-agent'] || '';
  var ip = req.headers['x-forwarded-for'] || ((_req$connection = req.connection) === null || _req$connection === void 0 ? void 0 : _req$connection.remoteAddress) || '';
  var acceptLanguage = req.headers['accept-language'] || '';
  var domain = req.headers.host || '';
  var correlationId = ((_req$correlationId = req.correlationId) === null || _req$correlationId === void 0 ? void 0 : _req$correlationId.call(req)) || '';
  var timestamp = Date.now();
  var redirectedUrl = ((_req$res2 = req.res) === null || _req$res2 === void 0 ? void 0 : (_req$res2$getHeaders = _req$res2.getHeaders) === null || _req$res2$getHeaders === void 0 ? void 0 : _req$res2$getHeaders.call(_req$res2).location) || '';
  return {
    statusCode: statusCode,
    originalPath: originalPath,
    referer: referer,
    userAgent: userAgent,
    ip: ip,
    acceptLanguage: acceptLanguage,
    domain: domain,
    correlationId: correlationId,
    redirectedUrl: redirectedUrl,
    timestamp: timestamp
  };
};

var logError = function logError(msg, req) {
  var msgObj = {
    log: msg
  };

  if (req) {
    logger.error(Object.assign(msgObj, logDetails(req)));
  } else {
    logger.error(msgObj);
  }
};

var logInfo = function logInfo(msg, req) {
  var msgObj = {
    log: msg
  };

  if (req) {
    logger.info(Object.assign(msgObj, logDetails(req)));
  } else {
    logger.info(msgObj);
  }
};

var logRequest = function logRequest(req, res, next) {
  logger.http(logDetails(req));
  next();
};

var logReqError = function logReqError(err, req, res, next) {
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