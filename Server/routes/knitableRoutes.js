const express = require("express");
const app = express();
const db = require("../../public/db");
const s3 = require("../../s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.get("/user", (req, res) => {
    let userId = req.session.userId;
    db.getUser(userId)
        .then((response) => {
            const { id, bio, first, last, imageurl } = response.rows[0];
            res.json({
                id: id,
                first: first,
                last: last,
                image: imageurl || "/default.png",
                bio: bio,
            });
        })
        .catch((error) => {
            console.log("error from db of app.get /user", error);
        });
});

app.post("/bio", (req, res) => {
    let userId = req.session.userId;
    db.addBio(req.body.bioInputField, userId).then((response) => {
        res.json(response);
    });
});

app.post("/uploadBodyImage", uploader.single("file"), s3.upload, (req, res) => {
    let userId = req.session.userId;
    let fileUrl = "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
    console.log("req.file", req.file);
    db.addSweaterBodyImage(fileUrl, userId)
        .then(function (response) {
            res.json(response.rows);
        })
        .catch(function (error) {
            console.log("error in catch POST /upload:", error);
            return res.sendStatus(500);
        });
});

app.post(
    "/uploadRightSleeve",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        let userId = req.session.userId;
        let fileUrl =
            "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
        db.uploadRightSleeve(fileUrl, userId)
            .then(function (response) {
                res.json(response.rows);
            })
            .catch(function (error) {
                console.log("error in catch POST /upload:", error);
                return res.sendStatus(500);
            });
    }
);

app.post(
    "/uploadLeftSleeve",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        let userId = req.session.userId;
        let fileUrl =
            "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
        db.uploadLeftSleeve(fileUrl, userId)
            .then(function (response) {
                res.json(response.rows);
            })
            .catch(function (error) {
                console.log("error in catch POST /upload:", error);
                return res.sendStatus(500);
            });
    }
);

app.post(`/saveRibColor/:color`, (req, res) => {
    let userId = req.session.userId;
    db.saveRibColor(req.params.color, userId)
        .then((response) => {
            res.json(response.rows);
        })
        .catch(function () {
            return res.sendStatus(500);
        });
});

app.post("/uploadImage", uploader.single("file"), s3.upload, (req, res) => {
    let userId = req.session.userId;

    let fileUrl = "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
    db.addImage(fileUrl, userId)
        .then(function (response) {
            res.json(response.rows);
        })
        .catch(function (error) {
            console.log("error in catch POST", error);
            return res.sendStatus(500);
        });
});

app.get(`/sweater`, (req, res) => {
    let userId = req.session.userId;
    db.getSweater(userId)
        .then((response) => {
            res.json(response.rows[0]);
        })
        .catch((error) => {
            console.log("error getting image urls", error);
            return res.sendStatus(500);
        });
});

app.get(`/getCurrentProject/:projectId`, (req, res) => {
    db.getCurrentProject(req.params.projectId).then((response) => {
        res.json(response.rows);
    });
});

app.get("/api/projects", (req, res) => {
    db.getAllProjects().then((response) => {
        res.json(response.rows);
    });
});

module.exports = app;
