const express = require("express");
const app = express();
const db = require("../../public/db");
const { hash, compare } = require("../../bc.js");
const ses = require("../../ses");
const cryptoRandomString = require("crypto-random-string");

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
    const userPWInput = req.body.password;
    db.getPassword(req.body.email)
        .then((results) => {
            compare(userPWInput, results.rows[0].password).then(
                (matchValue) => {
                    if (matchValue == true) {
                        req.session.userId = results.rows[0].id;

                        res.json(results.rows[0]);
                    } else {
                        res.sendStatus(500);
                    }
                }
            );
        })
        .catch((error) => {
            console.log("error in catch post /login:", error);
            res.json(error);
        });
});

app.post("/reset", (req, res) => {
    const secretCode = cryptoRandomString({
        length: 6,
    });
    let subject = "Reset Password for Social Network Now!";
    let text =
        "Dear User,  You have requested to change your password. " +
        secretCode +
        " is your code to change your password. Thanks BYE!!!";

    db.getUserByEmail(req.body.email)
        .then(() => {
            db.addCodeToTable(secretCode, req.body.email)
                .then(() => {
                    ses.sendEmail(req.body.email, subject, text);
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log("error in catch post /reset:", error);
                    res.sendStatus(500);
                });
        })
        .catch((error) => {
            console.log("error in catch post /reset:", error);
            res.sendStatus(500);
        });
});

app.post("/resetPassword", (req, res) => {
    db.getCode(req.body.email).then((response) => {
        let lastIndex = response.rows.length - 1;

        if (req.body.code == response.rows[lastIndex].code) {
            hash(req.body.newpassword)
                .then((hashedPassword) => {
                    db.updatePassword(hashedPassword, req.body.email);
                    res.sendStatus(200);
                })
                .catch((error) => {
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

app.get("/logOut", (req, res) => {
    req.session.userId = null;
    res.sendStatus(200);
});

module.exports = app;
