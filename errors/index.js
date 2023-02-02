// Imports
const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

// Export
module.exports = {
	CustomAPIError,
	BadRequestError,
	UnauthenticatedError
};