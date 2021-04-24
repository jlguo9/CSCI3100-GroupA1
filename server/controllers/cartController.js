const Cart = require('../models/cart');

//add a new item into cart
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

// get information of all items in current cart of current user
exports.cart_get = (req,res) =>{
    Cart.find({userID: req.userData.userID})
        .then(Data =>{
            res.status(200).json({State: "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}

// delete an item
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
// update (normally the quantity) an item
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
