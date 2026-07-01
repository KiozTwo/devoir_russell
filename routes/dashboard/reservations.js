const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const reservationsService = require('../../services/reservationsService');
const catwaysService = require('../../services/catwaysService');

// LIST
router.get('/', auth, async (req, res) => {
    const reservations = await reservationsService.getAll();
    res.render('reservations/index', { reservations });
});

// NEW
router.get('/new', auth, async (req, res) => {
    const catways = await catwaysService.getAll();
    res.render('reservations/new', { catways });
});

// CREATE
router.post('/new', auth, async (req, res) => {
    await reservationsService.create(req.body);
    res.redirect('/dashboard/reservations');
});

// EDIT PAGE
router.get('/edit/:id', auth, async (req, res) => {
    const reservation = await reservationsService.findById(req.params.id);
    const catways = await catwaysService.getAll();

    if (!reservation) return res.status(404).send("Reservation introuvable");

    res.render('reservations/edit', {
        reservation,
        catways
    });
});

// UPDATE
router.post('/edit/:id', auth, async (req, res) => {
    await reservationsService.update(req.params.id, req.body);
    res.redirect('/dashboard/reservations');
});

// DELETE
router.post('/delete/:id', auth, async (req, res) => {
    await reservationsService.delete(req.params.id);
    res.redirect('/dashboard/reservations');
});

module.exports = router;