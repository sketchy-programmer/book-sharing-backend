const Comment = require('../models/Comment');
const { sendNotification } = require('../utils/socket');

exports.createComment = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { content } = req.body;

        const comment = await Comment.create({
            user: req.user._id,
            book: bookId,
            content
        });

        sendNotification(bookId, `New comment on your book: "${content}"`);

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Error creating comment' });
    }
};

exports.getCommentsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const comments = await Comment.find({ book: bookId }).populate('user', 'username');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
};