import React, { useState, useEffect, useMemo, useCallback } from 'react';

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

  const {
    fetchProductionCompany,
    filterMovies,
    isLoading,
    error,
    clearError,
  } = useHttp();

  const [movies, setMovies] = useState([]);

  const [productionCompany, setProductionCompany] = useState(null);

  const [filterTerm, setFilterTerm] = useState({
    with_companies: '',
    with_genres: '', //string
    with_original_language: '', //string
    primary_release_year: '', //string
    'with_runtime.lte': '', //string
    'with_runtime.gte': '', //string
    sort_by: '',
  });

  //re-render 2 times
  // window.addEventListener('load', () => {
  //   history.push('/');
  // });

  const convertQueryToFilter = (query) => {
    const myQuery = query.substring(1).split('&');

    const filterUpdate = {
      with_companies: '',
      with_genres: '',
      with_original_language: '',
      primary_release_year: '',
      'with_runtime.lte': '',
      'with_runtime.gte': '',
      sort_by: '',
    };

    myQuery.forEach((queryItem) => {
      const [title, value] = queryItem.split('=');

      filterUpdate[title] = value;
    });

    return filterUpdate;
  };

  //when location search change
  //re-render 1 time
  useEffect(() => {
    const fetchFilterMovies = async () => {
      const filteredMovies = await filterMovies('movie', historySearch, 3);

      //if location pathname had query with_companies
      if (historySearch.includes('with_companies')) {
        //1/ get company Id
        const parseFilterTerm = convertQueryToFilter(historySearch);

        const companyId = parseFilterTerm.with_companies;

        //2/ send to db to fecth company
        const companyData = await fetchProductionCompany(companyId);

        setProductionCompany(companyData);
      }

      // console.log(filteredMovies);

      setMovies(filteredMovies);
    };

    fetchFilterMovies();

    const updateFilterTerm = convertQueryToFilter(historySearch);

    console.log(updateFilterTerm);

    setFilterTerm(updateFilterTerm);
  }, [historySearch]);

  const covertFilterToQuery = (filter) => {
    //use to params to hold state when user click backfilter.genres
    const genres = filter.with_genres && `&with_genres=${filter.with_genres}`;

    const companies =
      filter.with_companies && `&with_companies=${filter.with_companies}`;

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
    const sort = filter.sort_by && `&sort_by=${filter.sort_by}`;

    let filterCombied = [
      genres,
      language,
      year,
      lengthMin,
      lengthMax,
      sort,
      companies,
    ].join('');

    //replace first '&'
    filterCombied = filterCombied.replace('&', '');

    return filterCombied;
  };

  //listen to user select filter movies
  const filterHandler = (type, value) => {
    const filterUpdate = { ...filterTerm };

    console.log(type, value);

    if (type === 'length') {
      filterUpdate['with_runtime.lte'] = value.max;

      filterUpdate['with_runtime.gte'] = value.min;
    } else {
      filterUpdate[type] = value;
    }

    //if user select all => set filter for that field is empty
    if (value === 'all') {
      filterUpdate[type] = '';
    }

    console.log(filterUpdate);

    const query = covertFilterToQuery(filterUpdate);

    console.log(query);

    history.push({
      pathname: '/',
      search: `${query}`,
    });

    setFilterTerm((prev) => ({ ...prev, ...filterUpdate }));
  };

  const renderCompany = () => (
    <div className='filter-production-company'>
      <div className='filter-production-company__content'>
        <span> Phim được sản xuất bởi </span>
        <a
          rel='noreferrer'
          target='_blank'
          href={productionCompany.homepage}
          className='filter-production-company__name'>
          {productionCompany.name}
        </a>
      </div>
      <span
        onClick={() =>
          history.push(
            `/${historySearch.replace(
              `with_companies=${filterTerm.with_companies}`,
              ''
            )}`
          )
        }
        className='filter-production-company--close'>
        <i class='fa fa-times'></i>
      </span>
    </div>
  );

  console.log(movies);

  return (
    <div className='home-page'>
      {true && <ErrorModal error={error} clearError={clearError} />}

      {isLoading && <LoadingSpinner asOverlay />}

      <MovieFilter filterTerm={filterTerm} filterHandler={filterHandler} />

      {filterTerm.with_companies && productionCompany && renderCompany()}

      {!isLoading && movies.length > 0 && (
        <MovieList type='movie' movies={movies} />
      )}
    </div>
  );
}
