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
  const { movies, type, clickMovieHandler, noCardDetails } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const MOVIE_ITEM_PER_PAGE =
    type === 'series' ? SERIES_PER_PAGE : MOVIES_PER_PAGE;

  const numberOfPages = Math.ceil(movies.length / MOVIE_ITEM_PER_PAGE);

  const pagination = (movies, page) => {
    const start = (page - 1) * MOVIE_ITEM_PER_PAGE;
    const end = page * MOVIE_ITEM_PER_PAGE;

    return movies.slice(start, end);
  };

  const renderPageNumbers = (movies) => {
    let numberOfPages = [];

    const TOTAL_PAGES = Math.ceil(movies.length / MOVIE_ITEM_PER_PAGE);

    const createPages = (from, to) => {
      if (from === to) {
        return (
          <span
            className={from === currentPage ? 'pagination-page--active' : ''}
            onClick={() => setCurrentPage(from)}>
            {from}
          </span>
        );
      }

      const totalPages = [];
      for (let page = from; page <= to; page++) {
        totalPages.push(
          <span
            className={page === currentPage ? 'pagination-page--active' : ''}
            onClick={() => setCurrentPage(page)}>
            {page}
          </span>
        );
      }
      return totalPages;
    };

    const dots = <p>...</p>;

    if (TOTAL_PAGES <= MOVIES_PAGINATION_RANGE + 2) {
      return (numberOfPages = createPages(1, TOTAL_PAGES));
    }

    if (currentPage <= MOVIES_PAGINATION_RANGE + 1) {
      numberOfPages = createPages(1, MOVIES_PAGINATION_RANGE + 2);
      numberOfPages.push(dots);
      numberOfPages.push(createPages(TOTAL_PAGES, TOTAL_PAGES));
      return numberOfPages;
    }

    if (
      currentPage > MOVIES_PAGINATION_RANGE + 1 &&
      currentPage <= TOTAL_PAGES - MOVIES_PAGINATION_RANGE - 1
    ) {
      numberOfPages.push(createPages(1, 1));
      numberOfPages.push(dots);
      numberOfPages.push(...createPages(currentPage - 2, currentPage + 2));
      numberOfPages.push(dots);
      numberOfPages.push(createPages(TOTAL_PAGES, TOTAL_PAGES));
      return numberOfPages;
    }

    if (currentPage > TOTAL_PAGES - MOVIES_PAGINATION_RANGE - 1) {
      numberOfPages.push(createPages(1, 1));
      numberOfPages.push(dots);
      numberOfPages.push(
        createPages(TOTAL_PAGES - MOVIES_PAGINATION_RANGE - 1, TOTAL_PAGES)
      );
      return numberOfPages;
    }
  };

  return (
    <>
      <div className='movie-list'>
        {pagination(movies, currentPage).map((movie) => (
          <MovieItem
            noCardDetails={noCardDetails}
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
          <div className='next-prev-button'>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ margin: '1rem' }}
              isClear>
              Trang trước
            </Button>
            <Button
              disabled={currentPage === numberOfPages}
              onClick={() => setCurrentPage(currentPage + 1)}
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
