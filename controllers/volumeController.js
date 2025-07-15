const Volume = require('../models/Volume');
const Book = require('../models/Book');

exports.createVolume = async (req, res) => {
    try {
        const { title, content, order } = req.body;
        const { bookId } = req.params;

        const volume = await Volume.create({
            title,
            content,
            order,
            book: bookId
        });

        await Book.findByIdAndUpdate(bookId, { $push: { volumes: volume._id } });

        res.status(201).json(volume);
    } catch (err) {
        res.status(500).json({ message: 'Error creating volume' });
    }
};

exports.getVolumesByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const volumes = await Volume.find({ book: bookId }).sort({ order: 1 });
        res.json(volumes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching volumes' });
    }
};