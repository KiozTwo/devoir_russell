const reservationService = require('../../services/reservationsService');
const { validationResult } = require('express-validator');

exports.getAllReservations = async (req, res) => {
    try {
        const data = await reservationService.getAll();
        res.json(data);
    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const data = await reservationService.getById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Introuvable" });
        }

        res.json(data);
    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation error",
                errors: errors.array()
            });
        }

        const data = await reservationService.create(req.body);
        res.status(201).json(data);

    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const data = await reservationService.update(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({ message: "Introuvable" });
        }

        res.json(data);

    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        await reservationService.delete(req.params.id);
        res.status(204).send();
    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};