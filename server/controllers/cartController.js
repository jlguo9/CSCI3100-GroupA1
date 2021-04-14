const Cart = require('../models/cart');

exports.cart_add = (req,res) =>{
    const cart = new Cart(req.body);
    cart.save()
        .then( () => {
            res.status(201).json({"State": "success","Data":""});
        })
        .catch(err => {
            console.log(err);
        });
}

exports.cart_get = (req,res) =>{
    Cart.find()
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}

exports.cart_delete = (req,res) =>{
    const id = req.params.id;
    Cart.findByIdAndDelete(id)
        .then( () => {
            res.status(200).json({State: "success",Data:""});
        })
        .catch(err =>{
            console.log(err);
        });
}
exports.cart_update = (req, res) => {
    const id = req.params.id;
    Cart.findByIdAndUpdate(id, req.body)
        .then( () => {
            res.status(200).json({"State": "success","Data":""});
        })
        .catch(err =>{
            console.log(err);
        });
}
