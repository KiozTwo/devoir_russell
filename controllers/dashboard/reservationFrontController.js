const fetch = require('node-fetch');
exports.getReservationsPage = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/reservations', {
            headers: {
                Authorization: req.session.token ? `Bearer ${req.session.token}` : ''
            }
        });

        const reservations = await response.json();

        res.render('reservations/index', {
            user: req.user,
            reservations
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur dashboard reservations");
    }
};