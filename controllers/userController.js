const User = require('../models/user');

/**
 * Récupère la liste des utilisateurs.
 *
 * @async
 * @function getUsers
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
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

/**
 * Récupère un utilisateur par son identifiant.
 *
 * @async
 * @function getUserById
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
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

/**
 * Crée un nouvel utilisateur.
 *
 * @async
 * @function createUser
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
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

/**
 * Met à jour un utilisateur.
 *
 * @async
 * @function updateUser
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
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

/**
 * Supprime un utilisateur.
 *
 * @async
 * @function deleteUser
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
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