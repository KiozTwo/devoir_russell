const { check } = require('express-validator');

const registerValidator = [
    check('email')
        .isEmail()
        .withMessage('Email invalide'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Mot de passe trop court')
];

const loginValidator = [
    check('email')
        .isEmail()
        .withMessage('Email invalide'),

    check('password')
        .notEmpty()
        .withMessage('Mot de passe requis')
];

module.exports = {
    registerValidator,
    loginValidator
};