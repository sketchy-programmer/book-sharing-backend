const User = require('../models/User');

exports.followWriter = async (req, res) => {
    try {
        const writerId = req.params.id;
        if (req.user.followedWriters.includes(writerId)) {
            return res.status(400).json({ message: 'Already following this writer' });
        }
        req.user.followedWriters.push(writerId);
        await req.user.save();
        res.json({ message: 'Writer followed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error following writer' });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const bookId = req.params.id;
        if (req.user.favorites.includes(bookId)) {
            return res.status(400).json({ message: 'Book already in favorites' });
        }
        req.user.favorites.push(bookId);
        await req.user.save();
        res.json({ message: 'Book added to favorites' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding favorite' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};