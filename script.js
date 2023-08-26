const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9952ceb1c2fa21c042acf3b1199bfc20&page=1"

const API_IMG = "https://image.tmdb.org/t/p/w1280"

const Search_API = "https://api.themoviedb.org/3/search/movie?api_key=9952ceb1c2fa21c042acf3b1199bfc20&query='' "

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

getMovies(API_URL)



async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ""

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEL = document.createElement('div')
        movieEL.classList.add('movie');
        movieEL.innerHTML = `
        <img src="${API_IMG + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
           ${overview}
        </div>
    `

        main.appendChild(movieEL)

    })
}



function getClassbyRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()


    const searchTerm = search.value

    if (searchTerm && searchTerm !== " ") {
        getMovies(Search_API + searchTerm)

        search.value = " "
    } else {
        window.location.reload()
    }
})