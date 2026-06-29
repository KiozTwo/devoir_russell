const Catway = require('../models/catway');

/**
 * Affiche la liste des catways.
 *
 * @async
 * @function list
 */
exports.list = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways/index', { catways });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Affiche le formulaire de création d'un catway.
 *
 * @function newForm
 */
exports.newForm = (req, res) => {
    res.render('catways/new');
};

/**
 * Crée un nouveau catway.
 *
 * @async
 * @function create
 */
exports.create = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;

        await Catway.create({
            catwayNumber,
            type,
            catwayState
        });

        res.redirect('/catways');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Affiche le formulaire de modification d'un catway.
 *
 * @async
 * @function editForm
 */
exports.editForm = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        res.render('catways/edit', { catway });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Met à jour un catway.
 *
 * @async
 * @function update
 */
exports.update = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;

        await Catway.findByIdAndUpdate(req.params.id, {
            catwayNumber,
            type,
            catwayState
        });

        res.redirect('/catways');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Supprime un catway.
 *
 * @async
 * @function remove
 */
exports.remove = async (req, res) => {
    try {
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};