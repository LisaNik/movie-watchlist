
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let movies = [];

const apiKey = 'e5b12cef'

const moviesList = document.getElementById('list')

const searchBtn = document.getElementById('search-btn')
const searchInput= document.getElementById('search-input') 


function searchMovie() {
    const movieName = searchInput.value.trim();

    if (!movieName) return;

    fetchOMDbAPI(movieName);
}

searchBtn.addEventListener("click", searchMovie);

searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchMovie();
    }
});

document.addEventListener("click", function (e) {
    
    if (e.target.dataset.id){
        const id = e.target.dataset.id;
        const movieExists = watchlist.some(movie => movie.imdbID === id);

        if(movieExists){
            watchlist = watchlist.filter(movie => movie.imdbID !== id);

            saveWatchlist()
            e.target.textContent = "Watchlist";
            const icon = e.target.parentElement.querySelector("img");
            icon.src = "images/remove.svg";
        }

        else{

            const movie = movies.find(movie => movie.imdbID === id);

            if (movie) {
                watchlist.push(movie);
                saveWatchlist()

                e.target.textContent = "Remove";
                e.target.previousElementSibling.src = "images/remove.svg";
            }
        }

    }   

});


function fetchOMDbAPI(movieName){

    moviesList.innerHTML = "";
    movies = []; // очистить предыдущие результаты
    

fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`)
    .then(response => response.json())
    .then(data => {
        
      
        if(data.Response === "True"){

            for(let item of data.Search){
                fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${item.imdbID}`)
            .then(res => res.json())
            .then(data => 
                {
                    movies.push(data)
                    createMovieCard(data)
                })
            
            }
        }

        else{
            noMatchError()
        }

    });

}

function createMovieCard(data){
    
    const runtime = data.Runtime === "N/A" ? "—" : data.Runtime;
    const genre = data.Genre === "N/A" ? "—" : data.Genre;
    const rating = data.imdbRating === "N/A" ? "—" : data.imdbRating;
    let plot;
    if (data.Plot === "N/A") {
        plot = "No description available.";
    } else if (data.Plot.length > 120) {
        plot = `${data.Plot.slice(0, 120)}... <span class="read-more">Read more</span>`;
    } else {
        plot = data.Plot;
    }

    const isInWatchlist = watchlist.some(movie => movie.imdbID === data.imdbID);

    moviesList.innerHTML += `
        <div class="item">
                <img class="poster" src="${data.Poster}" onerror="this.onerror=null; this.src='images/noPoster.svg';">
                <div class="movie-info">
                    
                    <div class="top-info">
                        <h2 class="title">${data.Title}</h2>                        
                            <img src="images/star.svg"/>
                            <p class="rating-number">${rating}</p>                        
                    </div>

                    <div class="middle-info">
                        <p class="screen-time">${runtime}</p>
                        <p class="genre">${genre}</p>
                        <div class="add-to-watchlist">
                            <img src="images/${isInWatchlist ? "remove" : "add"}.svg">
                            <button data-id = "${data.imdbID}" class="add-to-watchlist-btn">${isInWatchlist ? "Remove" : "Watchlist"}</button>
                        </div>
                    </div>
                    <div class="bottom-info">
                        <p class="description">${plot}</p>
                    </div>
                </div>                
            </div>
        `
}

function saveWatchlist() {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}


function noMatchError(){
    console.log("Unable to find what you’re looking for. Please try another search.")
moviesList.innerHTML = `
            <div class="no-results">
        <p>Unable to find what you're looking for. Please try another search.</p>
    </div>`
}