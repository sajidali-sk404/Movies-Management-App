'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import MoviesCard from './MoviesCard';
export default function Sorting({movies}) {
    const [filteredMovies, setfilteredMovies] = useState(movies);
    
        useEffect(() => {
            setfilteredMovies(movies)
        }, [movies]);
    
        const filterMovie = (filter) => {
            let sortedMovie = [];
            switch (filter) {
                case 'Low-Price':
                    // Sort movies by price in ascending order (lowest price first)
                    sortedMovie = [...movies].sort((a, b) => a.trackPrice - b.trackPrice);
                    break;
                
                case 'High-Price':
                    // Sort movies by price in descending order (highest price first)
                    sortedMovie = [...movies].sort((a, b) => b.trackPrice - a.trackPrice);
                    break;

                case 'Release-Date':
                    // Sort movies by Release Date
                    sortedMovie = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                    break;
        
                default:
                    break;
                }
                setfilteredMovies(sortedMovie);
        }
    
  return (
    <>
    <div className='container w-full h-16 relative'>
        <h2 className='mx-28 pt-4 underline'>Top Trending Movies</h2>
    <div className='absolute m-2 top-0 right-6'>
       <select onChange={e => filterMovie(e.target.value) } className='text-lg p-2 border-4'>
                    <option>Sort By</option>
                    <option value="Low-Price">Low Price</option>
                    <option value="High-Price">High Price</option>
                    <option value="Release-Date">Release Date</option>
                </select>
    </div>
    </div>
    <div className='container flex flex-wrap p-10 gap-5'>
                    {Array.isArray(filteredMovies) && filteredMovies.map((movie) => {
                        return  <li key={movie.trackId} movie={movie}>
                            
                        </li>
                    })}
                </div>
                </>
  )
}
