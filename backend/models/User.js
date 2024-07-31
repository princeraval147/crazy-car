const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
    userName: String,
    email: { type: String, unique: true },
    password: String,
    isadmin: { type: Boolean, default: false }        
});

module.exports = mongoose.model('User', userSchema);