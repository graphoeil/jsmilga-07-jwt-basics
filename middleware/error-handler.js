// Imports
const { CustomAPIError } = require('../errors/');
const { StatusCode } = require('http-status-codes');

// Custom error handler
const errorHandlerMiddleware = (err, req, res, next) => {
	// Check error
	if (err instanceof CustomAPIError){
		return res.status(err.statusCode).json({ msg:err.message });
	}
	// Basic error with no specific status code
	return res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Something went wrong try again later');
};

// Export
module.exports = errorHandlerMiddleware;