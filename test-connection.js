const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://booksharing:Paramvir34@booksharing.umbn77k.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas!'))
.catch(err => console.error('❌ MongoDB Atlas connection error:', err));
