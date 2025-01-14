"use client"
import { useState, useEffect } from 'react';
import { PaginationMovies } from './api/Request' 
import React from 'react';
import MoviesCard from './MoviesCard';
import Sorting from './Sorting';
import { GrFormPrevious , GrFormNext } from "react-icons/gr";


const PaginationControl = () => {
    const [movies, setMovies] = useState(); 
    const [page, setPage] = useState(1); 


    const fetchMovies = async (page) => {
        const results = await PaginationMovies(page);
        setMovies(results);

    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]); 
    
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <div className=''>
                <div className='grid grid-cols-4 m-5 mt-16 gap-5 max-md:grid-cols-3 max-sm:grid-cols-2'>
                    {Array.isArray(movies) && movies.map((movie) => (
                        <MoviesCard key={movie.trackId} movie={movie} />// Display movies
                    ))}
                </div>
                   
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center items-center p-6 gap-5 bg-slate-100 dark:bg-slate-700 '>
                <button className=' text-2xl border-2  ' onClick={handlePrevPage} disabled={page === 1}>
                <GrFormPrevious />
                </button>
                <span>Page {page}</span>
                <button className='text-2xl border-2 ' onClick={handleNextPage}><GrFormNext /></button>
            </div>
        </>
    );
};

export default PaginationControl;
