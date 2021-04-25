/*
MODULE NAME: USER
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.6 (15 APRIL 2021)
IS_COMPOSED_OF: REGISTER, LOGIN, LOGOUT, GET_INFO, USER_MODEL
PURPOSE: Achieve user registration, log in, log out, get user information functions
 */
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_KEY = "secrete";
/*
MODULE TO REGISTER FOR AN ACCOUNT
MODULE NAME: REGISTER
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.1 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.post("/user/register",userController.register);
INPUT PARAMETERS
    json containing username and password
Algorithm:
    Check whether user name is NULL
    Check whether password is NULL
    Check whether user name exists already
    Encrypt the password
    Save the user name and hashed password into database
 */
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
                            let user = new User({
                                name: req.body.name,
                                password: hash,      // only store the hash in database
                            })
                            console.log(req.file)
                            if(req.file !== undefined){
                                user = new User({
                                    name: req.body.name,
                                    password: hash,      // only store the hash in database
                                    avatar: req.file.path
                                })
                            }
                            // else{

                            // }
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
/*
MODULE TO USER LOGIN
MODULE NAME: LOGIN
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.3 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/user/login",userController.login);
INPUT PARAMETERS
    username and password
Algorithm:
    Check whether user exists
    Check whether username and password matches
    Sign a token
OUTPUT PARAMETERS
    State, Token
 */
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
                            type: users[0].type,
                            avatar: users[0].avatar
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
// MODULE NAME: LOGOUT
// log out API. Not used by frontend.
exports.logout = (req,res) => {
    res.status(200).json({State:"success",Data:""});
}
/*
MODULE TO GET THE INFORMATION (ID, NAME, TYPE, CANTEEN, AVATAR) OF A CERTAIN USER BY ITS ID
MODULE NAME: GET_INFO
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.2 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/user/info/:id",userController.get_info);
INPUT PARAMETERS
    id
OUTPUT PARAMETERS
    State, Data
 */
// may return more attributes in the future when profile function get further developed
exports.get_info = (req,res) => {
    const id = req.params.id;
    User.findById(id,"_id name type canteen avatar")
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
