const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try {
        const { title, summary, genre } = req.body;
        const coverImage = req.file ? `/uploads/${req.file.filename}` : '';

        const book = await Book.create({
            title,
            summary,
            genre,
            coverImage,
            author: req.user._id
        });

        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error creating book' });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author', 'username').populate('volumes');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book' });
    }
};


