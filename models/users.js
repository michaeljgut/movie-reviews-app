const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, password_digest)
    VALUES ($1, $2)
    RETURNING *
  `, [user.username, user.password_digest]);
};

User.findUserComments = (id) => {
  return db.manyOrNone(`
    SELECT * FROM comments
    WHERE user_id = $1
  `, [id]);
};

module.exports = User;
