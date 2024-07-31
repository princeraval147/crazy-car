const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

module.exports = mongoose.model('contact', contactSchema);
