"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaRegBookmark } from "react-icons/fa6";

const MovieList = ({ movies }) => {
    const [watchlist, setWatchlist] = useState([]);

    // Load the watchlist from localStorage when the component mounts
    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(savedWatchlist);
    }, []);

    // Add a movie to the watchlist
    const addToWatchlist = (movie) => {
        // Avoid adding duplicate movies
        if (!watchlist.some((item) => item.trackId === movie.trackId)) {
            const updatedWatchlist = [...watchlist, movie];
            setWatchlist(updatedWatchlist);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); // Save to localStorage
        }
    };

    // Remove a movie from the watchlist
    const removeFromWatchlist = (movie) => {
        const updatedWatchlist = watchlist.filter((item) => item.trackId !== movie.trackId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); // Save to localStorage
    };

    return (
        <div>

            <ul>
                {Array.isArray(movies) && movies.map((movie) => (
                    <li key={movie.trackId}>
                        {movie.trackName}
                        {watchlist.some((item) => item.trackId === movie.trackId) ? (
                            <button onClick={() => removeFromWatchlist(movie)}>Remove from Watchlist</button>
                        ) : (
                            <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                        )}
                    </li>
                ))}
            </ul>

            <h2 className='flex justify-center items-center text-3xl p-5'>My Watchlist</h2>
            {watchlist.length === 0 ? (
                <p className='flex justify-center items-center text-red-700 text-3xl p-5'>No movies in watchlist</p>
            ) : (
                <ul>
                    {watchlist.map((movie) => (
                        <li key={movie.trackId} className='grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-10' >
                            <div className='border-2 border-gray-200 p-2 rounded-lg hover:shadow-2xl cursor-pointer flex justify-center flex-col items-center'>
                            <Link href={"/movies/" + movie.trackId}>

                                <img className='w-full' src={movie.artworkUrl100} alt="" />
                                <h3 className='p-1 text-sm font-bold'>{movie.trackName}</h3>
                                <p className='text-gray-600 font-bold dark:text-white'><span className='text-gray-800 dark:text-white '>Actor : </span> {movie.artistName}</p>
                                <p className='text-gray-600 font-bold dark:text-white'><span className='text-gray-800  dark:text-white'>Price : </span> {movie.trackPrice}</p>
                                <h4>{movie.primaryGenreName}</h4>

                            </Link>
                            <div className='px-3 py-3  rounded-xl m-2 bg-[#fd7e14] hover:bg-[#e8590c] text-white border-2'>
                                <button className='flex gap-2' onClick={() => removeFromWatchlist(movie)}>
                                <FaRegBookmark />
                                Remove from Watchlist</button>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieList;
