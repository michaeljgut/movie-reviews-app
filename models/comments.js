const db = require('../db/config');

const Comment = {};

Comment.findAll = () => {
  return db.query('SELECT * FROM comments');
}

Comment.create = comment => {
  return db.one(
    `
      INSERT INTO comments
      (movie_title, comment)
      VALUES ($1, $2)
      RETURNING *
    `,
    [comment.movie_title, comment.comment]
  );
};

Comment.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM comments
    WHERE id = $1
  `, [id]);
}

Comment.update = (comment, id) => {
  return db.one(`
    UPDATE comments SET
    movie_title = $1,
    comment = $2
    WHERE id = $3
    RETURNING *
  `, [comment.movie_title, comment.comment, id]);
}

Comment.destroy = id => {
  return db.none(
    `
      DELETE FROM comments
      WHERE id = $1
    `,
    [id]
  );
};

module.exports = Comment;
