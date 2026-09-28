require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const joinRoutes = require("./routes/joinRoutes");

const sponsorRoutes = require("./routes/sponsorRoutes");
const blogRoutes = require("./routes/blogRoutes");
const teamRoutes = require("./routes/teamRoutes");

const speakerRoutes = require("./routes/speakerRoutes");
const galleryRoutes = require("./routes/galleryRoutes");



// 🔥 Global Limiter: Har IP se 15 minute me max 200 requests (normal browsing ke liye perfect)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: "Too many requests from this IP, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});




// Baaki routes jaise eventRoutes, teamRoutes baad me judenge

const app = express();

// Middlewares

app.use(globalLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/join", joinRoutes);


app.use("/api/sponsors", sponsorRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/team", teamRoutes);

app.use("/api/speakers", speakerRoutes);
app.use("/api/gallery", galleryRoutes);

// Connect Database
connectDB();

// API Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("E-Cell API Server is running smoothly 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});