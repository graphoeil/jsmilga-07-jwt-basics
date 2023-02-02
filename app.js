// Express
const express = require('express');

// .env
require('dotenv').config();

// Async errors
require('express-async-errors');

// App
const app = express();

// Middlewares
app.use(express.static('./public'));
app.use(express.json());

// Routes
const router = require('./routes/main');
app.use('/api/v1', router);
// 404
const notFoundMiddleware = require('./middleware/not-found');
app.use(notFoundMiddleware);
// Custom error
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(errorHandlerMiddleware);

// Port
const port = process.env.PORT || 3000;

// Start / listen
const start = async() => {
	try {
		app.listen(port, console.log(`Server is listening on port ${ port }...`));
	} catch (error) {
		console.log(error);
	}
};

// Init
start();