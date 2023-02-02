// Imports
const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

// Bad request
class UnauthenticatedError extends CustomAPIError{

	// Constructor
  constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
  };

};

// Export
module.exports = UnauthenticatedError;