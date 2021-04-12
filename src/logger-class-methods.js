const { logDetails } = require('./logger-methods');

const logError = (logger, msg, req) => {
	const msgObj = { log: msg };

	if (req) {
		logger.error(Object.assign(msgObj, logDetails(req)));
	} else {
		logger.error(msgObj);
	}
};

const logInfo = (logger, msg, req) => {
	const msgObj = { log: msg };

	if (req) {
		logger.info(Object.assign(msgObj, logDetails(req)));
	} else {
		logger.info(msgObj);
	}
};

const logRequest = (logger, req, res, next) => {
	logger.http(logDetails(req));
	next();
};

const logReqError = (logger, err, req, res, next) => {
	logger.error(logDetails(err));
	next();
};

module.exports = {
	logError,
	logInfo,
	logReqError,
	logRequest,
	logDetails
};
