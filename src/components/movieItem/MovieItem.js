import React from 'react';

import { useHistory } from 'react-router-dom';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import './MovieItem.css';

export default function MovieItem(props) {
  const { id, original_title, title, poster_path } = props.movie;
  const history = useHistory();

  const imageUrl = `${API_MOVIE_IMAGE}/${poster_path}`;

  const gotoMovieDetailPage = () => {
    history.push(`/movie/${id}`);
  };

  return (
    <div className='movie-item'>
      <div onClick={gotoMovieDetailPage} className='movie-item__image'>
        <img src={imageUrl} alt={original_title} />
        <div className='movie-item__overlay'></div>
        <div className='movie-item__play-icon'>
          <i className='fa fa-play '></i>
        </div>
      </div>
      <p className='movie-item__title--vn'>{title}</p>
      <p className='movie-item__title--eng'>{original_title}</p>
    </div>
  );
}
