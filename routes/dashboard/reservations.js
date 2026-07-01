const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const reservationsService = require('../../services/reservationsService');
const catwaysService = require('../../services/catwaysService');

// ======================
// LIST
// ======================
router.get('/', auth, async (req, res) => {
    try {
        const reservations = await reservationsService.getAll();

        res.render('reservations/index', {
            reservations
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement réservations");
    }
});

// ======================
// NEW
// ======================
router.get('/new', auth, async (req, res) => {
    try {
        const catways = await catwaysService.getAll();

        res.render('reservations/new', {
            catways
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement formulaire");
    }
});

// ======================
// CREATE
// ======================
router.post('/new', auth, async (req, res) => {
    try {

        console.log("BODY :", req.body);

        const reservation = await reservationsService.create({
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            catway: req.body.catway,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        console.log("RESERVATION CREATED :", reservation);

        res.redirect('/dashboard/reservations');

    } catch (err) {

        console.error("========== ERREUR RESERVATION ==========");
        console.error(err);
        console.error("========================================");

        res.status(500).send(err.message);
    }
});

// ======================
// EDIT PAGE
// ======================
router.get('/edit/:id', auth, async (req, res) => {
    try {

        const reservation = await reservationsService.findById(req.params.id);
        const catways = await catwaysService.getAll();

        if (!reservation) {
            return res.status(404).send("Réservation introuvable");
        }

        res.render('reservations/edit', {
            reservation,
            catways
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement réservation");
    }
});

// ======================
// UPDATE
// ======================
router.post('/edit/:id', auth, async (req, res) => {
    try {

        await reservationsService.update(req.params.id, {
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            catway: req.body.catway,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        res.redirect('/dashboard/reservations');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// ======================
// DELETE
// ======================
router.post('/delete/:id', auth, async (req, res) => {
    try {

        await reservationsService.delete(req.params.id);

        res.redirect('/dashboard/reservations');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;