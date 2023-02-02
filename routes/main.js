// Imports
const express = require('express');
const { login, dashboard } = require('../controllers/main');

// Router
const router = express.Router();

// Authentication middleware
const authMiddleware = require('../middleware/auth');

// Routes, chain approach
// get(authMiddleware, dashboard) => every time a user go to this route, 
// it'll call the auth middleware to test if the user is authorized !
router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

// Export
module.exports = router;