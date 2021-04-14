const Cart = require('../models/cart');

exports.cart_add = (req,res) =>{
    const cart = new Cart({
        userID: req.userData.userID,
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

exports.cart_get = (req,res) =>{
    Cart.find({userID: req.userData.userID})
        .then(Data =>{
            res.status(200).json({State: "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}

exports.cart_delete = (req,res) =>{
    const id = req.params.id;
    Cart.find({userID: req.userData.userID, _id: id})
        .then(carts =>{
            if(carts.length<1){
                res.status(400).json({State: "no_such_item",Data:""});
            }
            else{
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
exports.cart_update = (req, res) => {
    const id = req.params.id;
    Cart.find({userID: req.userData.userID, _id: id})
        .then(carts =>{
            if(carts.length<1){
                res.status(400).json({State: "no_such_item",Data:""});
            }
            else{
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
