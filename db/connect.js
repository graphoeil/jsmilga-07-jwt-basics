// Imports
const mongoose = require('mongoose');

// Connect to DB
const connectDB = (url) => {
	// We return a promise !
	return mongoose.connect(url, {
		// Deprecation warning, only for mongoose v5
		useNewUrlParser:true,
		useCreateIndex:true,
		useFindAndModify:false,
		useUnifiedTopology:true
	});
};

// Export
module.exports = connectDB;