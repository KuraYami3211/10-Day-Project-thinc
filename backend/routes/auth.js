const express = require('express');
const { googleAuthCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/auth/google', googleAuthCallback);

module.exports = router;

