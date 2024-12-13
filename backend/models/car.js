const mongoose = require("mongoose");

// Define the car schema
const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      // unique: true // Ensures no duplicate model records
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    engineCapacity: {
      type: String,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    bodyType: {
      type: String,
      required: true,
    },
    safetyFeatures: {
      type: [String],
      required: true,
    },
    bootSpace: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the car model
const Car = mongoose.model("Car", carSchema);

// Export the model
module.exports = Car;
