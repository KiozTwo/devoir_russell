const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const catwaysService = require('../../services/catwaysService');

// LIST
router.get('/', auth, async (req, res) => {
    try {
        const catways = await catwaysService.getAllCatways();

        res.render('catways/index', {
            user: req.session.user,
            catways
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// NEW FORM
router.get('/new', auth, (req, res) => {
    res.render('catways/new');
});

// EDIT FORM
router.get('/edit/:id', auth, async (req, res) => {
    const catway = await catwaysService.getById(req.params.id);

    res.render('catways/edit', {
        catway
    });
});

module.exports = router;