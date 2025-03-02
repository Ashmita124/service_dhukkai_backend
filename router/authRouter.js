const express = require('express');
const { registerUser, loginUser,uploadImage,resetPassword,resetPasswordRequest } = require('../controller/authController');
const upload = require("../middleware/uploads");

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

router.post("/uploadImage", upload, uploadImage);

router.post("/reset-password-request", resetPasswordRequest); // Route for requesting a password reset
router.post("/reset-password", resetPassword); // Route for resetting the password
// 
module.exports = router;
