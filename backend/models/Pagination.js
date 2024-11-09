const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cars', { useNewUrlParser: true, useUnifiedTopology: true });

// Car schema
const carSchema = new mongoose.Schema({
    brand: String,
    model: String
});
const Car = mongoose.model('Car', carSchema);

app.get('/cardata', async (req, res) => {
    // const limit = parseInt(req.query.limit);
    // const skip = parseInt(req.query.skip);

    const cars = await Car.find()
        .skip(skip)
        .limit(limit)
        .sort({ id: 1 }); // Sort by ID

    res.json(cars);
});
