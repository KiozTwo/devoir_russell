const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const catwaysService = require('../../services/catwaysService');

// LIST
router.get('/', auth, async (req, res) => {
    const catways = await catwaysService.getAll();
    res.render('catways/index', { catways });
});

// FORM
router.get('/new', auth, (req, res) => {
    res.render('catways/new');
});

// CREATE ⭐⭐⭐ IMPORTANT
router.post('/new', auth, async (req, res) => {
    try {
        await catwaysService.create({
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState
        });

        return res.redirect('/dashboard/catways');

    } catch (err) {
        console.error(err);
        return res.status(500).send("Erreur création catway");
    }
});

module.exports = router;