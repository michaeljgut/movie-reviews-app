require('isomorphic-fetch');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

function getMovieReviewsFromAPI(req, res, next) {
  let movie = '';
  if (req.body.movieTitle)
    movie = req.body.movieTitle;
  else
    movie = req.params.movieTitle;
  console.log('In getMovieReviewsFromAPI');
  console.log(req.params.movieTitle);
  // console.log('req = ', req);
  // console.log('res = ', res);
  let movieQuery = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='${movie}'&api-key=${API_KEY}`;
  console.log(movieQuery);
  fetch(movieQuery)
// fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='Star Wars'&api-key=23ef585f24434a31bc9550dbab01d0bb`)
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
      console.log('---------->',jsonRes);
      res.locals.movieReviewData = jsonRes;
      if (res.locals.movieReviewData.results[0].critics_pick === 1)
        res.locals.movieReviewData.results[0].critics_pick = 'Yes';
      else
        res.locals.movieReviewData.results[0].critics_pick = 'No';
      next();
    }).catch(err => {
      console.log(err);
      next();
    })
}

module.exports = {
  getMovieReviewsFromAPI,
}
