import React, { useEffect, useCallback, useState, useRef } from 'react';

import './SearchMovie.css';

import { useHistory } from 'react-router-dom';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import useHttp from '../../shared/customHooks/useHttp';

import MovieItem from '../../components/movieItem/MovieItem';

export default function SearchMovie() {
  const { searchMovie, isLoading } = useHttp();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  const fetchMovies = useCallback(async (term) => {
    if (!term) return;

    const data = await searchMovie(term);
    setMovies(data.results);
  }, []);

  // user enter keyword
  //stop for 1s
  //then push keyword to url as query
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push({
        pathname: '/search/',
        search: query,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, fetchMovies, history]);

  //whenever keyword in url query change, query movie from db
  useEffect(() => {
    const term = history.location.search.replace('?', '');

    setQuery(term);
    fetchMovies(term);
  }, [history.location.search, fetchMovies]);

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
            <MovieItem type='movie' noVnTitle key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
