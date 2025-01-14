import { GetMovies } from '@/app/component/api/Request';
import React from 'react'
import SearchResults from '@/app/component/SearchResults';

export default async function searchPage({searchParams}) {
  const searchText =  searchParams.query;
  const movies = await GetMovies(searchText);

  return (
    <div>
      <SearchResults searchText={searchText} movies={movies} />
    
    </div>
  )
}
