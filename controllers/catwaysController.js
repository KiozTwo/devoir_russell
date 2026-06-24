const Catway = require('../models/catway');

exports.getCatways = async (req, res) => {
    try {
        const catways = await Catway.find();

        res.status(200).json(catways);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getCatwayById = async (req, res) => {
    try {

        const catway = await Catway.findById(req.params.id);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway introuvable'
            });
        }

        res.status(200).json(catway);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.createCatway = async (req, res) => {
    try {

        const catway = await Catway.create(req.body);

        res.status(201).json(catway);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateCatway = async (req, res) => {
    try {

        const catway = await Catway.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!catway) {
            return res.status(404).json({
                message: 'Catway introuvable'
            });
        }

        res.status(200).json(catway);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.deleteCatway = async (req, res) => {
    try {

        const deleted = await Catway.findByIdAndDelete(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                message: 'Catway introuvable'
            });
        }

        res.status(200).json({
            message: 'Catway supprimé'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};