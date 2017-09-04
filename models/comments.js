const db = require('../db/config');

const Comment = {};

Comment.findAll = () => {
  return db.query('SELECT * FROM comments');
}

Comment.findAllByMovieTitle = (movieTitle) => {
  return db.query(`SELECT comments.id AS id, comment, to_char(date_entered, 'YYYY-MM-DD') AS date_entered, username FROM comments
                   JOIN users
                   ON comments.user_id = users.id
                   WHERE movie_title = UPPER($1)
                  `, [movieTitle]);
}

Comment.create = (comment, userid) => {
  return db.one(
    `
      INSERT INTO comments
      (movie_title, comment, user_id, date_entered)
      VALUES (UPPER($1), $2, $3, clock_timestamp())
      RETURNING *
    `,
    [comment.movie_title, comment.comment, userid]
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
  return db.one(
    `
      DELETE FROM comments
      WHERE id = $1
      RETURNING *
    `,
    [id]
  );
};

module.exports = Comment;
