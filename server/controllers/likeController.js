/*
MODULE NAME: LIKE
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.2 (15 APRIL 2021)
IS_COMPOSED_OF: LIKE_IT, CANCEL_LIKE, LIKE_MODEL
PURPOSE: Achieve like and cancel like functions
 */
const Like = require('../models/like');
const Content =  require('../models/content');
// MODEL NAME: LIKE_IT
// API for liking a certain post. It firstly determine whether the user has liked it already
// if not, save the post-user relation and add 1 to "likeNum" of the post in "content" collection
exports.like_it = (req, res) => {
    const like = new Like({
        contentID: req.body.contentID,
        userID: req.userData.userID
    })
    Like.find({ contentID: req.body.contentID, userID: req.userData.userID })
        .then(list => {
            if (list.length >= 1) {
                // if the user has already liked it, reject and respond 401
                return res.status(401).json({ State: "like_exist", Data: "" });
            }
            else {
                // if the user has not liked it, save the post-user like relation
                like.save()
                    .then(() => {
                        // add 1 to likeNum of the post
                        Content.findById(req.body.contentID, "likeNum")
                            .then(result => {
                                Content.findByIdAndUpdate(req.body.contentID, {likeNum: result.likeNum+1})
                                    .catch(err => {console.log(err)})
                            }).catch(err => {console.log(err)})
                        res.status(201).json({ State: "success", Data: "" });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
// MODEL NAME: CANCEL_LIKE
// API for cancelling liking a certain post. It firstly determine whether the user has liked it already
// if so, delete the post-user relation and decrease "likeNum" of the post in "content" collection by 1
exports.cancel_like = (req, res) => {
    Like.find({ contentID: req.params.id, userID: req.userData.userID })
        .then(list => {
            if (list.length < 1) {
                // if the user has not liked it yet, reject and respond 401
                return res.status(401).json({ State: "like_not_exist", Data: "" });
            }
            else {
                // if the user has liked it, delete the post-user like relation
                Like.findOneAndDelete({ contentID: req.params.id, userID: req.userData.userID })
                    .then(() => {
                        // decrease likeNum of the post by 1
                        Content.findById(req.params.id, "likeNum")
                            .then(result => {
                                Content.findByIdAndUpdate(req.params.id, {likeNum: result.likeNum-1})
                                    .catch(err => {console.log(err)})
                            }).catch(err => {console.log(err)})
                        res.status(201).json({ State: "success", Data: "" });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
