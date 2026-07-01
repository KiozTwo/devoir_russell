const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// LIST USERS
router.get('/', auth, (req, res) => {
    try {
        res.render('users/index', {
            users: [] // temporaire pour éviter crash
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur users dashboard");
    }
});

// NEW USER FORM
router.get('/new', auth, (req, res) => {
    res.render('users/new');
});

// EDIT USER FORM
router.get('/edit/:id', auth, (req, res) => {
    res.render('users/edit', {
        user: { _id: req.params.id } // temporaire safe
    });
});

module.exports = router;