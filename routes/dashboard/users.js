const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userService = require('../../services/usersService');

// LIST
router.get('/', auth, async (req, res) => {
    try {
        const users = await userService.getAll();

        res.render('users/index', {
            users
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur users");
    }
});

// FORM CREATE
router.get('/new', auth, (req, res) => {
    res.render('users/new');
});

// CREATE USER
router.post('/new', auth, async (req, res) => {
    try {
        await userService.create(req.body);

        return res.redirect('/dashboard/users');

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur création user" });
    }
});

module.exports = router;