const Content = require('../models/content');

exports.content_get_all = (req,res) => {
    const page = req.query.page;
    const per_page = req.query.per_page;
    const start_index = (page - 1) * per_page;
    const end_index = page * per_page;
    Content.find()
        .then(result => {
            var Data = result.slice(start_index, end_index);
            res.json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
exports.content_get= (req,res) =>{
    const id = req.params.id;
    Content.findById(id)
        .then(Data =>{
            res.json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
exports.content_delete= (req,res) =>{
    const id = req.params.id;
    Content.findByIdAndDelete(id)
        .then( () => {
            res.json({"State": "success","Data":""});
        })
        .catch(err =>{
            console.log(err);
        });
}
exports.content_update= (req,res) =>{
    const  id = req.params.id;
    Content.findByIdAndUpdate(id, req.body)
        .then( () => {
            res.json({"State": "success","Data":""});
        })
        .catch(err =>{
            console.log(err);
        });
}
exports.content_publish= (req,res) =>{
    const content = new Content(req.body);
    content.save()
        .then( () => {
            res.json({"State": "success","Data":""});
        })
        .catch(err => {
            console.log(err);
        });
}