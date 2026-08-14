let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
const moviesList = document.getElementById('list')

updateWatchlist()

document.addEventListener("click", function (e) {
    if (e.target.dataset.id) {
        const id = e.target.dataset.id;

        watchlist = watchlist.filter(movie => movie.imdbID !== id);

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        updateWatchlist()
    }
});

function createWatchlistCard(data){
    // console.log(data)
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
                            <img src="images/remove.svg" alt="">
                            <button data-id = "${data.imdbID}" class="remove-from-watchlist-btn">Remove</button>
                        </div>
                    </div>
                    <div class="bottom-info">
                        <p class="description">${plot}</p>
                    </div>
                </div>                
            </div>
        `
}


function updateWatchlist(){
    if (!watchlist.length) {
    console.log("Watchlist пуст");

    moviesList.innerHTML =`<div class="no-results">
            <p>Your watchlist is looking a little empty...</p>
            <div class="add-movies">
                <img src="images/add.svg" alt="">
                <a class="site-link" href="index.html">Let’s add some movies!</a>
            </div>
        </div>`
}
else{
    // console.log(watchlist)
    moviesList.innerHTML = ""
    
    for(let item of watchlist){
                          
        createWatchlistCard(item)
                }
            
            
}
}