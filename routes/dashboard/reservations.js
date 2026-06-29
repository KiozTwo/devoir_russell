const router = require('express').Router();
const auth = require('../../middleware/auth');
const fetch = require('node-fetch');

// DASHBOARD reservations (via API)
router.get('/', auth, async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/reservations', {
            headers: {
                Authorization: req.headers.authorization
            }
        });

        const reservations = await response.json();

        res.render('dashboard/reservations', {
            user: req.user,
            reservations
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur dashboard");
    }
});

module.exports = router;