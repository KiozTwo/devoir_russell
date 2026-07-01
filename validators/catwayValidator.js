const { body } = require('express-validator');

exports.createCatwayValidator = [
    body('catwayNumber')
        .notEmpty()
        .withMessage('Le numéro du catway est obligatoire')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Le numéro du catway doit être un nombre entier positif'),

    body('catwayType')
        .notEmpty()
        .withMessage('Le type du catway est obligatoire')
        .bail()
        .isIn(['long', 'short'])
        .withMessage('Le type du catway doit être "long" ou "short"'),

    body('catwayState')
        .notEmpty()
        .withMessage("L'état du catway est obligatoire")
        .bail()
        .isLength({ min: 2 })
        .withMessage("L'état du catway doit contenir au moins 2 caractères")
];

exports.updateCatwayValidator = [
    body('catwayState')
        .notEmpty()
        .withMessage("L'état du catway est obligatoire")
        .bail()
        .isLength({ min: 2 })
        .withMessage("L'état du catway doit contenir au moins 2 caractères")
];