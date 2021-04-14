const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_KEY = "secrete";
exports.register = (req,res) => {
    if(req.body.name === ""){
        return res.status(500).json({"State": "name_null", "Data": ""});
    }
    /*else if(req.body.email === "") {
        return res.status(500).json({"State": "email_null", "Data": ""});
    }*/
    else if(req.body.password === "") {
        return res.status(500).json({"State": "password_null", "Data": ""});
    }
   else{
       //check whether username exists
       User.find({name: req.body.name})
            .exec()
            .then(users =>{
                if(users.length>=1){
                    return res.status(409).json({Status:"username_exist",Data:""});
                }
                else{
                    bcrypt.hash(req.body.password, 10, (err, hash)=>{
                        if(err){
                            return res.status(500).json({State:"bad_req",Data:""});
                        }
                        else {
                            const user = new User({
                                name: req.body.name,
                                password: hash
                            })
                            user.save()
                                .then( () => {
                                    res.status(201).json({State: "success",Data:""});
                                })
                                .catch(err =>{
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

exports.login = (req,res) => {
    User.find({name: req.body.name})
        .exec()
        .then(users => {
            if(users.length<1){
                return res.status(401).json({State:"auth_failed",Data:""});
            }
            else{
                bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
                    if(err){
                        return res.status(500).json({State:"auth_failed",Data:""});
                    }
                    else if(result){
                        const token = jwt.sign({
                            userID: users[0]._id,
                            name: users[0].name,
                            type: users[0].type
                        },JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                        return res.status(200).json({State:"success",Data: token});
                    }
                    else{
                        return res.status(500).json({State:"auth_failed",Data:""});
                    }
                })
            }
        })
        .catch(err =>{
            console.log(err);
        })
}
exports.logout = (req,res) => {
    res.status(200).json({State:"success",Data:""});
}
//abandoned
/*exports.change_password = (req,res) => {

}*/
exports.get_info = (req,res) => {
    const id = req.params.id;
    User.findById(id,"_id name email type canteen")
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
