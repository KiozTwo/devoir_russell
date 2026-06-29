const express = require('express');
const router = express.Router();

const apiController = require('../controllers/userController');
const frontController = require('../controllers/userFrontController');

// ======================
// API (Swagger déjà OK)
// ======================
router.get('/', apiController.getUsers);
router.get('/:id', apiController.getUserById);
router.post('/', apiController.createUser);
router.put('/:id', apiController.updateUser);
router.delete('/:id', apiController.deleteUser);

// ======================
// FRONT (EJS)
// ======================
router.get('/page', frontController.list);
router.get('/new', frontController.newForm);
router.post('/new', frontController.create);

router.get('/edit/:id', frontController.editForm);
router.post('/edit/:id', frontController.update);

router.post('/delete/:id', frontController.remove);

module.exports = router;