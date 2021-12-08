const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(user_id,roles){
    const payload = {
        user:user_id,
        role:roles
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn:"1hr"})
}

module.exports = jwtGenerator