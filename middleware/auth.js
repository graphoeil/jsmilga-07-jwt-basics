// Imports
const { UnauthenticatedError } = require('../errors/');
const jwt = require('jsonwebtoken');

// Check if user is authenticated middleware
const authenticationMiddleware = async (req, res, next) => {
	// This middleware is refactoring it avoids having all the code 
	// in controllers/main.js at the level of the dashboard function.
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')){
		throw new UnauthenticatedError(`No token provided...`);
	}
	// Because there is a space between Bearer and jwt token ;-)
	const token = authHeader.split(' ')[1];
	// Is token valid ?
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(decoded); // { id: 31, username: 'test', iat: 1675165554, exp: 1677757554 }
		const { id, username } = decoded;
		// Add user property to request object, then dashboard.js can access it ;-)
		req.user = { id, username };
	} catch (error){
		throw new UnauthenticatedError(`Not authorized to access this route !`);
	}
	// Call next function, here in dashboard as defined in routes/main.js
	// with router.route('/dashboard').get(authMiddleware, dashboard);
	// next will call dashboard methods ;-)
	next();
};

// Export
module.exports = authenticationMiddleware;