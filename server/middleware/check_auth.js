const jwt = require('jsonwebtoken');
const JWT_KEY = "secrete";
// This middleware is to verify and analyze the token submitted by browser
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY, null);
        req.userData = decoded; //userData is decoded token containing userID, username and type
        next();
    }catch(err){
        //if no token or wrong token, regard it as not_login
        return res.status(401).json({State:"not_login",Data:""});
    }

}
