const router = require('express').Router();

const userController = require('../../controllers/api/userController');

const {
    registerValidator
} = require('../../validators/userValidator');

// ======================
// GET ALL USERS
// ======================
router.get('/', userController.getUsers);

// ======================
// GET USER BY ID
// ======================
router.get('/:id', userController.getUserById);

// ======================
// CREATE USER
// ======================
router.post('/', registerValidator, userController.createUser);

// ======================
// UPDATE USER
// ======================
router.put('/:id', userController.updateUser);

// ======================
// DELETE USER
// ======================
router.delete('/:id', userController.deleteUser);

module.exports = router;