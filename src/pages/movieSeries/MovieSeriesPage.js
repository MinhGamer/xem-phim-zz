import React, { useEffect, useState, useCallback, useMemo } from 'react';

import './MovieSeriesPage.css';

import { CSSTransition } from 'react-transition-group';

import useHttp from '../../shared/customHooks/useHttp';

import { seriesList } from '../../shared/util/config';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import MovieList from '../../components/movieList/MovieList';

import MovieSeriesDetail from '../../components/movieSeriesDetail/MovieSeriesDetail';

import './MovieSeriesPage.css';

export default function MovieSeriesPage() {
  const { fetchSeries, isLoading } = useHttp();
  const [series, setSeries] = useState([]);
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    const fetchSeriesData = async () => {
      const data = await fetchSeries(seriesList);

      setSeries(data);
    };

    fetchSeriesData();
  }, []);

  const clickMovieHandler = (movieId) => {
    setMovieId(movieId);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {series.length > 0 && (
        <div className='series-container'>
          <MovieList
            clickMovieHandler={clickMovieHandler}
            type='series'
            movies={series}
          />

          <div>
            {series.map((movie) => (
              <>
                {movieId === movie.id && (
                  <MovieSeriesDetail series={movie.parts} />
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
