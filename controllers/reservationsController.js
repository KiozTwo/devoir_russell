const Reservation = require('../models/reservation');

/**
 * Récupère les réservations d'un catway.
 *
 * @async
 * @function getReservations
 */
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({
            catwayNumber: req.params.id
        });

        res.status(200).json(reservations);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

/**
 * Récupère une réservation par son identifiant.
 *
 * @async
 * @function getReservationById
 */
exports.getReservationById = async (req, res) => {
    try {

        const reservation = await Reservation.findOne({
            _id: req.params.rid,
            catwayNumber: req.params.id
        });

        if (!reservation) {
            return res.status(404).json({
                message: 'Réservation introuvable'
            });
        }

        res.status(200).json(reservation);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

/**
 * Crée une réservation.
 *
 * @async
 * @function createReservation
 */
exports.createReservation = async (req, res) => {
    try {

        const {
            clientName,
            boatName,
            startDate,
            endDate
        } = req.body;

        if (!clientName || !boatName || !startDate || !endDate) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires'
            });
        }

        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                message: 'La date de fin doit être postérieure à la date de début'
            });
        }

        const reservation = await Reservation.create({
            clientName,
            boatName,
            startDate,
            endDate,
            catwayNumber: req.params.id
        });

        res.status(201).json(reservation);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

/**
 * Met à jour une réservation.
 *
 * @async
 * @function updateReservation
 */
exports.updateReservation = async (req, res) => {
    try {

        const {
            clientName,
            boatName,
            startDate,
            endDate
        } = req.body;

        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                message: 'La date de fin doit être postérieure à la date de début'
            });
        }

        const reservation = await Reservation.findOneAndUpdate(
            {
                _id: req.params.rid,
                catwayNumber: req.params.id
            },
            {
                clientName,
                boatName,
                startDate,
                endDate
            },
            {
                new: true
            }
        );

        if (!reservation) {
            return res.status(404).json({
                message: 'Réservation introuvable'
            });
        }

        res.status(200).json(reservation);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

/**
 * Supprime une réservation.
 *
 * @async
 * @function deleteReservation
 */
exports.deleteReservation = async (req, res) => {
    try {

        const deleted = await Reservation.findOneAndDelete({
            _id: req.params.rid,
            catwayNumber: req.params.id
        });

        if (!deleted) {
            return res.status(404).json({
                message: 'Réservation introuvable'
            });
        }

        res.status(200).json({
            message: 'Réservation supprimée'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};