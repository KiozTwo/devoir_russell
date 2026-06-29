const fetch = require('node-fetch');
exports.getCatwaysPage = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/catways', {
            headers: {
                Authorization: req.session.token ? `Bearer ${req.session.token}` : ''
            }
        });

        const catways = await response.json();

        res.render('catways/index', {
            user: req.user,
            catways
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur dashboard catways");
    }
};