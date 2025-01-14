
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { FaRegBookmark } from "react-icons/fa6";



export default function MoviesCard({ movie }) {

  const [watchlist, setWatchlist] = useState([]);




  // Load the watchlist from localStorage when the component mounts
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);


  const addToWatchlist = (movie) => {
    // Avoid adding duplicate movies
    if (!watchlist.some((item) => item.trackId === movie.trackId)) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); 
    }
  };

  const removeFromWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.trackId !== movie.trackId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); 
  };


  return (
    <div className='border-2 border-gray-200 dark:text-white p-5 max-sm:p-1 rounded-lg hover:shadow-2xl cursor-pointer flex justify-center flex-col items-center'>
      <Link href={"/movies/" + movie.trackId}>

        <img className='w-full rounded-lg' src={movie.artworkUrl100} alt="" />
        <div className='flex flex-col justify-start items-start'>
          
        <h3 className='p-1 text-sm font-bold'>{movie.trackName}</h3>
        <p className='text-gray-600 font-bold dark:text-white'><span className='text-gray-800 dark:text-white '>Actor : </span> {movie.artistName}</p>
        <p className='text-gray-600 font-bold dark:text-white'><span className='text-gray-800 dark:text-white '>Price : </span> {movie.trackPrice}</p>
        <h4>{movie.primaryGenreName}</h4>
        </div>

      </Link>
      <div className='px-3 py-3  rounded-xl m-2 bg-[#fd7e14] hover:bg-[#e8590c] text-white border-2'>
        {watchlist.some((item) => item.trackId === movie.trackId) ? (
          <button className='flex gap-2max-sm:text-sm ' onClick={() => removeFromWatchlist(movie)}><FaRegBookmark /> Remove from Watchlist</button>
        ) : (
          <button className='flex gap-2 max-sm:text-sm' onClick={() => addToWatchlist(movie)}><FaRegBookmark /> Add to Watchlist</button>
        )}
      </div>
    </div>


  )
}
