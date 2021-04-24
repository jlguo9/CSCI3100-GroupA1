const Record = require('../models/record');

// add a new record
exports.record_add = (req,res) =>{
    const record = new Record({
        name: req.body.name,
        price: req.body.price,
        canteen: req.body.canteen,
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
        userID: req.userData.userID   // read user ID from the token
    });
    record.save()
        .then( () => {
            res.status(201).json({"State": "success","Data":""});
        })
        .catch(err => {
            console.log(err);
        });
}

// get all record of this user
exports.record_get = (req,res) =>{
    Record.find({userID: req.userData.userID})
        .then(Data =>{
            res.status(200).json({State: "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}

// delete a certain record of this user
exports.record_delete = (req,res) =>{
    const id = req.params.id;
    Record.find({userID: req.userData.userID, _id: id})
        .then(records =>{
            if(records.length<1){
                // if no such record of this user, respond no_such_record and 400
                res.status(400).json({State: "no_such_record",Data:""});
            }
            else{
                Record.findByIdAndDelete(id)
                    .then( () => {
                        res.status(200).json({State: "success",Data:""});
                    })
                    .catch(err =>{
                        console.log(err);
                    });
            }
        })
}
