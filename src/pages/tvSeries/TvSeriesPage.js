import React, { useState, useEffect } from 'react';

import './TvSeriesPage.css';

import MovieList from '../../components/movieList/MovieList';

import useHttp from '../../shared/customHooks/useHttp';

export default function TvSeriesPage() {
  const { fetchMovies } = useHttp();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      const data = await fetchMovies('tv', 'GET', 2);

      setMovies(data);
    };
    fetchMovieList();
  }, []);

  return (
    <div className='tv-series'>
      {movies.length > 0 && <MovieList type='tv' movies={movies} />}
    </div>
  );
}
