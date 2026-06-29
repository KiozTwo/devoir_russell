const Catway = require('../models/catway');

/**
 * Affiche la liste des catways.
 *
 * @async
 * @function getCatwaysPage
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.getCatwaysPage = async (req, res) => {
    const catways = await Catway.find();
    res.render('catways/index', { catways });
};

/**
 * Affiche le formulaire de création d'un catway.
 *
 * @function createPage
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {void}
 */
exports.createPage = (req, res) => {
    res.render('catways/create');
};

/**
 * Affiche le formulaire de modification d'un catway.
 *
 * @async
 * @function editPage
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.editPage = async (req, res) => {
    const catway = await Catway.findById(req.params.id);
    res.render('catways/edit', { catway });
};

/**
 * Crée un nouveau catway.
 *
 * @async
 * @function createCatway
 * @param {import('express').Request} req Requête HTTP contenant les données du catway.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.createCatway = async (req, res) => {
    await Catway.create(req.body);
    res.redirect('/catways');
};

/**
 * Met à jour un catway existant.
 *
 * @async
 * @function updateCatway
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.updateCatway = async (req, res) => {
    await Catway.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/catways');
};

/**
 * Supprime un catway.
 *
 * @async
 * @function deleteCatway
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.deleteCatway = async (req, res) => {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect('/catways');
};

/**
 * Retourne la liste de tous les catways au format JSON.
 *
 * @async
 * @function getCatways
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.getCatways = async (req, res) => {
    const data = await Catway.find();
    res.json(data);
};

/**
 * Retourne un catway à partir de son identifiant.
 *
 * @async
 * @function getCatwayById
 * @param {import('express').Request} req Requête HTTP.
 * @param {import('express').Response} res Réponse HTTP.
 * @returns {Promise<void>}
 */
exports.getCatwayById = async (req, res) => {
    const data = await Catway.findById(req.params.id);
    res.json(data);
};