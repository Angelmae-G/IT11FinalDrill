const apiKey = '57c5a74fb80a1cdc55f5b95ae7d8c458';

// Function to fetch and display popular movies
function fetchPopularMovies() {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  fetch(popularUrl)
    .then(response => response.json())
    .then(data => displayMovies(data.results, 'moviesContainer'))
    .catch(error => console.error('Error fetching popular movies:', error));
}

// Call the function to fetch and display popular movies on page load
document.addEventListener('DOMContentLoaded', fetchPopularMovies);

function searchMovies() {
  const searchInput = document.getElementById('searchInput').value;
  const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}`;

  fetch(tmdbUrl)
    .then(response => response.json())
    .then(data => displayMovies(data.results, 'moviesContainer'))
    .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies, containerId) {
  const moviesContainer = document.getElementById(containerId);
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieItem = createMovieItem(movie);
    moviesContainer.appendChild(movieItem);
  });
}

function createMovieItem(movie) {
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');
  movieItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} poster">
    <h3>${movie.title}</h3>
    <p>Release Year: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
    <button onclick="showMovieDetails(${movie.id})">Show Details</button>
  `;
  return movieItem;
}

function showMovieDetails(movieId) {
  const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  fetch(tmdbUrl)
    .then(response => response.json())
    .then(data => displayMovieDetails(data))
    .catch(error => console.log('Error fetching movie details:', error));
	
	var y = document.getElementById("movieDetails");
	y.style.display = "block";
}


function displayMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movieDetails');
  movieDetailsContainer.innerHTML = '';

  const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300';

  const movieDetails = document.createElement('div');
  movieDetails.innerHTML = `
    <h2>${movie.title}</h2>
    <p>Release Year: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
    <p>Overview: <br>${movie.overview || 'Not available'}</p>
    <img src="${posterPath}" alt="${movie.title} poster">
<br>	<button onclick="closePoster()">Close</button>
  `;
	movieDetailsContainer.appendChild(movieDetails);
  
}
function closePoster(){
	var x = document.getElementById("movieDetails");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}