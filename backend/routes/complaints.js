const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Complaint = require('../models/Complaint');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// @route   GET api/complaints
// @desc    Get all complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ reportedAt: -1 }).populate('reportedBy', 'name');
        res.json(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/complaints
// @desc    Create a complaint
router.post('/', [auth, upload.single('image')], async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    try {
        if (!req.body) {
            return res.status(400).json({ msg: 'Request body is missing' });
        }
        const { title, description, category, location, urgency } = req.body;

        // Find if it's JSON location or string (handle both)
        let parsedLocation = location;
        if (typeof location === 'string') {
            try {
                parsedLocation = JSON.parse(location);
            } catch (e) {
                // Keep as string if it's not JSON
            }
        }

        const newComplaint = new Complaint({
            title,
            description,
            category,
            location: parsedLocation,
            urgency,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            reportedBy: req.user.id
        });

        const complaint = await newComplaint.save();
        res.json(complaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/complaints/:id
// @desc    Update complaint status
router.put('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        let complaint = await Complaint.findById(req.params.id);

        if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

        // Update status
        complaint.status = status;
        await complaint.save();

        res.json(complaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
