const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userService = require('../../services/usersService');

// ======================
// LIST
// ======================
router.get('/', auth, async (req, res) => {
    const users = await userService.getAll();
    res.render('users/index', { users });
});

// ======================
// NEW FORM
// ======================
router.get('/new', auth, (req, res) => {
    res.render('users/new');
});

// ======================
// CREATE USER
// ======================
router.post('/new', auth, async (req, res) => {
    try {
        await userService.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        });

        return res.redirect('/dashboard/users');

    } catch (err) {
        console.error(err);
        return res.status(500).send("Erreur création user");
    }
});

// ======================
// EDIT PAGE
// ======================
router.get('/edit/:id', auth, async (req, res) => {
    const users = await userService.getAll();
    const user = users.find(u => u._id === req.params.id);

    if (!user) {
        return res.status(404).send("User introuvable");
    }

    res.render('users/edit', { user });
});

// ======================
// UPDATE USER
// ======================
router.post('/edit/:id', auth, async (req, res) => {
    const users = await userService.getAll();
    const index = users.findIndex(u => u._id === req.params.id);

    if (index === -1) {
        return res.status(404).send("User introuvable");
    }

    users[index] = {
        ...users[index],
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    return res.redirect('/dashboard/users');
});

// ======================
// DELETE USER (AJOUTÉ ✔)
// ======================
router.post('/delete/:id', auth, async (req, res) => {
    const users = await userService.getAll();
    const index = users.findIndex(u => u._id === req.params.id);

    if (index === -1) {
        return res.status(404).send("User introuvable");
    }

    users.splice(index, 1);

    return res.redirect('/dashboard/users');
});

module.exports = router;