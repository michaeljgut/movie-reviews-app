const db = require('../db/config');

const MovieReviews = {};

MovieReviews.findAll = () => {
  return db.query('SELECT * FROM movie_reviews');
}

MovieReviews.create = (movieReviewData) => {
  return db.one(
    `
      INSERT INTO movie_reviews
      (display_title, critics_pick, summary_short, opening_date, publication_date, mpaa_rating, link_url)
      VALUES (UPPER($1), $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    [movieReviewData.results[0].display_title, movieReviewData.results[0].critics_pick,
     movieReviewData.results[0].summary_short,
     movieReviewData.results[0].opening_date, movieReviewData.results[0].publication_date,
     movieReviewData.results[0].mpaa_rating, movieReviewData.results[0].link.url]
  );
};

MovieReviews.findByMovieTitle = (movieTitle) => {
  return db.oneOrNone(`
    SELECT * FROM movie_reviews
    WHERE display_title = UPPER($1)
  `, [movieTitle]);
}

module.exports = MovieReviews;
