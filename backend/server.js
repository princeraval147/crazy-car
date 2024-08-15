const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import models
const User = require('./models/User');
const Contact = require('./models/contact');
const CarData = require('./models/cardata');

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Verify token route
app.post('/verify-token', async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }

        res.status(200).json({ valid: true });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
};

// Signup route
app.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'An error occurred during signup' });
    }
});

// Insert car data route
app.post('/cardata', async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const newCarData = new CarData({ title, description, image });
        await newCarData.save();
        res.status(201).json(newCarData);
    } catch (error) {
        console.error('Error saving car data:', error);
        res.status(400).json({ error: 'Error saving car data' });
    }
});

// Get all car data route
app.get('/cardata', async (req, res) => {
    try {
        const carData = await CarData.find();
        res.status(200).json(carData);
    } catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Error fetching car data' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    res.clearCookie('token'); // Remove the JWT cookie
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// Contact route
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = await Contact.create({ name, email, message });
        res.status(201).json(newContact);
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(400).json({ error: 'Error saving contact' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:5000/signUp:${port}`);
});
