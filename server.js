const express = require("express");
const connectDB = require("./server/config/dbConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const authRoutes = require("./server/routes/authRoutes");
const uploadRoutes = require("./server/routes/uploadRoutes");
const updateRoutes = require("./server/routes/updateRoutes");
const deleteRoutes = require("./server/routes/deleteRoutes");
const userDataRoutes = require("./server/routes/userDataRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://taskify.taniyakamboj.info"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Apply rate limiting middleware to all requests
app.use("/", limiter);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/delete", deleteRoutes);
app.use("/api/get", userDataRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/update", updateRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});
// 404 Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
