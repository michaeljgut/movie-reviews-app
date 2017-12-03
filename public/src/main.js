/* Client side javascript file to save movie title to be used in the comments/new view so user doesn't have to
 * retype the movie title.
 */
function saveMovieTitle() {
  localStorage.setItem('movieTitle', movieTitleInput.value);
}

let movieTitleInput = document.getElementById('movie');
movieTitleInput.focus();
if (localStorage.getItem('saveMessage') === 'false') {
  localStorage.setItem('saveMessage', 'true');
  let movieReviewMessage = document.getElementsByClassName('movie-review-message');
  movieReviewMessage[0].innerText = "Please enter movie title";
}
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click',saveMovieTitle);
