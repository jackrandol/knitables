const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./public/db.js");
const { hash, compare } = require("./bc.js");
const cookieSession = require("cookie-session");
const ses = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
//for heroku you can use { origins: 'localhost:8080 mysocialnetworkapp.herokuapp.com:* }

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());

app.use(
    express.urlencoded({
        extendend: false
    })
);

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());

app.use(require("csurf")());

app.use((req, res, next) => {
    res.set("x-frame-option", "deny");
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;
    try {
        const hashedPassword = await hash(password);
        const response = await db.addUser(first, last, email, hashedPassword);

        req.session.userId = response.rows[0].id;
        res.json(response.rows[0]);
    } catch (err) {
        console.log("error in catch post /registration", err);
        res.sendStatus(500);
    }
});

app.post("/login", (req, res) => {
    // console.log(req.body);
    const userPWInput = req.body.password;
    ///get the password from db.js
    db.getPassword(req.body.email)
        .then(results => {
            compare(userPWInput, results.rows[0].password).then(matchValue => {
                // console.log("matchValue of compare:", matchValue);

                if (matchValue == true) {
                    req.session.userId = results.rows[0].id;

                    res.json(results.rows[0]);
                } else {
                    res.sendStatus(500);
                }
            });
        })
        .catch(error => {
            console.log("error in catch post /login:", error);
            res.json(error);
        });
});

app.post("/reset", (req, res) => {
    console.log(req.body);

    const secretCode = cryptoRandomString({
        length: 6
    });
    let subject = "Reset Password for Social Network Now!";
    let text =
        "Dear User,  You have requested to change your password. " +
        secretCode +
        " is your code to change your password. Thanks BYE!!!";

    db.getUserByEmail(req.body.email)
        .then(results => {
            console.log("results from db query by email", results.rows[0].id);
            db.addCodeToTable(secretCode, req.body.email)
                .then(() => {
                    ///send Email to user with the code//
                    ses.sendEmail(req.body.email, subject, text);
                    res.sendStatus(200);
                    ///do i need to res.json something here???
                })
                .catch(error => {
                    console.log("error in catch post /reset:", error);
                    res.sendStatus(500);
                });
        })
        .catch(error => {
            console.log("error in catch post /reset:", error);
            res.sendStatus(500);
        });
});

app.post("/resetPassword", (req, res) => {
    console.log("body from resetPassword post", req.body.code);
    db.getCode(req.body.email).then(response => {

        let lastIndex = response.rows.length - 1;

        if (req.body.code == response.rows[lastIndex].code) {
            hash(req.body.newpassword)
                .then(hashedPassword => {
                    db.updatePassword(hashedPassword, req.body.email);
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(
                        "error updating password although code was good",
                        error
                    );
                });
        } else {
            res.sendStatus(500);
        }
    });
});

app.get("/user", (req, res) => {
    // console.log("req.session.userId from get /user route:", req.session.userId);
    //get the session cookie with the userID
    let userId = req.session.userId;
    db.getUser(userId).then(response => {
        const { id, bio, first, last, imageurl } = response.rows[0];
        // console.log(response.rows[0]);
        res.json({
            id: id,
            first: first,
            last: last,
            image: imageurl || "/default.png",
            bio: bio
        });
    }).catch(error => {
        console.log('error from db of app.get /user', error);
    });
});



app.post("/bio", (req, res) => {
    // console.log("bio text from app.post to /bio", req.body.bioInputField);

    let userId = req.session.userId;
    db.addBio(req.body.bioInputField, userId).then(response => {
        res.json(response);
    });
});

app.post("/uploadBodyImage", uploader.single("file"), s3.upload, (req, res) => {

    let userId = req.session.userId;

    let fileUrl = "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
    db.addSweaterBodyImage(fileUrl, userId)
        .then(function(response) {
            res.json(response.rows);
        })
        .catch(function(error) {
            console.log("error in catch POST /upload:", error);
            return res.sendStatus(500);
        });
});

