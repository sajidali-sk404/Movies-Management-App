const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GetTrandingMovies() {
    const data = await fetch(`https://itunes.apple.com/search?term=star&country=au&media=movie&all`)
    const movies = await data.json();
    return movies.results;
}

export async function GetMovieDetails(id) {
    const data = await fetch(`https://itunes.apple.com/lookup?id=${(id)}`)
    const movies = await data.json();
    return movies.results[0];
}

export async function GetMovies(query) {
    try {
        // Ensure query is passed in and use it correctly
        const response = await fetch(`https://itunes.apple.com/search?term=${(query)}&country=au&media=movie`);
        
        // Wait for the response to be converted into JSON
        const movies = await response.json();
        
        // Return the movie data or an empty array if no movies are found
        return movies.results || [];
    } catch (error) {
        // Handle any errors that occur during the fetch or JSON conversion
        console.error('Error fetching movies:', error);
        return [];
    }
}


export async function SearchMovies(search) {
    const data = await fetch(`https://itunes.apple.com/search?term=${search}&country=au&media=movie&all`)
    const movies = await data.json();
    return movies;
}

export async function GetSimilarMovies(movieTitle) {
    const data = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(movieTitle)}&country=au&media=movie&all`);
    const similarMovies = await data.json();
    return similarMovies.results[0];
}


export async function PaginationMovies(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const response = await fetch(`https://itunes.apple.com/search?term=star&country=au&media=movie&limit=${limit}&offset=${offset}`);
        const movies = await response.json();
        return movies.results;
    } 