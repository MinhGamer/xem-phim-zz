import React, { useState, useEffect } from 'react';

import MovieList from '../../components/movieList/MovieList';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';
import MovieFilter from '../../components/movieFilter/MovieFilter';

import './HomePage.css';

export default function HomePage() {
  const { fetchMovies, sendRequest, isLoading, error, clearError } = useHttp();
  const [movies, setMovies] = useState([]);

  const [filterTermArr, setFilterTermArr] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const data = await fetchMovies('movie/popular', 'GET', 3);

        setMovies(data);
      } catch (err) {}
    };

    fetchMovieList();
  }, [fetchMovies]);

  const filterHandler = (_filer) => {
    //user don't search anything before
    if (filterTermArr.length === 0) {
      setFilterTermArr([_filer]);
      return;
    }

    //user alreay filter
    const termIndex = filterTermArr.findIndex(
      (term) => term.type === _filer.type
    );

    if (termIndex === -1) {
      //and then filter in another type
      setFilterTermArr([...filterTermArr, _filer]);
    } else {
      //and then filter in the same type
      const updateFilter = [...filterTermArr];
      updateFilter[termIndex] = _filer;
      setFilterTermArr(updateFilter);
    }
  };

  return (
    <div className='home-page'>
      {true && <ErrorModal error={error} clearError={clearError} />}

      {isLoading && <LoadingSpinner asOverlay />}

      <MovieFilter filterHandler={filterHandler} />

      {!isLoading && movies && (
        <MovieList filterTermArr={filterTermArr} movies={movies} />
      )}
    </div>
  );
}
