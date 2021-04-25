/*
MODULE NAME: MENU
PROGRAMMER: GUO Jialiang 1155124399 & LI Zechen 1155124542
VERSION: 1.3 (12 APRIL 2021)
IS_COMPOSED_OF: RECORD_ADD, RECORD_GET, RECORD_DELETE, RECORD_MODEL
PURPOSE: Achieve add record, delete record, and get information of all records functions
 */
const Record = require('../models/record');
/*
MODULE TO ADD A NEW RECORD
MODULE NAME: RECORD_ADD
PROGRAMMER: LI Zechen 1155124542
VERSION: 1.0 (12 APRIL 2021)
PROCEDURE INVOCATION:
    router.post("/record/add", check_auth,recordController.record_add);
INPUT PARAMETERS:
    req
OUTCOME: Add a new item to "records" collection in MongoDB
 */
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
/*
MODULE TO GET ALL RECORD OF A CERTAIN USER
MODULE NAME: RECORD_GET
PROGRAMMER: LI Zechen 1155124542
VERSION: 1.0 (12 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/record/index", check_auth,recordController.record_get);
OUTPUT PARAMETERS:
    State, Data
 */
exports.record_get = (req,res) =>{
    Record.find({userID: req.userData.userID})
        .then(Data =>{
            res.status(200).json({State: "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}
/*
MODULE TO DELETE A CERTAIN RECORD OF A CERTAIN USER
MODULE NAME: RECORD_DELETE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (12 APRIL 2021)
PROCEDURE INVOCATION:
    router.delete("/record/:id",check_auth,recordController.record_delete);
INPUT PARAMETERS:
    id
OUTCOME: Delete the item with inputted id in "records" collection
 */
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
