const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservationsController');

router.get('/:id/reservations', reservationsController.getReservations);

router.get(
    '/:id/reservations/:rid',
    reservationsController.getReservationById
);

router.post(
    '/:id/reservations',
    reservationsController.createReservation
);

router.put(
    '/:id/reservations/:rid',
    reservationsController.updateReservation
);

router.delete(
    '/:id/reservations/:rid',
    reservationsController.deleteReservation
);

module.exports = router;