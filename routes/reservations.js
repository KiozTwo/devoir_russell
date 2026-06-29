const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservationsController');

/**
 * @swagger
 * tags:
 *   name: Reservations
 */

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Liste des réservations d’un catway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:id/reservations', reservationsController.getReservations);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Réservation par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: idReservation
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get('/:id/reservations/:idReservation', reservationsController.getReservationById);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Créer réservation
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Créé
 */
router.post('/:id/reservations', reservationsController.createReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifier réservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: idReservation
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Modifié
 *       404:
 *         description: Not found
 */
router.put('/:id/reservations/:idReservation', reservationsController.updateReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer réservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: idReservation
 *         required: true
 *     responses:
 *       200:
 *         description: Supprimé
 */
router.delete('/:id/reservations/:idReservation', reservationsController.deleteReservation);

module.exports = router;