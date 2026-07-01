const router = require('express').Router();
const auth = require('../../middleware/auth');
const reservationsService = require('../../services/reservationsService');

router.get('/', auth, async (req, res) => {
    try {
        const reservations = await reservationsService.getAll();

        res.render('reservations/index', {
            user: req.session.user,
            reservations
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`<pre>${err.stack}</pre>`);
    }
});

module.exports = router;