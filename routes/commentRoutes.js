const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createComment, getCommentsByBook } = require('../controllers/commentController');

router.post('/:bookId', protect, createComment);
router.get('/:bookId', getCommentsByBook);

module.exports = router;