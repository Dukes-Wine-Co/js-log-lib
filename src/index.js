const winston = require('winston');
const loggerMethods = require('./logger-class-methods');

const { format } = winston;

class Logger {
	constructor(options){
		this.logger = this.configureLoggerSettings(options);
	}

	configureLoggerSettings(options){
		const defaultFormat = format.combine(
			format.timestamp(),
			format.json()
		);

		const logFormat = format.printf(log => {
			const colorize = options?.colorize;

			const logString = options?.flat ? JSON.stringify(log) : JSON.stringify(log, null, 4);

			if(colorize){
				const colorizer = format.colorize();
				return colorizer.colorize(log.level, logString);
			} else {
				return logString;
			}

		});

		return winston.createLogger({
			format: defaultFormat,
			level: options?.level || 'verbose',
			transports: new winston.transports.Console({
				format: winston.format.combine(logFormat)
			})
		});
	}

	logError(msg, req){
		loggerMethods.logError(this.logger, msg, req);
	}

	logInfo(msg, req){
		loggerMethods.logInfo(this.logger, msg, req);

	}

	logRequest(req, res, next){
		loggerMethods.logRequest(this.logger, req, res, next);
	}

	logReqError(err, req, res, next){
		loggerMethods.logReqError(this.logger, err, req, res, next);

	}
}

module.exports = Logger;
