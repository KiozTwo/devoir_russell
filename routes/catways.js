const express = require('express');
const router = express.Router();

const apiController = require('../controllers/catwayController');
const frontController = require('../controllers/catwayFrontController');

// ================= API =================
router.get('/', apiController.getCatways);
router.get('/:id', apiController.getCatwayById);
router.post('/', apiController.createCatway);
router.put('/:id', apiController.updateCatway);
router.delete('/:id', apiController.deleteCatway);

// ================= FRONT =================
router.get('/page', frontController.list);
router.get('/new', frontController.newForm);
router.post('/new', frontController.create);

router.get('/edit/:id', frontController.editForm);
router.post('/edit/:id', frontController.update);

router.post('/delete/:id', frontController.remove);

module.exports = router;