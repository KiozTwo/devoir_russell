const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');
const usersService = require('../../services/usersService');

// LIST
router.get('/', auth, async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.render('users/index', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement utilisateurs");
    }
});

// NEW FORM
router.get('/new', auth, (req, res) => {
    res.render('users/new');
});

// CREATE
router.post('/new', auth, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await usersService.create({
            username: req.body.username || req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'user'
        });

        res.redirect('/dashboard/users');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// EDIT FORM
router.get('/edit/:id', auth, async (req, res) => {
    try {
        const user = await usersService.findById(req.params.id);

        if (!user) {
            return res.status(404).send("Utilisateur introuvable");
        }

        res.render('users/edit', { user });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur chargement utilisateur");
    }
});

// UPDATE
router.post('/edit/:id', auth, async (req, res) => {
    try {
        await usersService.update(req.params.id, {
            username: req.body.username || req.body.name,
            email: req.body.email,
            role: req.body.role || 'user'
        });

        res.redirect('/dashboard/users');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// DELETE
router.post('/delete/:id', auth, async (req, res) => {
    try {
        await usersService.delete(req.params.id);
        res.redirect('/dashboard/users');
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur suppression utilisateur");
    }
});

module.exports = router;