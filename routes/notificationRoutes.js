const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

router.get('/', protect, getNotifications);
router.put('/:id', protect, markAsRead);

module.exports = router;