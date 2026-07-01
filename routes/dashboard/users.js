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
// UPDATE USER (💥 MANQUAIT)
// ======================
router.post('/edit/:id', auth, async (req, res) => {
    const users = await userService.getAll();

    const userIndex = users.findIndex(u => u._id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User introuvable" });
    }

    users[userIndex] = {
        ...users[userIndex],
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    return res.redirect('/dashboard/users');
});

module.exports = router;