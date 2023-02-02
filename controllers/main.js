// Imports
const { BadRequestError } = require('../errors/');
const jwt = require('jsonwebtoken');

// Login
// No need to try/catch because of express-async-errors package
const login = async(req, res) => {
	// Check username and password
	const { username, password } = req.body;
	if (!username || !password){
		// Handled by express-async-errors and error-handler.js | app.js line 24
		throw new BadRequestError(`Please provide email and password`);
	}
	// Dummy id, normally provided by mongoDB
	const id = new Date().getDate();
	// If exist create new JWT
	const token = jwt.sign({
		id,
		username
	}, process.env.JWT_SECRET, {
		expiresIn:'30d'
	});
	// Send back to front-end with axios
	res.status(200).json({
		msg:`User created !`,
		token
	});
};

// Dashboard for secret and authorize data
// Setup authentication, so only the request with JWT can access the dashboard
const dashboard = async(req, res) => {
	const { id, username } = req.user;
	const lucky = Math.floor(Math.random()*100);
	res.status(200).json({
		msg:`Hello, ${ username }`,
		secret:`Here is your authorized data, your lucky number is ${ lucky }`
	});
};

// Export
module.exports = { login, dashboard };