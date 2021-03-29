import React, { useEffect, useState, useCallback, useMemo } from 'react';

import './MovieSeriesPage.css';

import useHttp from '../../shared/customHooks/useHttp';

import { seriesList } from '../../shared/util/config';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import MovieList from '../../components/movieList/MovieList';
import MovieItem from '../../components/movieItem/MovieItem';

export default function MovieSeriesPage() {
  const { fetchSeries, isLoading } = useHttp();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeriesData = async () => {
      const data = await fetchSeries(seriesList);

      setSeries(data);
    };

    fetchSeriesData();
  }, []);

  console.log('render', series);

  const clickMovieHandler = () => {
    console.log('HI');
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
        </div>
      )}
    </>
  );
}
