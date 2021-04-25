/*
MODULE NAME: MENU
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.4 (13 APRIL 2021)
IS_COMPOSED_OF: MENU_ADD, MENU_GET, MENU_DELETE, MENU_UPDATE, MENU_MODEL
PURPOSE: Achieve add dish, delete dish, get information of all dishes, and update certain dish functions
 */
const Menu = require('../models/menu');

/*
MODULE TO ADD A NEW DISH TO THE MENU
MODULE NAME: MENU_ADD
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.post("/menu/add", check_auth,menuController.menu_add);
INPUT PARAMETERS:
    req
OUTCOME: Add a new item to "menus" collection in MongoDB
 */
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
/*
MODULE TO GET INFORMATION OF ALL DISHES ON THE MENU
MODULE NAME: MENU_GET
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/menu/index", menuController.menu_get);
OUTPUT PARAMETERS:
    State, Data
 */
exports.menu_get = (req, res) => {
    Menu.find()
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
/*
MODULE TO DELETE A CERTAIN DISH BY ITS ID
MODULE NAME: MENU_DELETE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.delete("/menu/:id", check_auth,menuController.menu_delete);
INPUT PARAMETERS:
    id
OUTCOME: Delete the item with inputted id in "menus" collection
 */
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
/*
MODULE TO UPDATE A CERTAIN DISH BY ITS ID
MODULE NAME: MENU_UPDATE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.put("/menu/:id", check_auth,menuController.menu_update);
INPUT PARAMETERS:
    id, req
OUTCOME: Update the item with inputted id in "menu" collection
 */
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
