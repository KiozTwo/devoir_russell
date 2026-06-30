const router = require('express').Router();
const auth = require('../../middleware/auth');
const catwaysService = require('../../services/catwaysService');

router.get('/', auth, async (req, res) => {

    try {

        const catways = await catwaysService.getAllCatways();

        res.render('catways/index', {
            user: req.session.user,
            catways
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur serveur dashboard catways");
    }

});

module.exports = router;