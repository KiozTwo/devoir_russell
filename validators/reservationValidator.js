const { body } = require('express-validator');

exports.createReservationValidator = [
    body('catway').notEmpty(),
    body('clientName').notEmpty(),
    body('boatName').notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601()
];

exports.updateReservationValidator = [
    body('clientName').optional().notEmpty(),
    body('boatName').optional().notEmpty(),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601()
];