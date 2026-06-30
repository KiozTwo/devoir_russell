const router = require('express').Router();
const auth = require('../../middleware/auth');
const usersService = require('../../services/usersService');

router.get('/', auth, async (req, res) => {
    try {
        console.log("SESSION :", req.session.user);

        const users = await usersService.getAllUsers();

        console.log("USERS :", users);

        res.render('users/index', {
            user: req.session.user,
            users
        });

  } catch (err) {
        console.error(err);
        res.status(500).send(`<pre>${err.stack}</pre>`);
    }
});

module.exports = router;