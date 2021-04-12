"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var winston = require('winston');

var loggerMethods = require('./logger-class-methods');

var format = winston.format;

var Logger = /*#__PURE__*/function () {
  function Logger(options) {
    (0, _classCallCheck2["default"])(this, Logger);
    this.logger = this.configureLoggerSettings(options);
  }

  (0, _createClass2["default"])(Logger, [{
    key: "configureLoggerSettings",
    value: function configureLoggerSettings(options) {
      var format = format.combine(format.json());
      return winston.createLogger({
        level: options.level || 'verbose',
        format: format,
        transports: new winston.transports.Console({})
      });
    }
  }, {
    key: "logError",
    value: function logError(msg, req) {
      loggerMethods.logError(this.logger, msg, req);
    }
  }, {
    key: "logInfo",
    value: function logInfo(msg, req) {
      loggerMethods.logInfo(this.logger, msg, req);
    }
  }, {
    key: "logRequest",
    value: function logRequest(req, res, next) {
      loggerMethods.logRequest(this.logger, msg, req, next);
    }
  }, {
    key: "logReqError",
    value: function logReqError(err, req, res, next) {
      loggerMethods.logReqError(this.logger, err, req, res, next);
    }
  }]);
  return Logger;
}();

module.exports = Logger;