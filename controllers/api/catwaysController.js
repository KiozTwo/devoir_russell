const catwaysService = require('../../services/catwaysService');
const { validationResult } = require('express-validator');

// ======================
// GET ALL CATWAYS
// ======================
exports.getCatways = async (req, res) => {
    try {
        const data = await catwaysService.getAllCatways();
        return res.json(data);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

// ======================
// GET CATWAY BY ID
// ======================
exports.getCatwayById = async (req, res) => {
    try {
        const data = await catwaysService.getCatwayById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.json(data);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
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

        const data = await catwaysService.createCatway(req.body);

        return res.status(201).json({
            message: "Catway créé avec succès",
            data
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

// ======================
// UPDATE CATWAY
// ======================
exports.updateCatway = async (req, res) => {
    try {
        const data = await catwaysService.updateCatway(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.json({
            message: "Catway modifié avec succès",
            data
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

// ======================
// DELETE CATWAY
// ======================
exports.deleteCatway = async (req, res) => {
    try {
        const deleted = await catwaysService.deleteCatway(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Catway introuvable"
            });
        }

        return res.status(200).json({
            message: "Catway supprimé avec succès"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};