const User = require('../models/user');

/**
 * Affiche la page de connexion.
 *
 * @function loginPage
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {void}
 */
exports.loginPage = (req, res) => {
    res.render('login');
};

/**
 * Crée un nouvel utilisateur.
 *
 * @async
 * @function register
 * @param {import('express').Request} req Requête HTTP contenant les informations de l'utilisateur.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
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
            email: email.toLowerCase(),
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
 * Authentifie un utilisateur et crée une session.
 *
 * @async
 * @function login
 * @param {import('express').Request} req Requête HTTP contenant l'email et le mot de passe.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("EMAIL REÇU:", email);

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        console.log("USER TROUVÉ:", user ? "OUI" : "NON");

        if (!user) {
            return res.status(401).send("Email ou mot de passe incorrect.");
        }

        const validPassword = await user.comparePassword(password);

        console.log("PASSWORD OK:", validPassword);

        if (!validPassword) {
            return res.status(401).send("Email ou mot de passe incorrect.");
        }

        // Session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        return res.redirect('/dashboard');

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Déconnecte l'utilisateur et détruit sa session.
 *
 * @function logout
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {void}
 */
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Erreur lors de la déconnexion.");
        }

        res.redirect('/auth/login');
    });
};