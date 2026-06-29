const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userService = require('../../services/usersService');

// REGISTER
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation error",
                errors: errors.array()
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await userService.createUser({
            email: req.body.email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Utilisateur créé",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// LOGIN (IMPORTANT: SESSION + REDIRECT)
exports.login = async (req, res) => {
    try {
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
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // SESSION USER
        req.session.user = {
            id: user._id,
            email: user.email
        };

        // REDIRECT DASHBOARD
        return res.redirect('/dashboard');

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};