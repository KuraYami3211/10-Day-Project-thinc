const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const usersFilePath = path.join(__dirname, '../data/users.json');

function readUsers() {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath, 'utf8');
    if (!data) {
        console.error('users.json is empty or not readable');
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (err) {
        console.error('Error parsing JSON data:', err);
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

async function googleAuthCallback(req, res) {
    const { _json } = req.user; // Google response

    // Check for email
    if (!_json.email || _json.email === null) {
        return res.status(400).json({ message: "Email is required" });
    }

    let users = readUsers();// Read users from memory

    user = await users.find(u => u.googleId === _json.sub);
    if (!user) {
        user = await users.find(u => u.email === _json.email);
        if (user) {
            console.log("User with this email already exists in memory");
            return res.status(400).json({ message: "Email already registered" });
        }
        user = { googleId: _json.sub, name: _json.given_name, email: _json.email };
        users.push(user);
        saveUsers(users);
        console.log("New user saved to memory:", user);
    } else {
        console.log("User already exists in memory:", user);
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