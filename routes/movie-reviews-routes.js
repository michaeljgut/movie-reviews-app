const express = require('express');
const movieReviewsRouter = express.Router();

const movieReviewsController = require('../controllers/movie-review-controller');
const movieReviewsHelper = require('../services/movie-reviews/movie-reviews-helper');

movieReviewsRouter.get('/', movieReviewsHelper.getMovieReviewsFromAPI,
  movieReviewsController.sendApiMovieReviews);
// movieReviewsRouter.get('/', movieReviewsController.index);
// movieReviewsRouter.get('/show', movieReviewsHelper.getMovieReviewsFromAPI,
//   movieReviewsController.sendApiMovieReviews);
movieReviewsRouter.post('/show', movieReviewsHelper.getMovieReviewsFromAPI,
  movieReviewsController.sendApiMovieReviews);

// movieReviewsRouter.post('/', movieReviewsHelper.getMovieReviewsFromAPI,
// maybe you will need to use `req.params.movie-review` in your API call? 🤔
movieReviewsRouter.get('/:movieTitle', movieReviewsHelper.getMovieReviewsFromAPI,
  movieReviewsController.sendApiMovieReviews);

module.exports = movieReviewsRouter;
