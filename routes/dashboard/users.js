const router = require('express').Router();
const auth = require('../../middleware/auth');
const fetch = require('node-fetch');

// DASHBOARD USERS via API
router.get('/', auth, async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            headers: {
                Authorization: req.headers.authorization
            }
        });

        const users = await response.json();

        res.render('dashboard/users', {
            user: req.user,
            users
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur dashboard users");
    }
});

module.exports = router;