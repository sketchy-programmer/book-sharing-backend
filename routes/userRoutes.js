const express = require('express');
const router = express.Router();
const { followWriter, addFavorite, getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the User API' });
});
router.get('/me', protect, (req, res) => {
    res.status(200).json({ message: 'User authenticated successfully' });
});
router.post('/register', (req, res) => {
    res.status(201).json({ message: 'User registered successfully' });
})
router.post('/login', (req, res) => {
    res.status(200).json({ message: 'User logged in successfully' })
});
router.get('/profile', protect, getProfile);
router.post('/follow/:id', protect, followWriter);
router.post('/favorite/:id', protect, addFavorite);

module.exports = router;
