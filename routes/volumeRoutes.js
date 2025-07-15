const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createVolume, getVolumesByBook } = require('../controllers/volumeController');

router.post('/:bookId', protect, createVolume);
router.get('/:bookId', getVolumesByBook);

module.exports = router;