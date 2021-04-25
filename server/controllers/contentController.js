/*
MODULE NAME: CONTENT
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.6 (15 APRIL 2021)
IS_COMPOSED_OF: CONTENT_GET_ALL, CONTENT_UPDATE, CONTENT_PUBLISH, CONTENT_MODEL
PURPOSE: Achieve publish new content, get information of all contents, and update certain content functions
 */
const Content = require('../models/content');
/*
MODULE TO GET ALL POSTS
MODULE NAME: CONTENT_GET_ALL
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.2 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/content/index",contentController.content_get_all);
OUTPUT PARAMETERS:
    State, Data
 */
exports.content_get_all = (req,res) => {
    // the following lines can be used if in the future it requires pagination
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

// this can be a API for the frontend to get detailed information of a
// particular post by passing its ID. Currently not used.
/*
exports.content_get= (req,res) =>{
    const id = req.params.id;
    Content.findById(id)
        .then(Data =>{
            res.json({"State": "success", Data});
        })
        .catch(err => {
            console.log(err);
        });
}*/

// this can be a API to delete a certain post by its ID.
// Currently not used.
/*
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
/*
MODULE TO UPDATE A POST
MODULE NAME: CONTENT_UPDATE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.1 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.put("/content/:id",check_auth,contentController.content_update);
INPUT PARAMETERS:
    id, req
OUTCOME: Update the item with inputted id in "contents" collection
 */
exports.content_update= (req,res) =>{
    const  id = req.params.id;
    if(req.userData.userID !== id){
        // id the post is not posted by this user, reject
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
/*
MODULE TO PUBLISH A NEW POST
MODULE NAME: CONTENT_PUBLISH
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.2 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.post("/content/publish",check_auth,contentController.content_publish);
INPUT PARAMETERS:
    req
OUTCOME: Add a new item to "contents" collection in MongoDB
 */
exports.content_publish= (req,res) =>{
    const content = new Content({
        detail: req.body.detail,
        ownID: req.userData.userID,   //read userID from token
        userName: req.userData.name,  //read user name from token
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
