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

app.use(compression());

app.use(
    express.urlencoded({
        extendend: false
    })
);

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());

app.use(cookieSessionMiddleware);

app.use(require("csurf")());

app.use((req, res, next) => {
    res.set("x-frame-option", "deny");
    res.cookie("mytoken", req.csrfToken());
    next();
});


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

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

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
