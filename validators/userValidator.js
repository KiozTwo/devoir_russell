const { body } = require('express-validator');

exports.registerValidator = [

    body('username')
        .trim()
        .notEmpty()
        .withMessage("Le nom d'utilisateur est obligatoire")
        .isLength({ min: 2, max: 50 })
        .withMessage("Le nom d'utilisateur doit contenir entre 2 et 50 caractères"),

    body('email')
        .trim()
        .isEmail()
        .withMessage("Adresse email invalide")
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),

    body('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage("Le rôle doit être 'user' ou 'admin'")
];

exports.loginValidator = [

    body('email')
        .trim()
        .isEmail()
        .withMessage("Adresse email invalide")
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage("Le mot de passe est obligatoire")
];