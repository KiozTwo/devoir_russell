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
                message: "Validation error",
                errors: errors.array()
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await userService.create({
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'user'
        });

        return res.status(201).json({
            message: "Utilisateur créé",
            user
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({ message: "Erreur serveur register" });
    }
};

// ======================
// LOGIN (SAFE VERSION)
// ======================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email et mot de passe requis");
        }

        const user = await userService.findByEmail(email);

        if (!user) {
            return res.status(401).send("Utilisateur introuvable");
        }

        if (!user.password) {
            return res.status(500).send("Utilisateur sans mot de passe");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Mot de passe incorrect");
        }

        // SESSION LOGIN
        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role || 'user'
        };

        console.log("LOGIN SUCCESS:", req.session.user);

        return res.redirect('/dashboard');

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).send("Erreur serveur login");
    }
};

// ======================
// LOGOUT
// ======================
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("LOGOUT ERROR:", err);
        }
        res.redirect('/');
    });
};