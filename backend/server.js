const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

// Import models
const User = require('./models/User');
const Contact = require('./models/contact');

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
        process.exit(1); // Exit process with failure
    }
};

connectDB();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
    origin: "https://crazycar-project.netlify.app/", // Adjust this to match the origin of your frontend application
    credentials: true // Allow cookies and authorization headers
}));
app.use(express.json());
app.use(cookieParser());

//------------------------------------------------------------------------------
// Signup data
//------------------------------------------------------------------------------
app.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        // Send token in cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'An error occurred during signup' });
    }
});

//------------------------------------------------------------------------------
// login data
//------------------------------------------------------------------------------
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Send token in cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

//------------------------------------------------------------------------------
// contact data
//------------------------------------------------------------------------------
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
    console.log(`Server running on http://localhost:${port}`);
});
