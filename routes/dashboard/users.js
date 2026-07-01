const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userService = require('../../services/usersService');

// LIST
router.get('/', auth, async (req, res) => {
    const users = await userService.getAll();
    res.render('users/index', { users });
});

// NEW FORM
router.get('/new', auth, (req, res) => {
    res.render('users/new');
});

// CREATE
router.post('/new', auth, async (req, res) => {
    await userService.create(req.body);
    res.redirect('/dashboard/users');
});

// EDIT PAGE
router.get('/edit/:id', auth, async (req, res) => {
    const user = await userService.findById(req.params.id);

    if (!user) return res.status(404).send("User introuvable");

    res.render('users/edit', { user });
});

// UPDATE
router.post('/edit/:id', auth, async (req, res) => {
    await userService.update(req.params.id, req.body);
    res.redirect('/dashboard/users');
});

// DELETE
router.post('/delete/:id', auth, async (req, res) => {
    await userService.delete(req.params.id);
    res.redirect('/dashboard/users');
});

module.exports = router;