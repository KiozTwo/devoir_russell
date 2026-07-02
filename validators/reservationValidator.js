const { body } = require('express-validator');

exports.createReservationValidator = [
    body('catway')
        .notEmpty()
        .withMessage('Le catway est obligatoire'),

    body('clientName')
        .trim()
        .notEmpty()
        .withMessage('Le nom du client est obligatoire')
        .isLength({ min: 2 })
        .withMessage('Le nom du client doit contenir au moins 2 caractères'),

    body('boatName')
        .trim()
        .notEmpty()
        .withMessage('Le nom du bateau est obligatoire')
        .isLength({ min: 2 })
        .withMessage('Le nom du bateau doit contenir au moins 2 caractères'),

    body('startDate')
        .notEmpty()
        .withMessage('La date de début est obligatoire')
        .isISO8601()
        .withMessage('La date de début est invalide'),

    body('endDate')
        .notEmpty()
        .withMessage('La date de fin est obligatoire')
        .isISO8601()
        .withMessage('La date de fin est invalide')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('La date de fin doit être postérieure à la date de début');
            }

            return true;
        })
];

exports.updateReservationValidator = [
    body('catway')
        .optional()
        .notEmpty()
        .withMessage('Le catway est obligatoire'),

    body('clientName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le nom du client est obligatoire')
        .isLength({ min: 2 })
        .withMessage('Le nom du client doit contenir au moins 2 caractères'),

    body('boatName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Le nom du bateau est obligatoire')
        .isLength({ min: 2 })
        .withMessage('Le nom du bateau doit contenir au moins 2 caractères'),

    body('startDate')
        .optional()
        .isISO8601()
        .withMessage('La date de début est invalide'),

    body('endDate')
        .optional()
        .isISO8601()
        .withMessage('La date de fin est invalide')
        .custom((value, { req }) => {
            if (req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('La date de fin doit être postérieure à la date de début');
            }

            return true;
        })
];