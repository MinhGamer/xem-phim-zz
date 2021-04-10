import React, { useState, useContext } from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import './CardMovieDetail.css';

import { AuthContext } from '../../shared/context/AuthContext';

import Button from '../../shared/components/UI/Button';
import { NavLink } from 'react-router-dom';

export default function CardMovieDetail(props) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);

  const auth = useContext(AuthContext);

  const { movie, cardMovieRight } = props;

  return (
    <div
      className={`card-movie-detail ${
        showFullOverview ? 'overview-full' : ''
      } ${cardMovieRight ? 'card-right' : 'card-left'}`}>
      {/* <img src={`${API_MOVIE_IMAGE}/${movie.poster_path}`} alt={movie.title} /> */}
      <div
        style={{
          backgroundImage: `url('${API_MOVIE_IMAGE}/${movie.backdrop_path}')`,
        }}
        className='movie-content'>
        <div className={`movie-overview `}>{movie.overview}</div>

        {!showFullOverview && (
          <span
            onClick={() => setShowFullOverview(true)}
            className='movie-read-more'>
            Xem thêm
          </span>
        )}

        {showFullOverview && (
          <span
            onClick={() => setShowFullOverview(false)}
            className='movie-read-more'>
            Thu gọn
          </span>
        )}

        <div className='movie-info'>
          <div className='movie-info--item item-like'>
            <p>Lượt thích:</p>{' '}
            <span className='movie-statistic '>
              {movie.popularity.toFixed(0)}
            </span>
            <i className='fa fa-thumbs-up icon-liked'></i>
          </div>
          <div className='movie-info--item item-buy'>
            <p>Đã mua:</p>{' '}
            <span className='movie-statistic'>{movie.vote_count}</span>
            <i className='fa fa-hand-holding-usd icon-buy'></i>
          </div>
          <div className='movie-info--item item-imdb'>
            <p>Điểm:</p>{' '}
            <span className='movie-statistic'>{movie.vote_average}</span>
            <span className='IMDb--icon'>IMDb</span>
          </div>
        </div>
        <div
          onMouseLeave={() => setShowLoginRequired(false)}
          className='movie-cart'>
          <Button onMouseEnter={() => setShowLoginRequired(true)} isGreen>
            Thêm vào giỏ hàng <i class='fa fa-shopping-cart '></i>
          </Button>
          <div
            onMouseEnter={() => setShowLoginRequired(true)}
            className='icon-heart'>
            <i class='fa fa-heart'></i>
          </div>
          {!auth.isLoggedIn && showLoginRequired && (
            <div className='movie-login-require'>
              Xin hãy <NavLink to='/auth'>Đăng nhập</NavLink> để tiếp tục{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
