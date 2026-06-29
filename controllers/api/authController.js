const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userService = require('../../services/usersService');

// ======================
// REGISTER
// ======================
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
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
            success: true,
            message: "Utilisateur créé",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
};

// ======================
// LOGIN (FIXED PROPERLY)
// ======================
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user = await userService.findByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur introuvable"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Mot de passe incorrect"
            });
        }

        // SESSION
        req.session.user = {
            id: user._id,
            email: user.email
        };

        // ======================
        // IMPORTANT: DOUBLE MODE
        // ======================

        // Si appel navigateur classique
        if (!req.xhr && req.headers.accept?.includes('text/html')) {
            return res.redirect('/dashboard');
        }

        // Si API / fetch
        return res.json({
            success: true,
            message: "Login OK",
            redirect: "/dashboard",
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
};

// ======================
// LOGOUT
// ======================
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};