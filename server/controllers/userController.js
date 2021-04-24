const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_KEY = "secrete";
exports.register = (req,res) => {
    if(req.body.name === ""){
        // if name is empty, reject
        return res.status(500).json({"State": "name_null", "Data": ""});
    }
    else if(req.body.password === "") {
        // if password is empty, reject
        return res.status(500).json({"State": "password_null", "Data": ""});
    }
   else{
       //check whether username exists
       User.find({name: req.body.name})
            .exec()
            .then(users =>{
                if(users.length>=1){
                     res.status(409).json({Status:"username_exist",Data:""});
                }
                else{
                    // encrypt the password
                    bcrypt.hash(req.body.password, 10, (err, hash)=>{
                        if(err){
                            return res.status(500).json({State:"bad_req",Data:""});
                        }
                        else {
                            const user = new User({
                                name: req.body.name,
                                password: hash      // only store the hash in database
                            })
                            user.save()
                                .then( () => {
                                    res.status(201).json({State: "success",Data:""});
                                })
                                .catch(err =>{
                                    console.log(err)
                                    res.status(500).json({State: "bad_req",Data:err})
                                })
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

// API for user login
exports.login = (req,res) => {
    User.find({name: req.query.name})
        .exec()
        .then(users => {
            if(users.length<1){
                // no such user
                return res.status(401).json({State:"auth_failed",Data:""});
            }
            else{
                // compare the password with password in database
                bcrypt.compare(req.query.password,users[0].password,(err,result)=>{
                    if(err){
                        return res.status(500).json({State:"auth_failed",Data:""});
                    }
                    else if(result){
                        // name-password matched. Sign a token
                        const token = jwt.sign({
                            userID: users[0]._id,
                            name: users[0].name,
                            type: users[0].type
                        },JWT_KEY,
                        {
                            expiresIn: "1h"     // expire in 1 hour
                        });
                        return res.status(200).json({State:"success",Data: token});
                    }
                    else{
                        // not match
                        return res.status(500).json({State:"auth_failed",Data:""});
                    }
                })
            }
        })
        .catch(err =>{
            console.log(err);
        })
}

// log out API. Not used by frontend.
exports.logout = (req,res) => {
    res.status(200).json({State:"success",Data:""});
}

// get the information (id, name, type, canteen) of a certain user by its ID
// may return more attributes in the future when profile function get further developed
exports.get_info = (req,res) => {
    const id = req.params.id;
    User.findById(id,"_id name type canteen")
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
