const router = require('express').Router();

const catwaysController = require('../../controllers/api/catwaysController');

const {
    createCatwayValidator,
    updateCatwayValidator
} = require('../../validators/catwayValidator');

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Récupère la liste des catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', catwaysController.getCatways);

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Récupère un catway par son identifiant
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', catwaysController.getCatwayById);

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - catwayType
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: 1
 *               catwayType:
 *                 type: string
 *                 enum: [long, short]
 *               catwayState:
 *                 type: string
 *                 example: Disponible
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createCatwayValidator, catwaysController.createCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   put:
 *     summary: Modifie l'état d'un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: Occupé
 *     responses:
 *       200:
 *         description: Catway modifié
 *       404:
 *         description: Catway introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', updateCatwayValidator, catwaysController.updateCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', catwaysController.deleteCatway);

module.exports = router;