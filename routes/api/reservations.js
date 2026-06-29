const router = require('express').Router();

const reservationController = require('../../controllers/api/reservationsController');

const {
    createReservationValidator,
    updateReservationValidator
} = require('../../validators/reservationValidator');

router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);

router.post('/', createReservationValidator, reservationController.createReservation);

router.put('/:id', updateReservationValidator, reservationController.updateReservation);

router.delete('/:id', reservationController.deleteReservation);

module.exports = router;