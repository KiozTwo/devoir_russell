const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userService = require('../../services/usersService');

// ======================
// GET ALL USERS
// ======================
exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json(users);

    } catch (error) {
        console.error("Erreur getUsers :", error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs"
        });
    }
};

// ======================
// GET USER BY ID
// ======================
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Erreur getUserById :", error);
        return res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur"
        });
    }
};

// ======================
// CREATE USER
// ======================
exports.createUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation échouée",
                errors: errors.array()
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await userService.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'user'
        });

        return res.status(201).json({
            message: "Utilisateur créé avec succès",
            user
        });

    } catch (error) {
        console.error("Erreur createUser :", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Cette adresse email est déjà utilisée"
            });
        }

        return res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur"
        });
    }
};

// ======================
// UPDATE USER
// ======================
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.status(200).json({
            message: "Utilisateur modifié avec succès",
            user
        });

    } catch (error) {
        console.error("Erreur updateUser :", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Cette adresse email est déjà utilisée"
            });
        }

        return res.status(500).json({
            message: "Erreur lors de la modification de l'utilisateur"
        });
    }
};

// ======================
// DELETE USER
// ======================
exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.delete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.status(200).json({
            message: "Utilisateur supprimé avec succès"
        });

    } catch (error) {
        console.error("Erreur deleteUser :", error);
        return res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur"
        });
    }
};