const router = require('express').Router();
const auth = require('../../middleware/auth');
const fetch = require('node-fetch');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ======================
// DASHBOARD CATWAYS
// ======================
router.get('/', auth, async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/api/catways`, {
            headers: {
                Authorization: req.headers.authorization || ''
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const catways = await response.json();

        return res.render('dashboard/catways', {
            user: req.user,
            catways
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur serveur dashboard");
    }
});

module.exports = router;