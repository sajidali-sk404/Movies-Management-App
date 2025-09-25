const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GetTrandingMovies() {
    const data = await fetch(`https://itunes.apple.com/search?term=star&country=au&media=movie&all`)
    const movies = await data.json();
    return movies.results;
}

export async function GetMovieDetails(id) {
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}`, { cache: "no-store" });
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return data.results[0];
    }

    // 🔄 fallback: try searching by id as term (sometimes works)
    const fallback = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(id)}&country=au&media=movie&limit=1`);
    const fbData = await fallback.json();

    if (fbData.results && fbData.results.length > 0) {
      return fbData.results[0];
    }

    throw new Error(`No movie found for ID: ${id}`);
  } catch (error) {
    console.error("GetMovieDetails Error:", error.message);
    return null;
  }
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

export async function GetSimilarMovies(primaryGenreName) {
  try {
    const query = primaryGenreName.split(" ")[0]; // safer term
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=au&media=movie&limit=10`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (data.results?.length > 0) return data.results;

    // fallback: at least show some movies
    const fallback = await fetch(
      `https://itunes.apple.com/search?term=movie&country=au&media=movie&limit=10`
    );
    const fallbackData = await fallback.json();
    return fallbackData.results || [];
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
}




export async function PaginationMovies(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const response = await fetch(
    `https://itunes.apple.com/search?term=movie&country=au&media=movie&limit=${limit}&offset=${offset}`
  );

  const movies = await response.json();

  console.log("Result Count:", movies.resultCount); // total results for this request
  console.log("Offset:", offset, "Page:", page);

  return movies.results;
}

