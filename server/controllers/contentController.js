const Content = require('../models/content');

exports.content_get_all = (req,res) => {
    /*const page = req.query.page;
    const per_page = req.query.per_page;
    const start_index = (page - 1) * per_page;
    const end_index = page * per_page;*/
    Content.find()
        .then(Data => {
            //var Data = result.slice(start_index, end_index);
            res.status(200).json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}
/*exports.content_get= (req,res) =>{
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
    if(req.userData.userID !== id){
        res.status(401).json({State: "user_content_id_not_matching",Data:""});
    }else {
        Content.findByIdAndDelete(id)
            .then(() => {
                res.json({State: "success", Data: ""});
            })
            .catch(err => {
                console.log(err);
            });
    }
}*/
exports.content_update= (req,res) =>{
    const  id = req.params.id;
    if(req.userData.userID !== id){
        res.status(401).json({State: "user_content_id_not_matching",Data:""});
    }else{
        Content.findByIdAndUpdate(id, req.body)
            .then( () => {
                res.status(200).json({State: "success",Data:""});
            })
            .catch(err =>{
                console.log(err);
            });
    }

}
exports.content_publish= (req,res) =>{
    const content = new Content({
        detail: req.body.detail,
        ownID: req.userData.userID,
        userName: req.userData.name,
        canteen: req.body.canteen,
        dish: req.body.dish,
        rating: req.body.rating
    });
    content.save()
        .then( () => {
            res.status(201).json({State: "success",Data:""});
        })
        .catch(err => {
            console.log(err);
        });
}
