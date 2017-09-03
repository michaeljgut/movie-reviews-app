let movieTitleInput = document.getElementById('movie_title');
let commentInput = document.getElementById('comment');
commentInput.focus();
movieTitleInput.value = localStorage.getItem('movieTitle');
