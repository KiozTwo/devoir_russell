const catwaysService = require('../../services/catwaysService');

// ======================
// LIST
// ======================
exports.index = async (req, res) => {
    try {
        const catways = await catwaysService.getAll();

        res.render('catways/index', {
            catways
        });

    } catch (err) {
        console.error("Erreur chargement catways :", err);
        res.status(500).send("Erreur lors du chargement des catways");
    }
};

// ======================
// NEW FORM
// ======================
exports.newForm = (req, res) => {
    res.render('catways/new');
};

// ======================
// CREATE
// ======================
exports.create = async (req, res) => {
    try {
        await catwaysService.create({
            catwayNumber: Number(req.body.catwayNumber),
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState
        });

        res.redirect('/dashboard/catways');

    } catch (err) {
        console.error("Erreur création catway :", err);
        res.status(500).send("Erreur lors de la création du catway");
    }
};

// ======================
// EDIT FORM
// ======================
exports.editForm = async (req, res) => {
    try {
        const catway = await catwaysService.findById(req.params.id);

        if (!catway) {
            return res.status(404).send("Catway introuvable");
        }

        res.render('catways/edit', {
            catway
        });

    } catch (err) {
        console.error("Erreur chargement catway :", err);
        res.status(500).send("Erreur lors du chargement du catway");
    }
};

// ======================
// UPDATE
// ======================
exports.update = async (req, res) => {
    try {
        await catwaysService.update(req.params.id, {
            catwayState: req.body.catwayState
        });

        res.redirect('/dashboard/catways');

    } catch (err) {
        console.error("Erreur modification catway :", err);
        res.status(500).send("Erreur lors de la modification du catway");
    }
};

// ======================
// DELETE
// ======================
exports.delete = async (req, res) => {
    try {
        await catwaysService.delete(req.params.id);

        res.redirect('/dashboard/catways');

    } catch (err) {
        console.error("Erreur suppression catway :", err);
        res.status(500).send("Erreur lors de la suppression du catway");
    }
};