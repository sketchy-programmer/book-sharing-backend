const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middlewares/authMiddleware');
const { createBook, getBooks, getBookById } = require('../controllers/bookController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/', protect, upload.single('coverImage'), createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);

module.exports = router;
