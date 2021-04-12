const winston = require('winston');
const loggerMethods = require('./logger-class-methods');

const {format} = winston

class Logger {
	constructor(options){
		this.logger = this.configureLoggerSettings(options)
	}

	configureLoggerSettings(options){
		const format = format.combine(
			format.json()
		);

		return winston.createLogger({
			level: options?.level || 'verbose',
			format,
			transports: new winston.transports.Console({})
		});
	}

	logError(msg, req){
		loggerMethods.logError(this.logger, msg, req);
	}

	logInfo(msg, req){
		loggerMethods.logInfo(this.logger, msg, req);

	}

	logRequest(req, res, next){
		loggerMethods.logRequest(this.logger, msg, req, next);
	}

	logReqError(err, req, res, next){
		loggerMethods.logReqError(this.logger, err, req, res, next);

	}
}

module.exports = Logger;
