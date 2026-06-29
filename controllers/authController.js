const User = require('../models/user');

/**
 * Affiche la page de connexion
 */
exports.loginPage = (req, res) => {
    res.render('login');
};

/**
 * Création d'un utilisateur
 */
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(400).send("Cette adresse email existe déjà.");
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.redirect('/auth/login');

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

};

/**
 * Connexion
 */
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).send("Email ou mot de passe incorrect.");
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return res.status(401).send("Email ou mot de passe incorrect.");
        }

        // Création de la session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // Redirection vers le dashboard
        res.redirect('/dashboard');

    } catch (error) {

        console.error(error);
        res.status(500).send("Erreur serveur");

    }

};

/**
 * Déconnexion
 */
exports.logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).send("Erreur lors de la déconnexion.");
        }

        res.redirect('/auth/login');

    });

};