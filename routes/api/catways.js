const router = require('express').Router();

const catwaysController = require('../../controllers/api/catwaysController');

const {
    createCatwayValidator,
    updateCatwayValidator
} = require('../../validators/catwayValidator');

router.get('/', catwaysController.getCatways);
router.get('/:id', catwaysController.getCatwayById);

router.post('/', createCatwayValidator, catwaysController.createCatway);

router.put('/:id', updateCatwayValidator, catwaysController.updateCatway);

router.delete('/:id', catwaysController.deleteCatway);

module.exports = router;