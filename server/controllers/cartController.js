/*
MODULE NAME: CART
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.4 (12 APRIL 2021)
IS_COMPOSED_OF: CART_ADD, CART_GET, CART_DELETE, CART_UPDATE, CART_MODEL
PURPOSE: Achieve add to shopping cart, delete item, get information of all items, and update certain item functions
 */
const Cart = require('../models/cart');
/*
MODULE TO ADD A NEW ITEM INTO CART
MODULE NAME: CART_ADD
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.post("/cart/add", check_auth,cartController.cart_add);
INPUT PARAMETERS:
    req.body, req.userData
OUTCOME: Add a new item to "carts" collection in MongoDB
 */
exports.cart_add = (req,res) =>{
    const cart = new Cart({
        userID: req.userData.userID, //read userID from token
        dishID: req.body.dishID,
        name: req.body.name,
        price: req.body.price,
        canteen: req.body.canteen,
        quantity: req.body.quantity
    });
    cart.save()
        .then( () => {
            res.status(201).json({"State": "success","Data":""});
        })
        .catch(err => {
            console.log(err);
        });
}
/*
MODULE TO GET INFORMATION OF ALL ITEMS IN CURRENT CART OF CURRENT USER
MODULE NAME: CART_GET
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/cart/index", check_auth,cartController.cart_get);
OUTPUT PARAMETERS:
    State, Data
 */
exports.cart_get = (req,res) =>{
    Cart.find({userID: req.userData.userID})
        .then(Data =>{
            res.status(200).json({State: "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}
/*
MODULE TO DELETE A CERTAIN ITEM BY ITS ID
MODULE NAME: CART_DELETE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.delete("/cart/:id",check_auth,cartController.cart_delete);
INPUT PARAMETERS:
    id
OUTCOME: Delete the item with inputted id in "carts" collection
 */
exports.cart_delete = (req,res) =>{
    const id = req.params.id;
    Cart.find({userID: req.userData.userID, _id: id})
        .then(carts =>{
            if(carts.length<1){
                // if no such item exists in this user's cart, return 400 and no_such_item
                res.status(400).json({State: "no_such_item",Data:""});
            }
            else{
                // if item exists, delete it
                Cart.findByIdAndDelete(id)
                    .then( () => {
                        res.status(200).json({State: "success",Data:""});
                    })
                    .catch(err =>{
                        console.log(err);
                    });
            }
        })
}
/*
MODULE TO UPDATE (NORMALLY THE QUANTITY) AN ITEM
MODULE NAME: CART_UPDATE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
PROCEDURE INVOCATION:
    router.put("/cart/:id",check_auth,cartController.cart_update);
INPUT PARAMETERS:
    id, req
OUTCOME: Update the item with inputted id in "carts" collection
 */
exports.cart_update = (req, res) => {
    const id = req.params.id;
    Cart.find({userID: req.userData.userID, _id: id})
        .then(carts =>{
            if(carts.length<1){
                // if no such item exists in this user's cart, return 400 and no_such_item
                res.status(400).json({State: "no_such_item",Data:""});
            }
            else{
                // if item exists, update its attributes
                Cart.findByIdAndUpdate(id, req.body)
                    .then( () => {
                        res.status(200).json({"State": "success","Data":""});
                    })
                    .catch(err =>{
                        console.log(err);
                    });
            }
        })
}
