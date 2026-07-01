const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const reservationsService = require('../../services/reservationsService');
const catwaysService = require('../../services/catwaysService');

// LIST
router.get('/', auth, async (req, res) => {
    try {
        const reservations = await reservationsService.getAll();

        res.render('reservations/index', {
            reservations,
            user: req.session.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur reservations");
    }
});

// NEW
router.get('/new', auth, async (req, res) => {
    try {
        const catways = await catwaysService.getAllCatways();

        res.render('reservations/new', {
            catways
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur new reservation");
    }
});

// EDIT
router.get('/edit/:id', auth, async (req, res) => {
    try {
        const reservation = await reservationsService.getById(req.params.id);
        const catways = await catwaysService.getAllCatways();

        res.render('reservations/edit', {
            reservation,
            catways
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur edit reservation");
    }
});

module.exports = router;