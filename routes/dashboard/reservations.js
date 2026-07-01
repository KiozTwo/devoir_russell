const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const reservationsService = require('../../services/reservationsService');

// LIST
router.get('/', auth, async (req, res) => {
    try {
        const reservations = await reservationsService.getAll();

        res.render('reservations/index', {
            user: req.session.user,
            reservations
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// NEW FORM
router.get('/new', auth, async (req, res) => {
    const catways = await require('../../services/catwaysService').getAllCatways();

    res.render('reservations/new', {
        catways
    });
});

// EDIT FORM
router.get('/edit/:id', auth, async (req, res) => {
    const reservation = await reservationsService.getById(req.params.id);
    const catways = await require('../../services/catwaysService').getAllCatways();

    res.render('reservations/edit', {
        reservation,
        catways
    });
});

module.exports = router;