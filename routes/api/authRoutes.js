const express = require('express');
const router = express.Router();

const authController = require('../../controllers/api/authController');

const {
    registerValidator,
    loginValidator
} = require('../../validators/userValidator');

// REGISTER
router.post(
    '/register',
    [...registerValidator],
    authController.register
);

// LOGIN
router.post(
    '/login',
    [...loginValidator],
    authController.login
);

// LOGOUT
router.get('/logout', authController.logout);

module.exports = router;