app.post("/uploadRightSleeve", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req:", req.file);

    let userId = req.session.userId;

    let fileUrl = "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
    db.uploadRightSleeve(fileUrl, userId)
        .then(function(response) {
            // console.log("response promise from addImage query:", response);
            // console.log('res.json of rows:', res.json(response.rows[0]));
            // console.log("response from post /upload right sleeve:", response.rows);
            res.json(response.rows);
        })
        .catch(function(error) {
            console.log("error in catch POST /upload:", error);
            return res.sendStatus(500);
        });
});

app.post("/uploadLeftSleeve", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req:", req.file);

    let userId = req.session.userId;

    let fileUrl = "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
    db.uploadLeftSleeve(fileUrl, userId)
        .then(function(response) {
            // console.log("response promise from addImage query:", response);
            // console.log('res.json of rows:', res.json(response.rows[0]));
            // console.log("response from post /upload right sleeve:", response.rows);
            res.json(response.rows);
        })
        .catch(function(error) {
            console.log("error in catch POST /upload:", error);
            return res.sendStatus(500);
        });
});

app.post(`/saveRibColor/:color`, (req, res) => {
    let userId = req.session.userId;
    console.log('color from index', req.params.color);
    db.saveRibColor(req.params.color, userId).then(response => {
        console.log('db rib color', response.rows);
        res.json(response.rows);
    }).catch(function(error) {
        console.log("error in catch POST /upload:", error);
        return res.sendStatus(500);
    });
});

app.post("/uploadImage", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req:", req.file);

    let userId = req.session.userId;

    let fileUrl = "https://s3.amazonaws.com/littlegremlin/" + req.file.filename;
    db.addImage(fileUrl, userId)
        .then(function(response) {
            // console.log("response promise from addImage query:", response);
            // console.log('res.json of rows:', res.json(response.rows[0]));
            // console.log("response from post /uploadimage:", response.rows);
            res.json(response.rows);
        })
        .catch(function(error) {
            console.log("error in catch POST", error);
            return res.sendStatus(500);
        });
});

app.get(`/sweater`, (req, res) => {
    let userId = req.session.userId;
    db.getSweater(userId).then(response => {
        res.json(response.rows[0]);
    }).catch(error => {
        console.log('error getting image urls', error);
        return res.sendStatus(500);
    });
});

app.get(`/getCurrentProject/:projectId`, (req, res) => {
    console.log('made it to index.js get current');
    db.getCurrentProject(req.params.projectId).then(response => {
        console.log(response.rows);
        res.json(response.rows);
    });
});

app.get('/api/projects', (req, res) => {
    db.getAllProjects().then(response => {
        // console.log('projects response from db', response.rows);
        res.json(response.rows);
    });
});

app.get("/logOut", (req, res) => {
    req.session.userId = null;
    console.log("user logged out");
    res.sendStatus(200);
});

app.get("/wallPosts/:projectId", (req, res) => {

    db.getWallPosts(req.params.projectId).then(response => {
        console.log("response of wall posts:", response.rows);
        res.json(response.rows.reverse());
    });
});


app.post("/wallPost/:projectId/:post", (req, res) => {
    console.log("req.params from wall post", req.params);

    let newWallPostData = {};
    db.getUser(req.session.userId).then(response => {
        let { first, last, imageurl } = response.rows[0];
        //add data from user to newWallPostData object
        newWallPostData.first = first;
        newWallPostData.last = last;
        newWallPostData.imageurl = imageurl;

        db.newWallPost(
            req.session.userId,
            req.params.post,
            req.params.projectId
        ).then(response => {
            let {
                id,
                post,
                project_id,
                sender_id,
                created_at
            } = response.rows[0];
            //add data about message to the object
            newWallPostData.id = id;
            newWallPostData.post = post;
            newWallPostData.project_id = project_id;
            newWallPostData.sender_id = sender_id;
            newWallPostData.created_at = created_at;
            console.log("newWallPostData", newWallPostData);
            res.json(newWallPostData);
        });
    });
});
//// DONT DELETE OR COMMENT THIS OUT!!!! /////
// app.get('api/*') this could

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
        //check that they're not logged in
    }
});
///// DONT TOUCH THIS!!!! ////

server.listen(8080, function() {
    console.log("I'm listening.");
});
