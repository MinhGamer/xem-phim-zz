import React, { useState, useEffect, useCallback, useMemo } from 'react';

import MovieList from '../../components/movieList/MovieList';

import { useHistory } from 'react-router-dom';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';
import MovieFilter from '../../components/movieFilter/MovieFilter';

import './HomePage.css';

export default function HomePage() {
  const history = useHistory();

  const historySearch = history.location.search;

  const { fetchMovies, filterMovies, isLoading, error, clearError } = useHttp();

  const [movies, setMovies] = useState([]);

  const [filterTerm, setFilterTerm] = useState({
    with_genres: '',
    with_original_language: '',
    primary_release_year: '',
    'with_runtime.lte': '',
    'with_runtime.gte': '',
    sort: '',
  });

  window.addEventListener('load', () => {
    history.push('/');
  });

  const fetchFilterMovies = async () => {
    const filteredMovies = await filterMovies('movie', historySearch, 3);

    setMovies(filteredMovies);
  };

  const convertQueryToFilter = (query) => {
    console.log(query);

    const myQuery = query.substring(1).split('&');

    const filterUpdate = {
      with_genres: '',
      with_original_language: '',
      primary_release_year: '',
      'with_runtime.lte': '',
      'with_runtime.gte': '',
      sort: '',
    };

    myQuery.forEach((queryItem) => {
      const [title, value] = queryItem.split('=');

      filterUpdate[title] = value;
    });

    setFilterTerm(filterUpdate);
  };

  //when location search change
  useEffect(() => {
    fetchFilterMovies();

    convertQueryToFilter(historySearch);
  }, [historySearch]);

  const covertFilterToQuery = (filter) => {
    //use to params to hold state when user click backfilter.genres
    const genres = filter.with_genres && `&with_genres=${filter.with_genres}`;

    const language =
      filter.with_original_language &&
      `&with_original_language=${filter.with_original_language}`;

    const year =
      filter.primary_release_year &&
      `&primary_release_year=${filter.primary_release_year}`;

    //length greater than
    const lengthMin =
      filter['with_runtime.gte'] &&
      `&with_runtime.gte=${filter['with_runtime.gte']}`;

    //length less than
    const lengthMax =
      filter['with_runtime.lte'] &&
      `&with_runtime.lte=${filter['with_runtime.lte']}`;

    //sort descending
    const sort = filter.sort && `&sort_by=${filter.sort}.desc`;

    let filterCombied = [
      genres,
      language,
      year,
      lengthMin,
      lengthMax,
      sort,
    ].join('');

    filterCombied = filterCombied.replace('&', '');

    return filterCombied;
  };

  //listen to user select filter movies
  const filterHandler = (type, value) => {
    const filterUpdate = { ...filterTerm };

    if (type === 'length') {
      filterUpdate['with_runtime.lte'] = value.max;

      filterUpdate['with_runtime.gte'] = value.min;
    } else {
      filterUpdate[type] = value;
    }

    console.log(filterUpdate);

    const query = covertFilterToQuery(filterUpdate);

    history.push({
      pathname: '/',
      search: `${query}`,
    });

    setFilterTerm((prev) => ({ ...prev, ...filterUpdate }));
  };

  const memoFilter = useMemo(
    () => <MovieFilter filterTerm={filterTerm} filterHandler={filterHandler} />,
    [filterTerm]
  );

  const memeMovieList = useMemo(
    () => <MovieList type='movie' movies={movies} />,
    [movies]
  );

  return (
    <div className='home-page'>
      {true && <ErrorModal error={error} clearError={clearError} />}

      {isLoading && <LoadingSpinner asOverlay />}

      {memoFilter}

      {!isLoading && movies.length > 0 && memeMovieList}
    </div>
  );
}
