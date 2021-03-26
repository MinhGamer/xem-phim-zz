import React, { useState, useEffect } from 'react';

import MovieList from '../../components/movieList/MovieList';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';
import MovieFilter from '../../components/movieFilter/MovieFilter';

import './HomePage.css';

export default function HomePage() {
  const { fetchMovies, filterMovies, isLoading, error, clearError } = useHttp();
  const [movies, setMovies] = useState([]);

  const [filterTerm, setFilterTerm] = useState({
    genres: '',
    language: '',
  });

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const data = await fetchMovies('movie/popular', 'GET', 3);

        setMovies(data);
      } catch (err) {}
    };

    fetchMovieList();
  }, [fetchMovies]);

  const filterHandler = async (type, id) => {
    const filterUpdate = { ...filterTerm };

    filterUpdate[type] = id;

    // console.log(filterUpdate);

    const filteredMovies = await filterMovies(filterUpdate);

    console.log(filteredMovies);

    setMovies(filteredMovies);

    setFilterTerm(filterUpdate);
  };

  return (
    <div className='home-page'>
      {true && <ErrorModal error={error} clearError={clearError} />}

      {isLoading && <LoadingSpinner asOverlay />}

      <MovieFilter filterHandler={filterHandler} />

      {!isLoading && movies && <MovieList movies={movies} />}
    </div>
  );
}
