const spicedPg = require("spiced-pg");

const db = spicedPg(process.env.DATABASE_URL || `postgres://postgres:postgres@localhost:5432/knitables`);

exports.addUser = function(first, last, email, password) {
    console.log('data inserted into users DB table!');

    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first, last, email, password`,
        [first, last, email, password]
    );
};

exports.getPassword = function(inputEmail) {
    return db.query(
        `SELECT password, id FROM users WHERE email = $1`,
        [inputEmail]
    );
};

exports.getUserByEmail = function(email) {
    return db.query(
        `SELECT id FROM users WHERE email = $1`,
        [email]
    );
};

exports.addCodeToTable = function(secretCode, email) {
    console.log('data trying to get into code table!!!!');
    return db.query(
        `INSERT INTO password_reset_codes (code, email)
        VALUES ($1, $2)`,
        [secretCode, email]
    );
};

exports.getCode = function(email) {
    console.log('getting code!');
    return db.query(
        `SELECT code FROM password_reset_codes
        WHERE CURRENT_TIMESTAMP - create_at < INTERVAL '10' MINUTE
        AND email = $1 `,
        [email]
    );
};

exports.updatePassword = function(newPassword, email) {
    console.log('updating password!');
    return db.query(
        `UPDATE users SET password = $1
        WHERE email = $2`,
        [newPassword, email]
    );
};

exports.getUser = function(userId) {
    console.log('getting user from DB');
    return db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [userId]
    );
};

exports.addImage = function(url, userId) {
    console.log("***data inserted into images DB table***");
    return db.query(
        `UPDATE users SET imageurl = $1
        WHERE id = $2
        RETURNING id, first, last, imageurl`,
        [url, userId]
    );
};

exports.addSweaterBodyImage = function(url, userId) {
    console.log('data going into sweater parts tables');
    return db.query(
        `INSERT INTO sweater (body_image, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET body_image = $1
        RETURNING id, user_id, body_image`,
        [url, userId]
    );
};

exports.uploadRightSleeve = function(url, userId) {
    console.log('data going into sweater parts tables');
    return db.query(
        `INSERT INTO sweater (sleeve_right_image, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET sleeve_right_image = $1
        RETURNING *`,
        [url, userId]
    );
};

exports.uploadLeftSleeve = function(url, userId) {
    console.log('data going into sweater parts tables');
    return db.query(
        `INSERT INTO sweater (sleeve_left_image, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET sleeve_left_image = $1
        RETURNING *`,
        [url, userId]
    );
};

exports.getImages = function (userId) {
    return db.query(
        `SELECT sweater.*, users.imageurl
        FROM sweater
        JOIN users
        ON users.id = sweater.user_id
        WHERE user_id = $1`,
        [userId]
    );
};

exports.getAllProjects = function () {
    return db.query(
        `SELECT sweater.*, users.imageurl, users.first, users.last, users.created_at
        FROM sweater
        JOIN users
        ON users.id = sweater.user_id`
    );
};

exports.getCurrentProject = function (projectId) {
    console.log('db query of getCurrentProject');
    return db.query(
        `SELECT sweater.*, users.imageurl, users.first, users.last, users.created_at
        FROM sweater
        JOIN users
        ON users.id = sweater.user_id
        WHERE sweater.id = $1`,
        [projectId]
    );
};

exports.addBio = function(bioText, userId) {
    console.log("data going into bio field!");
    return db.query(
        `UPDATE users SET bio = $1
        WHERE id = $2
        RETURNING id, bio`,
        [bioText, userId]
    );
};

//for query getting password_reset_codes check the timestamp and see that it's not
//more than ten minutes old



exports.newWallPost = function (sender_id, post, project_id) {
    return db.query(
        `INSERT INTO wall (sender_id, post, project_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [sender_id, post, project_id]
    );
};

exports.getWallPosts = function (projectId) {
    return db.query(
        `SELECT wall.*, users.first, users.last, users.imageurl
        FROM wall
        JOIN users
        ON wall.sender_id = users.id
        WHERE (project_id = $1)
        ORDER BY created_at ASC`,
        [projectId]
    );
};
