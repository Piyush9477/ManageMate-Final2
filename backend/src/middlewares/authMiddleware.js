const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Access denied. No token provided"});
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(500).json({ message: "Server Error", err });
    }
}

module.exports = {authMiddleware};