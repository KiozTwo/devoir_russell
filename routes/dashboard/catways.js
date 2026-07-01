const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const catwaysService = require('../../services/catwaysService');

// ======================
// LIST
// ======================
router.get('/', auth, async (req, res) => {
    try {
        const catways = await catwaysService.getAll();

        res.render('catways/index', {
            catways
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement catways");
    }
});

// ======================
// NEW FORM
// ======================
router.get('/new', auth, (req, res) => {
    res.render('catways/new');
});

// ======================
// CREATE
// ======================
router.post('/new', auth, async (req, res) => {
    try {

        await catwaysService.create({
            catwayNumber: Number(req.body.catwayNumber),
            type: req.body.type,
            catwayState: req.body.catwayState
        });

        res.redirect('/dashboard/catways');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// ======================
// EDIT FORM
// ======================
router.get('/edit/:id', auth, async (req, res) => {
    try {

        const catway = await catwaysService.findById(req.params.id);

        if (!catway) {
            return res.status(404).send("Catway introuvable");
        }

        res.render('catways/edit', {
            catway
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement");
    }
});

// ======================
// UPDATE
// ======================
router.post('/edit/:id', auth, async (req, res) => {
    try {

        await catwaysService.update(req.params.id, {
            catwayNumber: Number(req.body.catwayNumber),
            type: req.body.type,
            catwayState: req.body.catwayState
        });

        res.redirect('/dashboard/catways');

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur modification");
    }
});

// ======================
// DELETE
// ======================
router.post('/delete/:id', auth, async (req, res) => {
    try {

        await catwaysService.delete(req.params.id);

        res.redirect('/dashboard/catways');

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur suppression");
    }
});

module.exports = router;