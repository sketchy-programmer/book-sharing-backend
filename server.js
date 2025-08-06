const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const volumeRoutes = require('./routes/volumeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const { setupSocket } = require('./utils/socket');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
setupSocket(io);

app.use(cors({
    origin: 'https://book-sharing-project-8vi5.vercel.app', // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/volumes', volumeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the Book Sharing Project API');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(process.env.PORT || 5000, () => console.log('Server running...'));
    })
    .catch(err => console.log(err));