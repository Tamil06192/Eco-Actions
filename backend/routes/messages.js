const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// @route   GET api/messages
// @desc    Get all chat messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 }).limit(50);
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/messages
// @desc    Add a message
router.post('/', auth, async (req, res) => {
    try {
        const { text, senderName } = req.body;

        const newMessage = new Message({
            text,
            senderName,
            sender: req.user.id
        });

        const message = await newMessage.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
