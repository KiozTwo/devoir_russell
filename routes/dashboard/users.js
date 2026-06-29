const router = require('express').Router();
const auth = require('../../middleware/auth');
const fetch = require('node-fetch');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ======================
// DASHBOARD USERS
// ======================
router.get('/', auth, async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users`, {
            headers: {
                Authorization: req.headers.authorization || ''
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const users = await response.json();

        return res.render('dashboard/users', {
            user: req.user,
            users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur serveur dashboard users");
    }
});

module.exports = router;