const movieReviewsController = {};

movieReviewsController.index = (req, res) => {
  res.json({
    message: 'Here is our Movie Reviews index route',
  });
}

movieReviewsController.sendApiMovieReviews = (req, res) => {
  console.log('in sendApiMovieReviews',res.locals.movieReviewData);
    res.render('movie-reviews/show', {movieReview: res.locals.movieReviewData});
  // , { movieReview: res.locals.movieReviewData });

  // res.json({
  //   message: `Movie Reviews for ${req.params.movieTitle}`,
  //   message2: res.locals.movieReviewData
  // })
}

module.exports = movieReviewsController;
