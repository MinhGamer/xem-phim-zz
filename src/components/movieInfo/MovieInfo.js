import React, { useCallback } from 'react';

import { LANGUAGE_LIST_VN } from '../../shared/util/config';

import { useHistory } from 'react-router-dom';

import useHttp from '../../shared/customHooks/useHttp';

import Collection from '../collection/Collection';
import { connect } from 'react-redux';

import { actUpdateMovieCart } from '../../shared/../redux/actionCreator/userActions';

import * as actionTypes from '../../redux/actionTypes/actionTypes';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

function MovieInfo(props) {
  const {
    movie,
    movieId,
    user,
    token,
    addMovieToCart,
    removeMovieFromCart,
    isLoading,
  } = props;
  const history = useHistory();
  const type = history.location.pathname.split('/')[1];
  const { sendUser } = useHttp();

  const isAddedToCart = user && user.cart[movieId];

  const convertMovieLength = useCallback((runtime) => {
    let minutes = +runtime % 60;
    let hours = Math.floor(+runtime / 60);

    if (hours <= 0) {
      hours = null;
    }

    if (minutes === 0) {
      minutes = null;
    }

    return `${hours ? `${hours} giờ` : ''}  ${
      minutes ? `${minutes} phút` : ''
    } ${type === 'tv' ? '/tập' : ''}`;
  }, []);

  const gotoHomePageToFilter = (type, value) => {
    switch (type) {
      case 'year':
        history.push(`/?primary_release_year=${value}`);
        break;

      case 'genres':
        history.push(`/?with_genres=${value}`);
        break;

      case 'language':
        history.push(`/?with_original_language=${value}`);
        break;

      default:
    }
  };

  const renderGenres = (genres) => {
    return genres.map((genre) => {
      genre.name = genre.name.replace('Phim', '');

      return (
        <span
          onClick={() => gotoHomePageToFilter('genres', genre.id)}
          key={genre.id}
          className='movie-detail__genres--item'>
          {genre.name}
        </span>
      );
    });
  };

  const renderDirectors = (directors) => {
    //may render many director
    return directors.map((director, index) =>
      index === directors.length - 1 ? (
        <span onClick={() => gotoPersonPage(director.id)}>{director.name}</span>
      ) : (
        <span onClick={() => gotoPersonPage(director.id)}>
          {director.name},
        </span>
      )
    );
  };

  const gotoPersonPage = (personId) => {
    history.push(`/person/${personId}`);
  };

  const clickCollectionHandler = async (action) => {
    //when movie go to collection
    // colletec: array = [
    //  1771: {isDone: true}, => finish list
    // 527774: {isDone: false} => wishlist
    // ]

    const { collection } = user;

    if (action === 'addFavorited' || action === 'addDone') {
      collection[movieId] = { isDone: action === 'addDone' ? true : false };
    }

    if (action === 'delete') {
      delete collection[movieId];
    }

    const data = await sendUser(
      'user',
      'PATCH',
      JSON.stringify({ collection }),
      {
        Authorization: 'Bearer ' + token,
      }
    );
    console.log(data);
  };

  const renderLanguge = (langugeId) => {
    const index = LANGUAGE_LIST_VN.findIndex(
      (languge) => languge.id === langugeId
    );

    if (index === -1) return;

    return LANGUAGE_LIST_VN[index].name;
  };

  return (
    <div>
      <div className='movie-detail__title-eng'>
        {movie.original_title || movie.original_name}
      </div>
      <div className='movie-detail__title-vn'>
        {movie.title || movie.name} (
        <span
          onClick={() =>
            gotoHomePageToFilter('year', movie.release_date.split('-')[0])
          }
          className='movie-detail__title--year'>
          {movie.release_date.split('-')[0]}
          {/*release year */}
        </span>
        )
      </div>

      <div className='movie-detail__length'>
        {convertMovieLength(movie.runtime || movie.episode_run_time)}
      </div>

      {movie.number_of_seasons && (
        <div className='movie-detail__season'>
          {movie.number_of_seasons || ''} seasons
        </div>
      )}

      {movie.number_of_episodes && (
        <div className='movie-detail__season'>
          {movie.number_of_episodes || ''} tập
        </div>
      )}

      <div className='movie-detail__IMDb'>
        <span className='IMDb--icon'>IMDb</span>
        {movie.vote_average}
      </div>

      <div className='movie-detail__share'>
        {isLoading && <LoadingSpinner size='small' />}
        {!isAddedToCart && !isLoading && (
          <span
            onClick={() => addMovieToCart({ ...movie, id: movieId })}
            className='movie-detail__share icon-cart'>
            <i class='fa fa-shopping-cart'></i>
            Thêm vào giỏ hàng
          </span>
        )}

        {isAddedToCart && !isLoading && (
          <span
            onClick={() => removeMovieFromCart({ ...movie, id: movieId })}
            className='movie-detail__share icon-delete'>
            <i class='fa fa-minus'></i>
            Xóa khỏi giỏ hàng
          </span>
        )}

        {type !== 'tv' && (
          <Collection
            status={(user && user.collection[movieId]) || null}
            onClick={clickCollectionHandler}
          />
        )}
      </div>

      <div className='movie-detail__genres '>{renderGenres(movie.genres)}</div>

      <div className='movie-detail__sub-info'>
        <p>
          <span className='movie-detail__sub-info--label'>ĐẠO DIỄN</span>
          <span className='movie-detail__sub-info--value movie-detail__sub-info--directors'>
            {renderDirectors(movie.directors)}
          </span>
        </p>
        {movie.original_language && (
          <p>
            <span className='movie-detail__sub-info--label'>NGÔN NGỮ</span>
            <span className='movie-detail__sub-info--value'>
              {/* {movie.original_language || movie.origin_country} */}
              <span
                onClick={() =>
                  gotoHomePageToFilter('language', movie.original_language)
                }
                className='movie-detail__sub-info--language'>
                {renderLanguge(movie.original_language)}
              </span>
            </span>
          </p>
        )}
        <p>
          <span className='movie-detail__sub-info--label'>KHỞI CHIẾU</span>
          <span className='movie-detail__sub-info--value'>
            {movie.release_date || movie.air_date || movie.first_air_date}
          </span>
        </p>
      </div>

      <div className='movie-detail__description'>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
    isAdmin: state.userReducer.isAdmin,
    token: state.userReducer.token,
    isLoading: state.userReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToCart: (movie) =>
      dispatch(actUpdateMovieCart(actionTypes.ADD_MOVIE_TO_CART, movie)),

    removeMovieFromCart: (movie) =>
      dispatch(actUpdateMovieCart(actionTypes.REMOVE_MOVIE_FROM_CART, movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
