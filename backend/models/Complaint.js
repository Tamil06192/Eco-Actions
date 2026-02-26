const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: String
    },
    urgency: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    status: { type: String, enum: ['open', 'in-progress', 'solved'], default: 'open' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reportedAt: { type: Date, default: Date.now },
    image: String
});

module.exports = mongoose.model('Complaint', complaintSchema);
