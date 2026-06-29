const { body } = require('express-validator');

exports.createCatwayValidator = [
    body('catwayNumber')
        .isInt()
        .withMessage('catwayNumber doit être un nombre'),

    body('catwayType')
        .notEmpty()
        .isIn(['long', 'short'])
        .withMessage('catwayType doit être long ou short'),

    body('catwayState')
        .notEmpty()
        .withMessage('catwayState est obligatoire')
];

exports.updateCatwayValidator = [
    body('catwayType')
        .optional()
        .isIn(['long', 'short']),

    body('catwayState')
        .optional()
        .notEmpty()
];