const MovieReviews = require('../../models/movie-reviews.js');
require('isomorphic-fetch');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

function getMovieReviewsFromDB(req, res, next) {
  let movie = '';
  if (req.body.movieTitle)
    movie = req.body.movieTitle;
  else
    movie = req.params.movieTitle;
  // Search movie_reviews table for the movie, if it exists, get the data from there, otherwise, make the API call.
  console.log('movie = ',movie);
  MovieReviews.findByMovieTitle(movie)
    .then(movieReviews => {
//      console.log('movieReviews = ',movieReviews.display_title);
      if (movieReviews) {
        let array = [];
        array[0] = movieReviews;
        res.locals.movieReviewData = { results: array }
        next();
      } else {
        let movieQuery = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='${movie}'&api-key=${API_KEY}`;
        console.log(movieQuery);
        fetch(movieQuery)
          .then(fetchRes => fetchRes.json())
          .then(jsonRes => {
            console.log('---------->',jsonRes);
            console.log(jsonRes.link);
            res.locals.movieReviewData = jsonRes;
            if (res.locals.movieReviewData.results[0].critics_pick === 1)
              res.locals.movieReviewData.results[0].critics_pick = 'Yes';
            else
              res.locals.movieReviewData.results[0].critics_pick = 'No';
            next();
          }).catch(err => {
            console.log('in getMovieReviewsFromAPI');
            console.log(err);
            next();
          })
      }
      // if (!movieResult) {
      //   movieReviews.create(res.locals.movieReviewData);
      // }
      //   res.render('movie-reviews/show', {movieReview: res.locals.movieReviewData,
      //                                     comments: comments});
    }).catch(err => {
      console.log(err);
      console.log('in sendApiMovieReviews');
      res.status(500).json({err: err});
      return({result: 'no', data: []});
    });

}

/* This function is called from 2 places. Depending on which place is calling, */
function getMovieReviewsFromAPI(req, res, next) {
  let movie = '';
  if (req.body.movieTitle)
    movie = req.body.movieTitle;
  else
    movie = req.params.movieTitle;
  // Search movie_reviews table for the movie, if it exists, get the data from there, otherwise, make the API call.
  console.log('Calling getMovieReviewsFromDB');
  let movieResult = getMovieReviewsFromDB(req, res, next);
  // console.log('movieResult = ',movieResult);
  // if (movieResult.result === 'yes') {
  //   res.locals.movieReviewData = movieResult.data;
  //   next();
  // } else {
  //   let movieQuery = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='${movie}'&api-key=${API_KEY}`;
  //   console.log(movieQuery);
  //   fetch(movieQuery)
  //     .then(fetchRes => fetchRes.json())
  //     .then(jsonRes => {
  //       console.log('---------->',jsonRes);
  //       console.log(jsonRes.link);
  //       res.locals.movieReviewData = jsonRes;
  //       if (res.locals.movieReviewData.results[0].critics_pick === 1)
  //         res.locals.movieReviewData.results[0].critics_pick = 'Yes';
  //       else
  //         res.locals.movieReviewData.results[0].critics_pick = 'No';
  //       next();
  //     }).catch(err => {
  //       console.log('in getMovieReviewsFromAPI');
  //       console.log(err);
  //       next();
  //     })
  // }
}

module.exports = {
  getMovieReviewsFromAPI,
}
