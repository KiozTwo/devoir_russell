const express = require('express');
const router = express.Router();
const controller = require('../controllers/catwaysController');

// FRONT
router.get('/', controller.getCatwaysPage);
router.get('/create', controller.createPage);
router.get('/edit/:id', controller.editPage);

router.post('/create', controller.createCatway);
router.post('/edit/:id', controller.updateCatway);
router.post('/delete/:id', controller.deleteCatway);

// API (Swagger)
router.get('/api/all', controller.getCatways);
router.get('/api/:id', controller.getCatwayById);
router.post('/api', controller.createCatway);
router.put('/api/:id', controller.updateCatway);
router.delete('/api/:id', controller.deleteCatway);

module.exports = router;