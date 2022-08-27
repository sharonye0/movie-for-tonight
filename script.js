const API_URL =
   "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=91a2e8830a05d779438a6eaba319c24b&page=1";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = `http://api.themoviedb.org/3/search/movie?api_key=91a2e8830a05d779438a6eaba319c24b&query="`;
const cardContainer = document.querySelector(".movie-cards");
const searchInput = document.getElementById("search");
const form = document.getElementById("form");

function generateMovieMarkup(poster, title, rating, color, overview) {
   return `
        <div class="card">
            <div>
                <img class="movie-poster" src="${IMAGE_URL}${poster}" />
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <div class="movie-rating" style="color: ${color};">${rating}</div>
                <div class="overlay">
                    <h3>Overview</h3>
                    <p class="overlay-text">${overview}</p>
                </div>
            </div>
        </div>
    `;
}

function showMovies(data) {
   cardContainer.innerHTML = "";
   data.forEach((movie) => {
      const {
         poster_path: image,
         title,
         vote_average: votes,
         overview,
      } = movie;

      let color = "";
      if (votes >= 7.5) color = "green";
      if (votes >= 5 && votes < 7.5) color = "yellow";
      if (votes < 5) color = "red";

      cardContainer.insertAdjacentHTML(
         "beforeend",
         generateMovieMarkup(image, title, votes, color, overview)
      );
   });
}

async function getMovies(url) {
   const res = await fetch(url);
   const data = await res.json();
   showMovies(data.results);
}

getMovies(API_URL);

form.addEventListener("submit", (e) => {
   const searchTerm = searchInput.value;
   if (searchTerm !== "") {
      getMovies(`${SEARCH_URL}${searchTerm}"`);
      searchInput.value = "";
   } else {
      window.location.reload();
   }
   e.preventDefault();
});

