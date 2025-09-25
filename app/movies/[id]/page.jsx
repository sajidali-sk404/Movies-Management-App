import { GetMovieDetails, GetSimilarMovies } from '@/app/component/api/Request'
import PlayVideo from '@/app/component/PlayVideo';
import SimilarMoviesCard from '@/app/component/SimilarMoviesCard';

export default async function MovieDetails({ params }) {
  const { id } = params;
  const movieDetails = await GetMovieDetails(id);

  if (!movieDetails) {
  return (
    <div className="p-10 text-center text-red-500">
      Movie not found. Please try again later.
    </div>
  );
}
  // ✅ Fix: pass the actual title
  const similarMovies = await GetSimilarMovies(movieDetails.primaryGenreName);
  console.log("Similar movies:", similarMovies);

  return (
    <>
      <div className='flex container max-sm:flex-col w-full overflow-hidden mt-10 gap-4 border-2 p-6 max-md:p-2'>
        <img className='border-4 w-full' src={movieDetails.artworkUrl100} alt="" />
        <div className='flex flex-col'>
          <h1 className='font-bold text-base'>{movieDetails.trackName}</h1>
          <p><span className='font-bold'>Country:</span> {movieDetails.country}</p>
          <p className='text-red-800'>{movieDetails.trackPrice} AUD</p>
          <p><span className='font-bold'>Actor:</span> {movieDetails.artistName}</p>
          <p><span className='font-bold'>Date:</span> {movieDetails.releaseDate}</p>
          <p>{movieDetails.primaryGenreName}</p>
          <p className='underline text-xl text-red-800 text-justify'>Description</p>
          <p>{movieDetails.longDescription}</p>

          <div className='flex justify-center items-center'>
            <PlayVideo movieDetails={movieDetails} />
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      <h2 className='mx-10 text-2xl text-gray-700 dark:text-gray-100'>Similar Movies</h2>
      <div className='flex flex-wrap gap-5 my-4 mx-8'>
        {Array.isArray(similarMovies) && similarMovies.length > 0 ? (
          similarMovies
            // ✅ filter out the current movie so it doesn’t appear in its own similar list
            .filter(movie => movie.trackId !== movieDetails.trackId)
            .map(movie => (
              <SimilarMoviesCard key={movie.trackId} movie={movie} />
            ))
        ) : (
          <p className="text-gray-500">No similar movies found.</p>
        )}
      </div>
    </>
  )
}
