// Imports
const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

// Bad request
class BadRequestError extends CustomAPIError{

	// Constructor
  constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
  };

};

// Export
module.exports = BadRequestError;