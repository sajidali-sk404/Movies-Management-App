"use client"
import React, { useEffect, useState } from 'react'
import MoviesCard from './MoviesCard';

export default function SearchResults({ searchText, movies }) {
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
            <div className='flex justify-around p-4  dark:text-white '>
                <h1 className='text-2xl '>Search Result    &quot;{searchText}&quot;</h1>

                <select onChange={e => filterMovie(e.target.value) } className='text-lg p-2 border-4'>
                    <option>Sort By</option>
                    <option value="Low-Price">Low Price</option>
                    <option value="High-Price">High Price</option>
                    <option value="Release-Date">Release Date</option>
                </select>
            </div>
            <div className=' '>
            <div className='flex flex-wrap gap-5 mx-16'>
                {Array.isArray(filteredMovies) && filteredMovies?.map((movie) => {
                    return <MoviesCard key={movie.trackId} movie={movie} />;
                })}
            </div>
            </div>
        </>
    )
}
