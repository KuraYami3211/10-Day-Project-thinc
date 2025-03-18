const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function googleAuthCallback(req, res) {
    let user = await User.findOne({ googleId: 1});
    
    const { _json } = req.user; // Google response
    // Check for email
    if (!_json.email || _json.email === null) {
        return res.status(400).json({ message: "Email is required" });
    }

    user = await User.findOne({ googleId: _json.sub });
    if (!user) {
        user = await User.findOne({ email: _json.email });
        if (user) {
            console.log("User with this email already exists in DB");
            return res.status(400).json({ message: "Email already registered" });
        }
        user = new User({ googleId: _json.sub, name: _json.given_name, email: _json.email });
        try {
            console.log(user)
            await user.save();
            console.log("New user saved:", user);
          } catch (err) {
            console.log("Error saving user:", err);
            return res.status(500).json({ message: "Error saving user to the database" });
          }
        console.log("New user saved:", user);
    } else {
        console.log("User already exists:", user);
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({ token, user });
}

module.exports = { googleAuthCallback };