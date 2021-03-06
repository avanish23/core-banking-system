const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req,res,next) => {
    try {
        const jwtToken = req.header("jwt_token");
         
         
        
        if(!jwtToken){
            return res.status(403).json({msg:"Not Authorized"});
        }
        const payload = jwt.verify(jwtToken,process.env.jwtSecret);

        req.user = payload.user;
        req.role = payload.role;
        next();
    } catch (err) {
        console.log(err.message)
        return res.status(200).json({msg:"Token Invalid"});
    }
}