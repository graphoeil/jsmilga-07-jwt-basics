// Custom API error
class CustomAPIError extends Error{

	// Constructor
  constructor(message) {
		super(message);
  };

};

// Export
module.exports = CustomAPIError;