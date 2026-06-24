const User = require('../models/user');

// GET all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// GET one user
exports.getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// CREATE user
exports.createUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        res.status(201).json({
            message: 'Utilisateur créé'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// UPDATE user
exports.updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        res.status(200).json({
            message: 'Utilisateur supprimé'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};