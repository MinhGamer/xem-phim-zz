import React, { useState } from 'react';

import MovieItem from '../movieItem/MovieItem';

import './MovieList.css';

import {
  MOVIES_PER_PAGE,
  MOVIES_PAGINATION_RANGE,
  SERIES_PER_PAGE,
} from '../../shared/util/config';
import Button from '../../shared/components/UI/Button';

function MovieList(props) {
  const { movies, type, clickMovieHandler } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const MOVIE_ITEM_PER_PAGE =
    type === 'series' ? SERIES_PER_PAGE : MOVIES_PER_PAGE;

  const numberOfPages = Math.ceil(movies.length / MOVIE_ITEM_PER_PAGE);

  const pagination = (movies, page) => {
    const start = (page - 1) * MOVIE_ITEM_PER_PAGE;
    const end = page * MOVIE_ITEM_PER_PAGE;

    return movies.slice(start, end);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const gotoPage = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = (movies) => {
    const pageNumbers = [];

    const numberOfPages = Math.ceil(movies.length / MOVIE_ITEM_PER_PAGE);

    if (numberOfPages <= 5) {
      for (let page = 1; page <= numberOfPages; page++) {
        pageNumbers.push(
          <span
            className={page === currentPage ? 'pagination-page--active' : ''}
            onClick={() => gotoPage(page)}>
            {page}
          </span>
        );
      }

      return pageNumbers;
    }

    if (currentPage > numberOfPages - MOVIES_PAGINATION_RANGE + 1) {
      pageNumbers.unshift(
        <span onClick={() => gotoPage(currentPage - 2)}>{currentPage - 2}</span>
      );
    }

    for (
      let page = currentPage - 1;
      page <= currentPage + MOVIES_PAGINATION_RANGE - 2;
      page++
    ) {
      if (page > numberOfPages) {
        break;
      }

      if (page <= 0) {
        continue;
      }

      pageNumbers.push(
        <span
          className={page === currentPage ? 'pagination-page--active' : ''}
          onClick={() => gotoPage(page)}>
          {page}
        </span>
      );
    }

    //reander first few pages
    if (currentPage <= MOVIES_PAGINATION_RANGE - 1) {
      pageNumbers.push(
        <span onClick={() => gotoPage(currentPage + 2)}>{currentPage + 2}</span>
      );
    }

    if (currentPage >= MOVIES_PAGINATION_RANGE + 1) {
      pageNumbers.unshift(<p>...</p>);
      pageNumbers.unshift(<span onClick={() => gotoPage(1)}>{1}</span>);
    }

    if (currentPage <= numberOfPages - MOVIES_PAGINATION_RANGE) {
      pageNumbers.push(<p>...</p>);
      pageNumbers.push(
        <span onClick={() => gotoPage(numberOfPages)}>{numberOfPages}</span>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className='movie-list'>
        {pagination(movies, currentPage).map((movie) => (
          <MovieItem
            clickMovieHandler={clickMovieHandler}
            type={type}
            key={movie.id}
            movie={movie}
          />
        ))}

        <div className='pagination'>
          {/* page numbers */}
          <div className='pagination-page'>{renderPageNumbers(movies)}</div>

          {/* next and prev button */}
          <div>
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{ margin: '1rem' }}
              isClear>
              Trang trước
            </Button>
            <Button
              disabled={currentPage === numberOfPages}
              onClick={nextPage}
              isClear>
              Trang sau
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(MovieList);
