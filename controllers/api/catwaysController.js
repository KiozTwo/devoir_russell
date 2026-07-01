const catwaysService = require('../../services/catwaysService');
const { validationResult } = require('express-validator');

// ======================
// GET ALL CATWAYS
// ======================
exports.getCatways = async (req, res) => {
    try {
        const data = await catwaysService.getAll();

        return res.status(200).json(data);

    } catch (error) {
        console.error("Erreur getCatways :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération des catways"
        });
    }
};

// ======================
// GET CATWAY BY ID
// ======================
exports.getCatwayById = async (req, res) => {
    try {
        const data = await catwaysService.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Erreur getCatwayById :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération du catway"
        });
    }
};

// ======================
// CREATE CATWAY
// ======================
exports.createCatway = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation échouée",
                errors: errors.array()
            });
        }

        const data = await catwaysService.create(req.body);

        return res.status(201).json({
            message: "Catway créé avec succès",
            data
        });

    } catch (error) {
        console.error("Erreur createCatway :", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Un catway avec ce numéro existe déjà"
            });
        }

        return res.status(500).json({
            message: "Erreur lors de la création du catway"
        });
    }
};

// ======================
// UPDATE CATWAY
// ======================
exports.updateCatway = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation échouée",
                errors: errors.array()
            });
        }

        const data = await catwaysService.update(req.params.id, {
            catwayState: req.body.catwayState
        });

        if (!data) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.status(200).json({
            message: "État du catway modifié avec succès",
            data
        });

    } catch (error) {
        console.error("Erreur updateCatway :", error);

        return res.status(500).json({
            message: "Erreur lors de la modification du catway"
        });
    }
};

// ======================
// DELETE CATWAY
// ======================
exports.deleteCatway = async (req, res) => {
    try {
        const deleted = await catwaysService.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.status(200).json({
            message: "Catway supprimé avec succès"
        });

    } catch (error) {
        console.error("Erreur deleteCatway :", error);

        return res.status(500).json({
            message: "Erreur lors de la suppression du catway"
        });
    }
};