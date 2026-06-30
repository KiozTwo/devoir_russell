const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userService = require('../../services/usersService');

// LOGIN
exports.login = async (req, res) => {
    try {
        console.log("LOGIN HIT");
        console.log("BODY:", req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation error",
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user = await userService.findByEmail(email);

        if (!user) {
            return res.status(401).send("Utilisateur introuvable");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Mot de passe incorrect");
        }

        // SESSION
        req.session.user = {
            id: user._id,
            email: user.email
        };

        // REDIRECTION DASHBOARD
        return res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur serveur");
    }
};