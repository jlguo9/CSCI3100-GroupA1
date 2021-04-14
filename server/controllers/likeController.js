const Like = require('../models/like');
const Content =  require('../models/content');
exports.like_it = (req, res) => {
    const like = new Like({
        contentID: req.body.contentID,
        userID: req.userData.userID
    })
    Like.find({ contentID: req.body.contentID, userID: req.userData.userID })
        .then(list => {
            if (list.length >= 1) {
                return res.status(401).json({ State: "like_exist", Data: "" });
            }
            else {
                like.save()
                    .then(() => {
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
exports.cancel_like = (req, res) => {
    Like.find({ contentID: req.params.id, userID: req.userData.userID })
        .then(list => {
            if (list.length >= 1) {
                return res.status(401).json({ State: "like_not_exist", Data: "" });
            }
            else {
                Like.findOneAndDelete({ contentID: req.params.id, userID: req.userData.userID })
                    .then(() => {
                        Content.findById(req.body.contentID, "likeNum")
                            .then(result => {
                                Content.findByIdAndUpdate(req.body.contentID, {likeNum: result.likeNum-1})
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
