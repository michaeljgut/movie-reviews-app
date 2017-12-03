const movieReviews = require('../models/movie-reviews.js');
const Comment = require('../models/comments.js');
const movieReviewsController = {};

movieReviewsController.index = (req, res) => {
  res.render('index',{movieReviewMessage: 'Please enter movie title'})
}

movieReviewsController.sendApiMovieReviews = (req, res) => {
  console.log('in sendApiMovieReviews',res.locals.movieReviewData);
  if (res.locals.movieReviewData.num_results < 1)
    res.render('index',{movieReviewMessage: 'Movie not found, please enter another movie title.'})
  else {
    let movie = '';
    if (req.body.movieTitle)
      movie = req.body.movieTitle;
    else
      movie = req.params.movieTitle;
    Comment.findAllByMovieTitle(movie)
      .then(comments => {
        movieReviews.findByMovieTitle(movie)
        .then(movieReviewsData => {
          console.log('movieReviews = ', movieReviewsData);
          console.log(res.locals.movieReviewData);
          if (!movieReviewsData) {
            movieReviews.create(res.locals.movieReviewData);
          }
          res.render('movie-reviews/show', {movieReview: res.locals.movieReviewData,
                                            comments: comments});
        }).catch(err => {
          console.log(err);
          console.log('in sendApiMovieReviews');
          res.status(500).json({err: err});
        });
      }).catch(err => {
        console.log(err);
        console.log('in sendApiMovieReviews');
        res.status(500).json({err: err});
      });
  }
}

module.exports = movieReviewsController;
