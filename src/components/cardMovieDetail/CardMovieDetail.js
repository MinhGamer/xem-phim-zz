import React from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import './CardMovieDetail.css';

import Button from '../../shared/components/UI/Button';

export default function CardMovieDetail(props) {
  console.log(props.movie);

  const { movie } = props;

  return (
    <div className='card-movie-detail'>
      <img src={`${API_MOVIE_IMAGE}/${movie.poster_path}`} />
      <div className='movie-content'>
        <div className='movie-overview'>{movie.overview}</div>
        <div className='movie-info'>
          <div className='movie-info--item'>
            <p>Lượt thích:</p>{' '}
            <span className='movie-statistic'>
              {movie.popularity.toFixed(0)}
            </span>
            <i className='fa fa-thumbs-up icon-liked'></i>
          </div>
          <div className='movie-info--item'>
            <p>Đã mua:</p>{' '}
            <span className='movie-statistic'>{movie.vote_count}</span>
            <i className='fa fa-hand-holding-usd icon-buy'></i>
          </div>
          <div className='movie-info--item'>
            <p>Điểm:</p>{' '}
            <span className='movie-statistic'>{movie.vote_average}</span>
            <span className='IMDb--icon'>IMDb</span>
          </div>
        </div>
        <div className='movie-cart'>
          <Button isSecondary>
            Thêm vào giỏ hàng <i class='fa fa-shopping-cart '></i>
          </Button>
          <div className='icon-heart'>
            <i class='fa fa-heart'></i>
          </div>
        </div>
      </div>
    </div>
  );
}
