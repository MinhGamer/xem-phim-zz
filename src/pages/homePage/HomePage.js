import React, { useState, useEffect } from 'react';

import MovieList from '../../components/movieList/MovieList';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';

export default function HomePage() {
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await sendRequest('movie');
        setMovies(data.movies);
      } catch (err) {}
    };

    fetchMovies();
  }, [sendRequest]);

  return (
    <>
      {true && <ErrorModal error={error} clearError={clearError} />}

      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && movies && <MovieList movies={movies} />}
    </>
  );
}
