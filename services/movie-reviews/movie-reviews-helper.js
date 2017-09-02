require('isomorphic-fetch');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

function getMovieReviewsFromAPI(req, res, next) {
  let movie = req.body.movieTitle;
  console.log('In getMovieReviewsFromAPI');
  console.log(req.body.movieTitle);
 fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='${req.body.movieTitle}'&api-key=${API_KEY}`)
// fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='Star Wars'&api-key=23ef585f24434a31bc9550dbab01d0bb`)
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
      console.log('---------->',jsonRes);
      res.locals.movieReviewData = jsonRes;
      next();
    }).catch(err => {
      console.log(err);
      next();
    })
}

module.exports = {
  getMovieReviewsFromAPI,
}
