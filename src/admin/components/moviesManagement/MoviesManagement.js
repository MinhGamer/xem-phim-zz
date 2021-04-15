import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  API_MOVIE_IMAGE_CUSTOM,
  ADMIN_MOVIES_PER_PAGE,
  ADMIN_MOVIES_PAGINATION_RANGE,
} from '../../../shared/util/config';

import './MoviesManagement.css';

import { actUpdateMovieDisplay } from '../../../redux/actionCreator/movieActions';

import ToggleSwitch from '../../../shared/components/UI/ToggleSwitch';

function MoviesManagement(props) {
  const history = useHistory();
  const { displayedMovieList } = props;
  const { allowMovieToDisplay } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const renderMovieTbody = () => {
    return pagination(displayedMovieList, currentPage).map((movie, index) => {
      return (
        <tr
          className={`movie-management-item ${
            index % 2 === 0 ? 'item-is-blue' : ''
          }`}>
          <td className='management-item__img '>
            <img
              onClick={() => history.push(`/movie/${movie.id}`)}
              src={`${API_MOVIE_IMAGE_CUSTOM}/w300/${movie.backdrop_path}`}
              alt={movie.original_title}
            />
          </td>
          <td className='management-item__title '>
            <p
              onClick={() => history.push(`/movie/${movie.id}`)}
              className='title-vn'>
              {movie.title}
            </p>
            <p className='title-en'>{movie.original_title}</p>
          </td>
          <td className='management-item__year '>{movie.release_date}</td>
          <td className='management-item__year '>{movie.vote_count}</td>
          <td className='management-item__year '>
            {' '}
            {movie.popularity.toFixed(0)}
          </td>
          <td className='management-item__year '>{movie.vote_average}</td>
          <td className='management-item__toggle-display'>
            <ToggleSwitch
              defaultChecked={movie.allowedToDisplay}
              onClick={() => allowMovieToDisplay(movie)}
            />
          </td>
        </tr>
      );
    });
  };

  const pagination = (users, pageNumber) => {
    const start = (pageNumber - 1) * ADMIN_MOVIES_PER_PAGE;
    const end = pageNumber * ADMIN_MOVIES_PER_PAGE;

    return users.slice(start, end);
  };

  const renderPaginationBtn = (users) => {
    const TOTAL_PAGE = Math.ceil(users.length / ADMIN_MOVIES_PER_PAGE);

    const createPages = (from, to) => {
      const totalPages = [];

      if (from === to) {
        return (
          <span
            onClick={() => setCurrentPage(from)}
            className={`page-number ${currentPage === from ? 'active' : ''}`}>
            {from}
          </span>
        );
      }

      for (let page = from; page <= to; page++) {
        const pageEle = (
          <span
            onClick={() => setCurrentPage(page)}
            className={`page-number ${currentPage === page ? 'active' : ''}`}>
            {page}
          </span>
        );
        totalPages.push(pageEle);
      }

      return totalPages;
    };

    const dots = <span className={`page-dots`}>...</span>;

    const renderTotalPages = () => {
      let totalPages = [];

      //total pages <= USERS_PAGINATION_RANGE + 1
      if (TOTAL_PAGE <= ADMIN_MOVIES_PAGINATION_RANGE + 2) {
        return (totalPages = createPages(1, TOTAL_PAGE));
      }

      //1. range from 1 to (ADMIN_MOVIES_PAGINATION_RANGE + 1)
      if (currentPage <= ADMIN_MOVIES_PAGINATION_RANGE + 1) {
        totalPages = createPages(1, ADMIN_MOVIES_PAGINATION_RANGE + 1);
        totalPages.push(dots);
        totalPages.push(createPages(TOTAL_PAGE, TOTAL_PAGE));
        return totalPages;
      }

      //2. range from  (ADMIN_MOVIES_PAGINATION_RANGE + 2) to (TOTAL_PAGE - ADMIN_MOVIES_PAGINATION_RANGE - 2)
      if (
        currentPage >= ADMIN_MOVIES_PAGINATION_RANGE + 2 &&
        currentPage < TOTAL_PAGE - ADMIN_MOVIES_PAGINATION_RANGE
      ) {
        totalPages.push(createPages(1, 1));
        totalPages.push(dots);
        totalPages.push(createPages(currentPage - 1, currentPage + 1));
        totalPages.push(dots);
        totalPages.push(createPages(TOTAL_PAGE, TOTAL_PAGE));
        return totalPages;
      }

      // 3. range from TOTAL_PAGE - ADMIN_MOVIES_PAGINATION_RANGE - 1) to TOTAL_PAGE
      if (currentPage >= TOTAL_PAGE - ADMIN_MOVIES_PAGINATION_RANGE) {
        totalPages.push(createPages(1, 1));
        totalPages.push(dots);
        totalPages.push(
          ...createPages(TOTAL_PAGE - ADMIN_MOVIES_PAGINATION_RANGE, TOTAL_PAGE)
        );
        return totalPages;
      }

      // return totalPages;
    };

    return (
      <div className='all-users-pagination'>
        {/* prev-page */}
        <i
          onClick={() =>
            setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1))
          }
          className={`fa fa-less-than arrow-page ${
            currentPage === 1 ? 'disabled' : ''
          }`}></i>

        <span className='page-number-list'>{renderTotalPages()}</span>

        {/* next-page */}
        <i
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage === TOTAL_PAGE ? TOTAL_PAGE : prevPage + 1
            )
          }
          className={`fa fa-greater-than arrow-page ${
            currentPage === TOTAL_PAGE ? 'disabled' : ''
          }`}></i>
      </div>
    );
  };

  return (
    <div className='movie-management-container'>
      <table>
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th>Ngày phát hành</th>
            <th>Lượt thích</th>
            <th>Đã mua</th>
            <th>
              <span className='IMDb--icon'>IMDb</span>
            </th>
            <th>Hiển thị</th>
          </tr>
        </thead>
        <tbody> {renderMovieTbody()}</tbody>
      </table>
      <div class='movie-management-pagination'>
        {renderPaginationBtn(displayedMovieList)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    displayedMovieList: state.movieReducer.displayedMovieList,
    isAdmin: state.userReducer.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allowMovieToDisplay: (movie) => dispatch(actUpdateMovieDisplay(movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesManagement);
