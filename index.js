const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const server = require("http").Server(app);
const authRoutes = require("./Server/routes/authRoutes");
const knitableRoutes = require("./Server/routes/knitableRoutes");
const wallPostRoutes = require("./Server/routes/wallPostRoutes");

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
app.use(compression());
app.use(
    express.urlencoded({
        extendend: false,
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
            target: "http://localhost:8081/",
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

app.use(authRoutes);
app.use(knitableRoutes);
app.use(wallPostRoutes);

//// DONT DELETE OR COMMENT THIS OUT!!!! /////
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});
