const mongoose = require('mongoose');

const volumeSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Volume', volumeSchema);