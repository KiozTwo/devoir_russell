const router = require('express').Router();

// controller API auth
const authController = require('../../controllers/api/authController');

// validators
const {
    registerValidator,
    loginValidator
} = require('../../validators/userValidator');


// ROUTES
router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

module.exports = router;