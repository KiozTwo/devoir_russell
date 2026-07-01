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
        console.log("BODY :", req.body);

        const catway = await catwaysService.create({
            catwayNumber: Number(req.body.catwayNumber),
            type: req.body.type,
            catwayState: req.body.catwayState
        });

        console.log("CATWAY CREATED :", catway);

        return res.redirect('/dashboard/catways');

    } catch (err) {
        console.error("========== ERREUR CATWAY ==========");
        console.error(err);
        console.error("===================================");

        return res.status(500).send(err.message);
    }
});

module.exports = router;