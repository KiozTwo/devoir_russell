const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const catwaysController = require('../../controllers/dashboard/catwaysController');

// ======================
// LIST
// ======================
router.get('/', auth, catwaysController.index);

// ======================
// NEW FORM
// ======================
router.get('/new', auth, catwaysController.newForm);

// ======================
// CREATE
// ======================
router.post('/new', auth, catwaysController.create);

// ======================
// EDIT FORM
// ======================
router.get('/edit/:id', auth, catwaysController.editForm);

// ======================
// UPDATE
// ======================
router.post('/edit/:id', auth, catwaysController.update);

// ======================
// DELETE
// ======================
router.post('/delete/:id', auth, catwaysController.delete);

module.exports = router;