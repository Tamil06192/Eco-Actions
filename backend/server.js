const express = require('express');
const mongoose = require('.mongoose');
const cors = require('cors');
const path = require('path');
require('.env').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const db = process.env.MONGODB_URI;

if (!db) {
    console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(db)
    .then(() => console.log('✅ SUCCESS: Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('❌ ERROR: Could not connect to MongoDB Atlas');
        console.error('Details:', err.message);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/messages', require('./routes/messages'));

app.get('/', (req, res) => {
    res.send('ENVIRONET API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
