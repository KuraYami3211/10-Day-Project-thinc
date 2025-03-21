require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
//const mongoose = require("mongoose");
//const User = require("./models/User");
const authRoutes = require("./routes/auth");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { googleAuthCallback } = require("./controllers/authController");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB")) // success
//   .catch((err) => console.log("Failed to connect to MongoDB", err)); // errors

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({ secret: "supersecret", resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Google OAuth Strategy
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Redirect to Google Login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use(authRoutes);

// Protected Route Example
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Access granted", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});
app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname,"..","frontend","firsthome.html"))
});
//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})