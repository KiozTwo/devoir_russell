const express = require('express');
const router = express.Router();

const apiController = require('../controllers/reservationController');
const frontController = require('../controllers/reservationFrontController');

// ================= API =================
router.get('/', apiController.getReservations);
router.get('/:id', apiController.getReservationById);
router.post('/', apiController.createReservation);
router.put('/:id', apiController.updateReservation);
router.delete('/:id', apiController.deleteReservation);

// ================= FRONT =================
router.get('/page', frontController.list);
router.get('/new', frontController.newForm);
router.post('/new', frontController.create);

router.get('/edit/:id', frontController.editForm);
router.post('/edit/:id', frontController.update);

router.post('/delete/:id', frontController.remove);

module.exports = router;