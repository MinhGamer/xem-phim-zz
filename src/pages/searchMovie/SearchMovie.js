import React, { useEffect, useCallback, useState, useRef } from 'react';

import './SearchMovie.css';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import useHttp from '../../shared/customHooks/useHttp';

import MovieItem from '../../components/movieItem/MovieItem';

export default function SearchMovie() {
  const { searchMovie, isLoading } = useHttp();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //user stop enter keyword for 1s -> start fetching data
    const timer = setTimeout(async () => {
      const data = await searchMovie(query);

      setMovies(data.results);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, searchMovie]);

  return (
    <div className='search-container'>
      <input
        placeholder='Nhập tên phim...'
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {isLoading && <LoadingSpinner />}

      {movies && (
        <div className='search-movies'>
          {movies.map((movie) => (
            <MovieItem noVnTitle key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
