// Constants
const apiKey = 'b831ea728cc56e307ac2b4fb40b00360';
const apiURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const movieContainer = document.querySelector("#movies-grid");

let currentPage = 1;
let currentSearchTerm = '';

// Fetch movie data from The Movie Database API
async function fetchMovieData() {
  let url;
  if (currentSearchTerm) {
    url = `${apiURL}&query=${encodeURIComponent(currentSearchTerm)}&page=${currentPage}`;
  } else {
    url = `${apiURL}&page=${currentPage}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Creating card element
function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const moviePoster = document.createElement('img');
  moviePoster.classList.add('movie-poster');
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const movieTitle = document.createElement('h2');
  movieTitle.classList.add('movie-title');
  movieTitle.textContent = movie.title;

  const movieVotes = document.createElement('p');
  movieVotes.classList.add('movie-votes');
  movieVotes.textContent = `Rating: ⭐️ ${movie.vote_average}`;

  movieCard.appendChild(moviePoster);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieVotes);
  return movieCard;
}

// Display movies on the page
async function displayMovies() {
  const movies = await fetchMovieData();
  const moviesGrid = document.getElementById('movies-grid');

  if (currentPage == 1) {
    moviesGrid.innerHTML = ''; // Clear previous movie cards
  }

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesGrid.appendChild(movieCard);
  });

  currentPage++; // Increment the page number
}

// Add event listener to load more movies button
const loadMoreButton = document.querySelector('#load-more-movies-btn');
loadMoreButton.addEventListener('click', displayMovies);

// Add event listener to search form submit
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  console.log(searchTerm)
  searchMovies(searchTerm);
});

// Function to search movies
async function searchMovies(searchTerm) {
    movieContainer.innerHTML = ''
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${currentPage}&query=${searchTerm}`
    const response = await fetch(URL)
    const data = await response.json()
    data.results.forEach((movie) => {
        const moviesGrid = document.getElementById('movies-grid');
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
      })
  }

// Function to clear search results
function clearSearchResults() {
  currentSearchTerm = '';
  currentPage = 1;
  displayMovies();
}


// Add event listener to close search button
const closeSearchButton = document.querySelector('#close-search-btn');
closeSearchButton.addEventListener('click', clearSearchResults);

// Calling the displayMovies function to start fetching and displaying the movies
displayMovies();
