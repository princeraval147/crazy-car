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
// const port = 5000;
const port = process.env.PORT || 4000

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
    // origin: "http://localhost:5173",
    origin: "https://crazycar-project.netlify.app",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Please Login' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (user.isadmin) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



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

//check isloggedin
app.get('/auth/check', authenticateToken, (req, res) => {
    res.status(200).json({ isLoggedIn: true });
});

//admin check
app.get('/admin/check', isAdmin, (req, res) => {
    res.status(200).json({ isadmin: 'true' });
});



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
//logout route
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// Insert car data route
app.post('/cardata', async (req, res) => {
    const { model, brand, price, description, image } = req.body;
    try {
        const newCarData = new CarData({ model, brand, price, description, image });
        await newCarData.save();
        res.status(201).json(newCarData);
    } catch (error) {
        console.error('Error saving car data:', error);
        res.status(400).json({ error: 'Error saving car data' });
    }
});

// Route to get car data by ID
app.get('/cardata/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const car = await CarData.findById(id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
        } else {
            res.json(car);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching car data' });
    }
});

// Update car data
app.put('/cardata/:id', async (req, res) => {
    const { id } = req.params;
    const { model, brand, price, description, image } = req.body;

    try {
        const updatedCarData = await CarData.findByIdAndUpdate(
            id,
            { model, brand, price, description, image },
            { new: true }
        );

        if (!updatedCarData) {
            return res.status(404).json({ message: 'Car data not found' });
        }

        res.status(200).json(updatedCarData);
    } catch (error) {
        console.error('Error updating car data:', error);
        res.status(500).json({ message: 'An error occurred while updating car data' });
    }
});

// Delete car data
app.delete('/cardata/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCarData = await CarData.findByIdAndDelete(id);

        if (!deletedCarData) {
            return res.status(404).json({ message: 'Car data not found' });
        }

        res.status(200).json({ message: 'Car data deleted successfully' });
    } catch (error) {
        console.error('Error deleting car data:', error);
        res.status(500).json({ message: 'An error occurred while deleting car data' });
    }
});

// route to get user count
app.get('/api/users/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch user count' });
    }
});

// route to get car data count
app.get('/api/cars/count', async (req, res) => {
    try {
        const totalCars = await CarData.countDocuments({});
        res.json({ totalCars });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch car count' });
    }
});

// get all user route
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});
// Get all car data for admin route
app.get('/cardataadmin', async (req, res) => {
    try {
        const carData = await CarData.find();
        res.status(200).json(carData);
    } catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Error fetching car data' });
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
app.get('/logout', (req, res) => {
    // res.cookie('token','');
    res.clearCookie('token');
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
    // console.log(`Server running on http://localhost:${port}`);
    console.log(`Server running on https://crazycar-backend.onrender.com/signUp:${port}`);
});
