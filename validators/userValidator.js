const { body } = require('express-validator');

exports.registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Email invalide'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Mot de passe minimum 6 caractères')
];

exports.loginValidator = [
    body('email')
        .isEmail(),

    body('password')
        .notEmpty()
];