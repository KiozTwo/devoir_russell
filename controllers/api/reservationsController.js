const reservationService = require('../../services/reservationsService');
const { validationResult } = require('express-validator');

// ======================
// GET ALL RESERVATIONS
// ======================
exports.getAllReservations = async (req, res) => {
    try {
        const data = await reservationService.getAll();

        return res.status(200).json(data);

    } catch (error) {
        console.error("Erreur getAllReservations :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération des réservations"
        });
    }
};

// ======================
// GET RESERVATION BY ID
// ======================
exports.getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.idReservation || req.params.id;

        const data = await reservationService.findById(reservationId);

        if (!data) {
            return res.status(404).json({
                message: "Réservation introuvable"
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Erreur getReservationById :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération de la réservation"
        });
    }
};

// ======================
// CREATE RESERVATION
// ======================
exports.createReservation = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation échouée",
                errors: errors.array()
            });
        }

        const data = await reservationService.create(req.body);

        return res.status(201).json({
            message: "Réservation créée avec succès",
            data
        });

    } catch (error) {
        console.error("Erreur createReservation :", error);

        return res.status(500).json({
            message: "Erreur lors de la création de la réservation"
        });
    }
};

// ======================
// UPDATE RESERVATION
// ======================
exports.updateReservation = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation échouée",
                errors: errors.array()
            });
        }

        const reservationId = req.params.idReservation || req.params.id;

        const data = await reservationService.update(reservationId, req.body);

        if (!data) {
            return res.status(404).json({
                message: "Réservation introuvable"
            });
        }

        return res.status(200).json({
            message: "Réservation modifiée avec succès",
            data
        });

    } catch (error) {
        console.error("Erreur updateReservation :", error);

        return res.status(500).json({
            message: "Erreur lors de la modification de la réservation"
        });
    }
};

// ======================
// DELETE RESERVATION
// ======================
exports.deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.idReservation || req.params.id;

        const deleted = await reservationService.delete(reservationId);

        if (!deleted) {
            return res.status(404).json({
                message: "Réservation introuvable"
            });
        }

        return res.status(200).json({
            message: "Réservation supprimée avec succès"
        });

    } catch (error) {
        console.error("Erreur deleteReservation :", error);

        return res.status(500).json({
            message: "Erreur lors de la suppression de la réservation"
        });
    }
};