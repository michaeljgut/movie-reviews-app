let movieTitleInput = document.getElementById('movie_title');
let commentInput = document.getElementById('comment');
commentInput.focus();
movieTitleInput.value = localStorage.getItem('movieTitle');
let newAnchor = document.createElement('a');
newAnchor.href = "/movie-reviews/" + movieTitleInput.value;
newAnchor.innerText = "Cancel";
document.body.appendChild(newAnchor);
