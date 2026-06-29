const fetch = require('node-fetch');
exports.getUsersPage = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            headers: {
                Authorization: req.session.token ? `Bearer ${req.session.token}` : ''
            }
        });

        const users = await response.json();

        res.render('users/index', {
            user: req.user,
            users
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur dashboard users");
    }
};