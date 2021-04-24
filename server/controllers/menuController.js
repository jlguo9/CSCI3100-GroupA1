const Menu = require('../models/menu');

// add a new dish to the menu
exports.menu_add = (req, res) => {
    if(req.userData.type !== "manager"){
        // only canteen managers can perform this action
        res.status(403).json({State: "access_denied", Data: ""});
    }
    else{
        const menu = new Menu(req.body);
        menu.save()
            .then( () => {
                res.status(201).json({"State": "success","Data":""});
            })
            .catch(err => {
                console.log(err);
            });
    }
}
// get information of all dished on the menu
exports.menu_get = (req, res) => {
    Menu.find()
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
// delete a certain dish by its ID
exports.menu_delete = (req, res) => {
    if(req.userData.type !== "manager"){
        // only canteen managers can perform this action
        res.status(403).json({State: "access_denied", Data: ""});
    }
    else{
        const id = req.params.id;
        Menu.findByIdAndDelete(id)
            .then( () => {
                res.status(200).json({"State": "success","Data":""});
            })
            .catch(err =>{
                console.log(err);
            });
    }
}
// update a certain dish by its ID
exports.menu_update = (req, res) => {
    if(req.userData.type !== "manager"){
        // only canteen managers can perform this action
        res.status(403).json({State: "access_denied", Data: ""});
    }
    else{
        const  id = req.params.id;
        Menu.findByIdAndUpdate(id, req.body)
            .then( () => {
                res.status(200).json({"State": "success","Data":""});
            })
            .catch(err =>{
                console.log(err);
            });
    }
}
