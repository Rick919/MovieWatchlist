const watchlistMovies = document.getElementById("watchlist-movies")

export function getWatchlistData()
{
    let existingData = localStorage.getItem("Watchlist")
    let dataArray = []

    if(existingData){
        dataArray = JSON.parse(existingData)
        if(!Array.isArray(dataArray))
            dataArray = [dataArray]
    }

    return dataArray
}
 function getWatchlist()
{
    let movies = JSON.parse(localStorage.getItem("Watchlist"))

        

        renderWatchlist(movies)
        
        document.addEventListener("click", (e) => {
            if(e.target.dataset.imdbid)
            removeData(e.target.dataset.imdbid)
            
        })

        
}


function renderWatchlist(movies)
{
    
    if( movies == null || movies.length < 1)
    {
        const emptyWatchlist = `<h2>Your Watchlist is looking a little empty...</h2>
                    <div class="add-movies">
                    <img src="images/add-icon.png" alt="" class="add-icon">
                    <h3> <a href="index.html">Let's add some movies</a> </h3>`
        watchlistMovies.innerHTML = emptyWatchlist
        watchlistMovies.classList.add("start-exploring")
    }else
    {
         let html = ""

        for(let d of movies)
            {
                html += `<div class="movie-info" > 
                        <img src="${d.Poster}" class="poster">
                        <div class="movie-container">
                        <div class="movie-title">
                        <h3> ${d.Title} </h3>
                        <img src="images/star-icon.png" class="star-icon">
                        <p> ${d.imdbRating} </p>
                        </div>
                        <div class="movie-meta">
                        <p> ${d.RunTime} </p>
                        <p> ${d.Genre} </p>
                        <div class="watchlist">
                        <img src="images/add-icon.png" class="add-icon">
                        <button class="add-btn" id="remove-btn" data-imdbID ="${d.imdbID}"> Remove </button>
                        </div>
                        </div>
                        <p class="plot"> ${d.Plot} </p>
                        </div>
                        </div>`
        
                   
            }
                 watchlistMovies.classList.remove("start-exploring")
                watchlistMovies.innerHTML = html
    }
   
}

function removeData(imdbId)
{
    const dataArray = getWatchlistData()
    let newDataArray = []

    for(let d of dataArray)
    {
        if(d.imdbID != imdbId)
            newDataArray.push(d)
    }

    console.log(newDataArray.length)

    if(newDataArray.length < 1)
    {
        localStorage.removeItem("Watchlist")
        renderWatchlist(newDataArray)
        return
    }
    localStorage.setItem("Watchlist",JSON.stringify(newDataArray))
    renderWatchlist(newDataArray)
}

document.addEventListener("DOMContentLoaded", () => {
    getWatchlist()
})
