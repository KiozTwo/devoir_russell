const router = require('express').Router();

const userController = require('../../controllers/api/userController');

// GET all users
router.get('/', userController.getUsers);

// GET user by id
router.get('/:id', userController.getUserById);

module.exports = router;