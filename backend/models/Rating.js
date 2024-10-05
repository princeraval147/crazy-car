const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    userId: { type: String, required: true }, // Ensure userId is a string if you use the email
    rating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model('Rating', ratingSchema);