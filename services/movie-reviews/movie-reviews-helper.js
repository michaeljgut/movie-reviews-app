require('isomorphic-fetch');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

/* This function is called from 2 places. Depending on which place is calling, */
function getMovieReviewsFromAPI(req, res, next) {
  let movie = '';
  if (req.body.movieTitle)
    movie = req.body.movieTitle;
  else
    movie = req.params.movieTitle;
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

module.exports = {
  getMovieReviewsFromAPI,
}
