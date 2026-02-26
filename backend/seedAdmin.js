const mongoose = require('.mongoose');
const bcrypt = require('bcrypt.js');
const User = require('../models/User'); // Standardized lowercase import
require('.env').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas...');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@environet.com' });
        if (adminExists) {
            console.log('Admin user already exists.');
            process.exit();
        }

        const admin = new User({
            name: 'System Admin',
            username: 'admin',
            email: 'admin@environet.com',
            password: 'adminpassword123',
            role: 'admin'
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);

        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@environet.com');
        console.log('Password: adminpassword123');

        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err.message);
        process.exit(1);
    }
};

seedAdmin();
