const Menu = require('../models/menu');

exports.menu_add = (req, res) => {
    const menu = new Menu(req.body);
    menu.save()
        .then( () => {
            res.json({"State": "success","Data":""});
        })
        .catch(err => {
            console.log(err);
        });
}
exports.menu_get = (req, res) => {
    Menu.find()
        .then(Data =>{
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
exports.menu_delete = (req, res) => {
    const id = req.params.id;
    Menu.findByIdAndDelete(id)
        .then( () => {
            res.status(200).json({"State": "success","Data":""});
        })
        .catch(err =>{
            console.log(err);
        });
}
exports.menu_update = (req, res) => {
    const  id = req.params.id;
    Menu.findByIdAndUpdate(id, req.body)
        .then( () => {
            res.json({"State": "success","Data":""});
        })
        .catch(err =>{
            console.log(err);
        });
}
