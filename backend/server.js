const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import models
const User = require("./models/User");
const Contact = require("./models/contact");
const CarData = require("./models/cardata");
const Car = require("./models/car");
const Rating = require("./models/Rating");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;



// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
      console.log("MongoDB connected");
      console.log("Connected to DB:", mongoose.connection.name); // ✅ Proper way to log DB name
      mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
          console.error("Error listing collections:", err);
        } else {
          console.log("Collections in DB:", names.map(c => c.name));
        }
      });

    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

app.get("/debug/count", async (req, res) => {
  const count = await Car.countDocuments();
  res.json({ count });
});


// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//     console.log("Connected to DB:", mongoose.connection.name);

//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const JWT_SECRET = process.env.JWT_SECRET;

app.use(
  cors({
    origin: "http://localhost:5173", //  Frontend
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "https://crazycar-project.netlify.app", //  Frontend
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: [
//       "Origin",
//       "Content-Type",
//       "Accept",
//       "Authorization",
//       "X-Request-With",
//     ],
//   })
// );
app.use(express.json());
app.use(cookieParser());


const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Please Login" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (user.isadmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user; // Attach user info to request
    next();
  });
};

//check isloggedin
app.get("/auth/check", authenticateToken, (req, res) => {
  res.status(200).json({
    isLoggedIn: true,
    userId: req.user.email,
    userName: req.user.userName,
  });
});

//admin check
app.get("/admin/check", isAdmin, (req, res) => {
  res.status(200).json({ isadmin: "true" });
});

// Signup route
app.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { email: newUser.email, userName: newUser.userName },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during signup" });
  }
});

//logout route
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// POST route to add a new car - ADD CAR
app.post("/cardata", async (req, res) => {
  try {
    const {
      model,
      brand,
      price,
      description,
      image1,
      image2,
      year,
      fuelType,
      mileage,
      transmission,
      engineCapacity,
      seatingCapacity,
      bodyType,
      safetyFeatures,
      bootSpace,
      features,
      warranty,
    } = req.body;


    // Check if the car model already exists in the database
    const existingCar = await Car.findOne({ model });
    if (existingCar) {
      return res.status(400).json({
        message: "Car model already exists. Please enter a different model.",
      });
    }

    // Create a new car document with the form data
    const newCar = new Car({
      model,
      brand,
      price,
      description,
      image: [image1, image2],
      year,
      fuelType,
      mileage,
      transmission,
      engineCapacity,
      seatingCapacity,
      bodyType,
      safetyFeatures: safetyFeatures
        .split(",")
        .map((feature) => feature.trim()), // Convert comma-separated to array
      bootSpace,
      features: features.split(",").map((feature) => feature.trim()), // Convert comma-separated to array
      warranty,
    });

    // Save the new car to the database
    await newCar.save();

    // Respond with a success message
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error while adding car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check model already exists for Addcar
app.get("/checkmodel/:model", async (req, res) => {
  const model = req.params.model;
  try {
    const car = await Car.findOne({ model });
    if (car) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Route to get car data by ID
app.get("/cardata/:id", authenticateToken, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Fetch the user's rating for this car if available
    const userId = req.user.email; // Assuming you're extracting the user ID from the JWT token
    const rating = await Rating.findOne({ carId: req.params.id, userId });

    // Return car details along with user's rating (if any)
    res.json({ car, rating: rating ? rating.rating : 0 }); // Send 0 if no rating found
  } catch (err) {
    console.error("Error fetching car data:", err);
    res.status(500).json({ message: "Error fetching car data" });
  }
});

//  For update fetch car data
app.get("/getcardata/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error fetching car data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/updatecar/:id", async (req, res) => {
  const {
    model,
    brand,
    price,
    year,
    fuelType,
    mileage,
    transmission,
    engineCapacity,
    seatingCapacity,
    bodyType,
    safetyFeatures,
    bootSpace,
    features,
    warranty,
    description,
    image1,
    image2,
  } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        model,
        brand,
        price, // Price is combined as `<value> <unit>`
        year,
        fuelType,
        mileage,
        transmission,
        engineCapacity,
        seatingCapacity,
        bodyType,
        safetyFeatures,
        bootSpace,
        features,
        warranty,
        description,
        image: [image1, image2],
      },
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(updatedCar);
  } catch (error) {
    console.error("Error updating car data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Get data for delete
app.delete("/cardata/:id", async (req, res) => {
  const { id } = req.params; // Extract the car ID from the request parameters

  try {
    const deletedCarData = await Car.findByIdAndDelete(id);
    if (!deletedCarData) {
      return res.status(404).json({ message: "Car data not found" });
    }
    res.status(200).json({ message: "Car data deleted successfully" });
  } catch (error) {
    console.error("Error deleting car data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting car data" });
  }
});

// get user count
app.get("/api/users/count", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch user count" });
  }
});

// car data count
app.get("/api/cars/count", async (req, res) => {
  try {
    const totalCars = await Car.countDocuments({});
    res.json({ totalCars });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch car count" });
  }
});

// get all user
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Get all car data for admin route
app.get("/cardataadmin", async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all car data
    res.json(cars);
  } catch (error) {
    res.status(500).send("Error fetching car data");
  }
});

// Get all car data
app.get("/cardata", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars data" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: user.email, userName: user.userName },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  // res.cookie('token','');
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

//rating system
app.post("/rate", authenticateToken, async (req, res) => {
  const { carId, rating } = req.body;
  const userId = req.user.email; // Extract user ID from token

  try {
    // Check if the user has already rated the car
    let existingRating = await Rating.findOne({ carId, userId });
    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      // Create a new rating
      const newRating = new Rating({ carId, userId, rating });
      await newRating.save();
    }
    res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ message: "Error submitting rating" });
  }
});

//  car Rating Analysis
app.get("/car-rating-analysis", async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars
    const ratings = await Rating.find(); // Fetch all ratings

    // Prepare the data structure for car analysis
    const carRatingData = cars.map((car) => {
      const carRatings = ratings.filter(
        (rating) => rating.carId.toString() === car._id.toString()
      );
      const totalRatings = carRatings.length;
      const averageRating =
        totalRatings > 0
          ? carRatings.reduce((acc, r) => acc + r.rating, 0) / totalRatings
          : 0;
      return {
        carId: car._id,
        brand: car.brand,
        model: car.model,
        totalRatings,
        averageRating,
      };
    });

    // Sort cars by average rating and get the top 3
    const topCars = [...carRatingData]
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3);

    // Calculate the percentage of ratings for each car
    const totalRatingsOverall = ratings.length;
    const carRatingsWithPercentages = carRatingData.map((car) => ({
      ...car,
      ratingPercentage:
        totalRatingsOverall > 0
          ? (car.totalRatings / totalRatingsOverall) * 100
          : 0,
    }));

    res.status(200).json({
      topCars,
      carRatingsWithPercentages,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching car rating analysis", error });
  }
});

// Contact route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(400).json({ error: "Error saving contact" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // console.log(
  //   `Server running on https://crazycar-backend.onrender.com:${port}`
  // );
});
