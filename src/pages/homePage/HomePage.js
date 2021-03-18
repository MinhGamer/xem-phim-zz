import React, { useState, useEffect } from 'react';

import MovieList from '../../components/movieList/MovieList';

import useHttp from '../../shared/customHooks/useHttp';

export default function HomePage() {
  const { sendRequest } = useHttp();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await sendRequest('movie/');

      setMovies(data.movies);
    };

    fetchMovies();
  }, [sendRequest]);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}
