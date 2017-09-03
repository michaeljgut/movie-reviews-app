function saveMovieTitle() {
  localStorage.setItem('movieTitle', movieTitleInput.value);
}

let movieTitleInput = document.getElementById('movie');
movieTitleInput.focus();
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click',saveMovieTitle);
