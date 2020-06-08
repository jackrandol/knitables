const express = require("express");
const app = express();
const db = require("../../public/db");

app.get("/wallPosts/:projectId", (req, res) => {
    db.getWallPosts(req.params.projectId).then((response) => {
        res.json(response.rows.reverse());
    });
});

app.post("/wallPost/:projectId/:post", (req, res) => {
    let newWallPostData = {};
    db.getUser(req.session.userId).then((response) => {
        let { first, last, imageurl } = response.rows[0];
        newWallPostData.first = first;
        newWallPostData.last = last;
        newWallPostData.imageurl = imageurl;

        db.newWallPost(
            req.session.userId,
            req.params.post,
            req.params.projectId
        ).then((response) => {
            let {
                id,
                post,
                project_id,
                sender_id,
                created_at,
            } = response.rows[0];
            newWallPostData.id = id;
            newWallPostData.post = post;
            newWallPostData.project_id = project_id;
            newWallPostData.sender_id = sender_id;
            newWallPostData.created_at = created_at;
            res.json(newWallPostData);
        });
    });
});

module.exports = app;
