const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    coverImage: { type: String, required: true },
    summary: { type: String },
    genre: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    volumes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Volume' } ]
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);