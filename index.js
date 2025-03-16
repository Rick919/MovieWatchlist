const apiKey = "ec5e4cb9"

const searchBtn = document.getElementById("search-btn")
const searchBar = document.getElementById("search-bar")
const displayMovies = document.getElementById("display-movies")





if(searchBtn)
searchBtn.addEventListener("click",getMoviesData)

async function addToWatchlist(data)
{
    const movie = {
        Title: data.Title,
        Poster: data.Poster,
        RunTime: data.Runtime,
        Genre: data.Genre,
        Plot: data.Plot,
        imdbRating: data.imdbRating,
        imdbID: data.imdbID
    }
    let dataArray = []

    try{    
         dataArray = await import ('./watchlist.js').then(({getWatchlistData}) => {
            return getWatchlistData()
        })
    }catch(error){
        alert(error)
    }
        
    
        
      dataArray.push(movie)
      localStorage.setItem("Watchlist",JSON.stringify(dataArray))
    
}


async function getMoviesData()
{
    const searchInput = searchBar.value.trim()
    try
    {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`)
        if(response.ok)
        {
        const data = await response.json()
    
        if(data && data.Response === "True")
        {
            renderData(data)
            const addBtn = document.getElementById("add-btn")
            addBtn.addEventListener("click", () => {
                addToWatchlist(data)
            })
        }
        else
        {
            displayMovies.classList.add("error")
            displayMovies.innerHTML = `<h2>Movie not found. Please try another search.</h2>`;
        }
        
        
    }else
    {
        displayMovies.classList.add("error")
        displayMovies.innerHTML = "<h2> Unable to fetch movies .Please try again </h2>"
        console.log(response.status)
    }
    }catch(error){
        console.error("Error fetching data:", error);
        displayMovies.classList.add("error")
    displayMovies.innerHTML = `<h2>An error occurred while searching for the movie. Please try again later.</h2>`;
    }
    
    
}

function renderData(d)
{
    
      let  html = `<div class="movie-info"> 
                <img src="${d.Poster}" class="poster">
                <div class="movie-container">
                <div class="movie-title">
                <h3> ${d.Title} </h3>
                <img src="images/star-icon.png" class="star-icon">
                <p> ${d.imdbRating} </p>
                </div>
                <div class="movie-meta">
                <p> ${d.Runtime} </p>
                <p> ${d.Genre} </p>
                <div class="watchlist">
                <img src="images/add-icon.png" class="add-icon">
                <button class="add-btn" id="add-btn"> Watchlist </button>
                </div>
                </div>
                <p class="plot"> ${d.Plot} </p>
                </div>
                </div>`

    displayMovies.innerHTML = html
    displayMovies.classList.remove("start-exploring")
}



