const User = require('../models/user');

/**
 * Affiche la liste des utilisateurs.
 *
 * @async
 * @function list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.list = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Affiche le formulaire de création d'un utilisateur.
 *
 * @function newForm
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
exports.newForm = (req, res) => {
    res.render('users/new');
};

/**
 * Enregistre un nouvel utilisateur.
 *
 * @async
 * @function create
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        await User.create({
            name,
            email,
            password,
            role
        });

        res.redirect('/users');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Affiche le formulaire de modification d'un utilisateur.
 *
 * @async
 * @function editForm
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.editForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('users/edit', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Met à jour un utilisateur.
 *
 * @async
 * @function update
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role
        });

        res.redirect('/users');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Supprime un utilisateur.
 *
 * @async
 * @function remove
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};