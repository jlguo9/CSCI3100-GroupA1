const jwt = require('jsonwebtoken');
const JWT_KEY = "secrete";

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY, null);
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(401).json({State:"not_login",Data:""});
    }

}