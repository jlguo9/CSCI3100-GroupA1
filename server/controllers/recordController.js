const Record = require('../models/record');

exports.record_add = (req,res) =>{
    const record = new Record(req.body);
    record.save()
        .then( () => {
            res.status(201).json({"State": "success","Data":""});
        })
        .catch(err => {
            console.log(err);
        });
}

exports.record_get = (req,res) =>{
    Record.find()
        .then(Data =>{
            res.status(200).json({State: "success", Data});
        })
        .catch(err => {
            console.log(err);
        })
}

exports.record_delete = (req,res) =>{
    const id = req.params.id;
    Record.findByIdAndDelete(id)
        .then( () => {
            res.status(200).json({State: "success",Data:""});
        })
        .catch(err =>{
            console.log(err);
        });
}
