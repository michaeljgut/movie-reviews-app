const Comment = require('../models/comments.js');
const movieReviewsController = {};

movieReviewsController.index = (req, res) => {
  res.json({
    message: 'Here is our Movie Reviews index route',
  });
}

movieReviewsController.sendApiMovieReviews = (req, res) => {
  console.log('in sendApiMovieReviews',res.locals.movieReviewData);
  if (res.locals.movieReviewData.num_results < 1)
    res.render('index',{movieReviewMessage: 'Movie not found'})
  else {
    Comment.findAllByMovieTitle(req.body.movieTitle)
      .then(comments => {
        console.log(comments);
        res.render('movie-reviews/show', {movieReview: res.locals.movieReviewData,
                                          comments: comments});
      }).catch(err => {
        console.log(err);
        res.status(500).json({err: err});
      });
  }
  // , { movieReview: res.locals.movieReviewData });

  // res.json({
  //   message: `Movie Reviews for ${req.params.movieTitle}`,
  //   message2: res.locals.movieReviewData
  // })
}

module.exports = movieReviewsController;