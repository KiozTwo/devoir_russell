const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const catwaysService = require('../../services/catwaysService');

// LIST
router.get('/', auth, async (req, res) => {
    const catways = await catwaysService.getAll();
    res.render('catways/index', { catways });
});

// NEW
router.get('/new', auth, (req, res) => {
    res.render('catways/new');
});

// CREATE
router.post('/new', auth, async (req, res) => {
    await catwaysService.create(req.body);
    res.redirect('/dashboard/catways');
});

// EDIT PAGE
router.get('/edit/:id', auth, async (req, res) => {
    const catway = await catwaysService.findById(req.params.id);

    if (!catway) return res.status(404).send("Catway introuvable");

    res.render('catways/edit', { catway });
});

// UPDATE
router.post('/edit/:id', auth, async (req, res) => {
    await catwaysService.update(req.params.id, req.body);
    res.redirect('/dashboard/catways');
});

// DELETE
router.post('/delete/:id', auth, async (req, res) => {
    await catwaysService.delete(req.params.id);
    res.redirect('/dashboard/catways');
});

module.exports = router;