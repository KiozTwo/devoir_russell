const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste des utilisateurs
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer utilisateur
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Créé
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Modifié
 *       404:
 *         description: Not found
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Supprimé
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;