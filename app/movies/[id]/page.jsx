
import { GetMovieDetails, GetSimilarMovies } from '@/app/component/api/Request'
import PlayVideo from '@/app/component/PlayVideo';
import SimilarMoviesCard from '@/app/component/SimilarMoviesCard';





export default async function MovieDetails({ params }) {
  const movieDetails = await GetMovieDetails(params.id);
  const similarMovies = await GetSimilarMovies(params.movieTitle);
  
  


  return (
    <>
      <div className='flex container max-sm:flex-col w-full m-10 gap-4 border-2 p-4  '>
        <img className='border-4 w-full'  src={movieDetails.artworkUrl100} alt="" />
        <div className='flex flex-wrap flex-col max-sm:'>
          
          <h1 className='font-bold text-base'>{movieDetails.trackName}</h1>
          <p><span className='font-bold'>Country:</span>{movieDetails.country}</p>
          <p className='text-red-800'>{movieDetails.trackPrice}AUD</p>
          <p><span className='font-bold'>Actor:</span>{movieDetails.artistName}</p>
          <p><span className='font-bold '>Date:</span>{ movieDetails.releaseDate}</p>
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
        {similarMovies.map(movie => {
          return <SimilarMoviesCard key={movie.primaryGenreName} movie={movie}/>
        })}

      </div>
    </>
  )
}
