const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres://postgres:postgres@localhost:5432/knitables`
);

exports.addUser = function (first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first, last, email, password`,
        [first, last, email, password]
    );
};

exports.getPassword = function (inputEmail) {
    return db.query(`SELECT password, id FROM users WHERE email = $1`, [
        inputEmail,
    ]);
};

exports.getUserByEmail = function (email) {
    return db.query(`SELECT id FROM users WHERE email = $1`, [email]);
};

exports.addCodeToTable = function (secretCode, email) {
    return db.query(
        `INSERT INTO password_reset_codes (code, email)
        VALUES ($1, $2)`,
        [secretCode, email]
    );
};

exports.getCode = function (email) {
    return db.query(
        `SELECT code FROM password_reset_codes
        WHERE CURRENT_TIMESTAMP - create_at < INTERVAL '10' MINUTE
        AND email = $1 `,
        [email]
    );
};

exports.updatePassword = function (newPassword, email) {
    return db.query(
        `UPDATE users SET password = $1
        WHERE email = $2`,
        [newPassword, email]
    );
};

exports.getUser = function (userId) {
    return db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [userId]
    );
};

exports.addImage = function (url, userId) {
    return db.query(
        `UPDATE users SET imageurl = $1
        WHERE id = $2
        RETURNING id, first, last, imageurl`,
        [url, userId]
    );
};

exports.addSweaterBodyImage = function (url, userId) {
    return db.query(
        `INSERT INTO sweater (body_image, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET body_image = $1
        RETURNING id, user_id, body_image`,
        [url, userId]
    );
};

exports.uploadRightSleeve = function (url, userId) {
    return db.query(
        `INSERT INTO sweater (sleeve_right_image, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET sleeve_right_image = $1
        RETURNING *`,
        [url, userId]
    );
};

exports.uploadLeftSleeve = function (url, userId) {
    return db.query(
        `INSERT INTO sweater (sleeve_left_image, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET sleeve_left_image = $1
        RETURNING *`,
        [url, userId]
    );
};

exports.saveRibColor = function (color, userId) {
    return db.query(
        `INSERT INTO sweater (rib, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET rib = $1
        RETURNING *`,
        [color, userId]
    );
};

exports.getSweater = function (userId) {
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
        `SELECT sweater.*, users.bio, users.imageurl, users.first, users.last, users.created_at
        FROM sweater
        JOIN users
        ON users.id = sweater.user_id`
    );
};

exports.getCurrentProject = function (projectId) {
    return db.query(
        `SELECT sweater.*, users.imageurl, users.first, users.last, users.created_at
        FROM sweater
        JOIN users
        ON users.id = sweater.user_id
        WHERE sweater.id = $1`,
        [projectId]
    );
};

exports.addBio = function (bioText, userId) {
    return db.query(
        `UPDATE users SET bio = $1
        WHERE id = $2
        RETURNING id, bio`,
        [bioText, userId]
    );
};

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
