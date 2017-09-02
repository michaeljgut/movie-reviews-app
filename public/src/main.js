// function getMovieReview() {
//   const button = document.getElementById('submit');
//   button.addEventListener('click', function(req,res){
//     let getting = document.getElementById('movie');
//     let movies = "'" + getting.value + "'";
//     fetch('https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+
//       movies +`&api-key=${process.env.API_KEY}`)
//       .then(res => res.json())
//       .then(jsonRes => {
//       console.log(jsonRes);
//     })
//   })
// }

// document.addEventListener('DOMContentLoaded', getMovieReview);

// function getMovieReview(e) {
//   e.preventDefault();
//   fetch(`/movie-reviews/${e.target.movieTitle.value}`)
//   .then(res => res.json())
//   .then(jsonRes => {
//     console.log('In getMovieReview')
//     console.log(jsonRes);
//   })
// }

// function getForm() {
//   const form = document.querySelector('#request');
//   form.addEventListener('submit', (e) => getMovieReview(e));
// }

// document.addEventListener('DOMContentLoaded', getForm);
