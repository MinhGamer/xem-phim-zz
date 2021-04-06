import React from 'react';

import { useHistory } from 'react-router-dom';

import LazyLoad from 'react-lazyload';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import './MovieItem.css';

export default function MovieItem(props) {
  const {
    id,
    original_title,
    title,
    poster_path,
    name,
    original_name,
    backdrop_path,
  } = props.movie;

  const { type, clickMovieHandler, isAlreadyWatchced, isEdit } = props;

  const history = useHistory();

  const imageUrl = `${API_MOVIE_IMAGE}/${poster_path || backdrop_path}`;

  const gotoMovieDetailPage = () => {
    history.push(`/${type}/${id}`);
  };

  const onClickMovieHandler = () => {
    if (type === 'series') {
      return clickMovieHandler(id);
    }

    //default behavior
    return gotoMovieDetailPage();
  };

  const onClickMovieEdit = (e, action) => {
    e.stopPropagation();

    clickMovieHandler(id, action);
  };

  return (
    <>
      {poster_path && (
        <LazyLoad
          once
          offset={[-100, -200]}
          height={600}
          key={id}
          placeholder={<LoadingSpinner />}
          className='movie-item'>
          <div
            onClick={() => onClickMovieHandler()}
            className='movie-item__image'>
            {isEdit && (
              <div className='movie-item__edit'>
                {isAlreadyWatchced && (
                  <div
                    onClick={(e) => onClickMovieEdit(e, 'addFavorited')}
                    className='collection-wishlist'>
                    <i class='fa fa-eye '></i>
                    <span>Muốn xem lại</span>
                  </div>
                )}

                {!isAlreadyWatchced && (
                  <div
                    onClick={(e) => onClickMovieEdit(e, 'addDone')}
                    className='collection-done'>
                    <i class='fa fa-check '></i>
                    <span>Đã xem xong</span>
                  </div>
                )}

                <div
                  onClick={(e) => onClickMovieEdit(e, 'delete')}
                  className='collection-delete'>
                  <i class='fa fa-trash '></i>
                  <span>Xoá</span>
                </div>
              </div>
            )}

            <img src={imageUrl} alt={original_title} />
            <div className='movie-item__play-icon'>
              {!isEdit && <i className='fa fa-play '></i>}
            </div>
          </div>

          <p className='movie-item__title--vn'>{title || name}</p>
          {!props.noVnTitle && (
            <p className='movie-item__title--eng'>
              {original_title || original_name}
            </p>
          )}
        </LazyLoad>
      )}
    </>
  );
}
