const Like = require('../models/like');

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
                        return res.status(200).json({ State: "success", Data: "" });
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
