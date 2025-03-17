const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const users = [];

const schemas = Joi.object({
    username: Joi.string()
    .alnum()
    .min(10)
    .max(10)
    .required(),
})

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})


