const express = require('express');
const router = express.Router();

const authController = require('../../controllers/api/authController');

const {
    registerValidator,
    loginValidator
} = require('../../validators/userValidator');

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

module.exports = router;