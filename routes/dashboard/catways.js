const router = require('express').Router();
const auth = require('../../middleware/auth');
const fetch = require('node-fetch');

// page dashboard catways
router.get('/', auth, async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/catways', {
            headers: {
                Authorization: req.headers.authorization
            }
        });

        const catways = await response.json();

        res.render('dashboard/catways', {
            user: req.user,
            catways
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur dashboard");
    }
});

module.exports = router;