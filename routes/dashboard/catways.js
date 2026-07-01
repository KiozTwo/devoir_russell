const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const catwaysService = require('../../services/catwaysService');

// LIST
router.get('/', auth, async (req, res) => {
    try {
        const catways = await catwaysService.getAllCatways();

        res.render('catways/index', {
            catways,
            user: req.session.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur catways");
    }
});

// NEW
router.get('/new', auth, (req, res) => {
    res.render('catways/new');
});

// EDIT
router.get('/edit/:id', auth, async (req, res) => {
    try {
        const catway = await catwaysService.getById(req.params.id);

        res.render('catways/edit', {
            catway
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur catway edit");
    }
});

module.exports = router;