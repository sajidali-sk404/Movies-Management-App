import React from 'react'

export default function SimilarMoviesCard({ movie }) {

    return (
    
            <li key={movie.trackId}>
                <h2>{movie.primaryGenreName}</h2>
                <img src={movie.artworkUrl100} alt="img" />
                
                
            </li>


       
    )
}
