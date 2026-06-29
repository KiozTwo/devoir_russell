const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

/**
 * Affiche la liste des réservations.
 *
 * @async
 * @function list
 */
exports.list = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('catway');
        res.render('reservations/index', { reservations });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Affiche le formulaire de création d'une réservation.
 *
 * @async
 * @function newForm
 */
exports.newForm = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('reservations/new', { catways });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Crée une réservation.
 *
 * @async
 * @function create
 */
exports.create = async (req, res) => {
    try {
        const { clientName, boatName, catway, startDate, endDate } = req.body;

        await Reservation.create({
            clientName,
            boatName,
            catway,
            startDate,
            endDate
        });

        res.redirect('/reservations');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Affiche le formulaire de modification d'une réservation.
 *
 * @async
 * @function editForm
 */
exports.editForm = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        const catways = await Catway.find();

        res.render('reservations/edit', { reservation, catways });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Met à jour une réservation.
 *
 * @async
 * @function update
 */
exports.update = async (req, res) => {
    try {
        const { clientName, boatName, catway, startDate, endDate } = req.body;

        await Reservation.findByIdAndUpdate(req.params.id, {
            clientName,
            boatName,
            catway,
            startDate,
            endDate
        });

        res.redirect('/reservations');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

/**
 * Supprime une réservation.
 *
 * @async
 * @function remove
 */
exports.remove = async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.redirect('/reservations');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};