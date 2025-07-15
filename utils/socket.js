let ioInstance;
const Notification = require('../models/Notification');
const Book = require('../models/Book');

function setupSocket(io) {
    ioInstance = io;
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('joinRoom', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their personal room`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

async function sendNotification(bookId, message) {
    try {
        const book = await Book.findById(bookId).populate('author');
        if (!book) return;

        const newNotification = await Notification.create({
            user: book.author._id,
            message
        });

        if (ioInstance) {
            ioInstance.to(book.author._id.toString()).emit('newNotification', newNotification);
        }
    } catch (err) {
        console.error('Error sending notification:', err);
    }
}

module.exports = { setupSocket, sendNotification };
