import React, { useState, useContext } from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import {
  actAddMovieToCart,
  actRemoveMovie,
} from '../../redux/actionCreator/moviesCartAction';

import {
  actAddMovieToCollection,
  actRemoveMovieFromCollection,
} from '../../redux/actionCreator/userActions';

import './CardMovieDetail.css';

import { AuthContext } from '../../shared/context/AuthContext';

import Button from '../../shared/components/UI/Button';
import { NavLink, useHistory } from 'react-router-dom';

import Backdrop from '../../shared/components/UI/Backdrop';
import { connect } from 'react-redux';

function CardMovieDetail(props) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [showRemoveFromCartBtn, setShowDeleteBtn] = useState(false);
  const [
    showRemoveFromCollectionBtn,
    setShowRemoveFromCollectionBtn,
  ] = useState(false);

  const history = useHistory();

  const auth = useContext(AuthContext);

  const {
    movie,
    cardMovieRight,
    onBackdropClick,
    moviesCart,
    removeMovie,
    addMovieToCart,
    collection,
    user,
    isLoggined,
  } = props;

  console.log(user);

  //check to see if movie is in cart or not
  const isAddedToCart =
    moviesCart.findIndex((_movie) => _movie.id === movie.id) !== -1;

  //check to see if movie is in collection or not
  const collectionArr = Object.values(user.collection);

  const isAddToCollection =
    collectionArr.findIndex((_movie) => _movie.id === movie.id) !== -1;

  return (
    <>
      {showFullOverview && <Backdrop onClick={onBackdropClick} />}

      {showFullOverview && (
        <div
          className={`card-movie-poster ${
            cardMovieRight ? 'card-right' : 'card-left'
          }`}>
          <img
            src={`${API_MOVIE_IMAGE}/${movie.poster_path}`}
            alt={movie.title}
          />
          <p className='title-vn'>{movie.title}</p>
          <p className='title-en'>{movie.original_title}</p>
        </div>
      )}

      <div
        className={`card-movie-detail ${
          showFullOverview ? 'overview-full' : ''
        } ${cardMovieRight ? 'card-right' : 'card-left'}`}>
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
              <p>Lượt thích:</p>
              <span className='movie-statistic '>{movie.vote_count}</span>
              <i className='fa fa-thumbs-up icon-liked'></i>
            </div>
            <div className='movie-info--item item-buy'>
              <p>Đã mua:</p>
              <span className='movie-statistic'>
                {movie.popularity.toFixed(0)}
              </span>
              <i className='fa fa-hand-holding-usd icon-buy'></i>
            </div>
            <div className='movie-info--item item-imdb'>
              <p>Điểm:</p>
              <span className='movie-statistic'>{movie.vote_average}</span>
              <span className='IMDb--icon'>IMDb</span>
            </div>
          </div>
          <div
            onMouseLeave={() => setShowLoginRequired(false)}
            className='movie-action'>
            {!isAddedToCart && (
              <Button
                isFull
                onClick={
                  auth.isLoggedIn
                    ? () => props.addMovieToCart(movie)
                    : () => history.push(`/auth`)
                }
                onMouseEnter={() => setShowLoginRequired(true)}
                isGreen>
                <span>
                  Thêm vào giỏ hàng <i class='fa fa-shopping-cart '></i>
                </span>
              </Button>
            )}

            {isAddedToCart && (
              <>
                {!showRemoveFromCartBtn && (
                  <Button
                    onMouseEnter={() => setShowDeleteBtn(true)}
                    isDarkblue>
                    <span>
                      Đã thêm vào giỏ hàng <i className='fa fa-check'></i>
                    </span>
                  </Button>
                )}

                {showRemoveFromCartBtn && (
                  <Button
                    onMouseLeave={() => setShowDeleteBtn(false)}
                    onClick={() => removeMovie(movie)}
                    onMouseEnter={() => setShowLoginRequired(true)}
                    isPrimary>
                    <span>
                      Xoá khỏi giỏ hàng <i className='fa fa-trash'></i>
                    </span>
                  </Button>
                )}
              </>
            )}

            <div
              onClick={() => props.addMovieToCollection(movie)}
              className={`btn-add-to-collection ${
                isAddToCollection ? 'is-added-to-collection' : ''
              }`}>
              <div
                onMouseLeave={() => setShowRemoveFromCollectionBtn(false)}
                onMouseEnter={
                  isLoggined
                    ? () => setShowRemoveFromCollectionBtn(true)
                    : () => setShowLoginRequired(true)
                }
                // onClick={() =>
                //   (auth.user.collection[movie.id] = { isDone: false })
                // }
                className='icon-heart'>
                {(!isAddToCollection || !showRemoveFromCollectionBtn) && (
                  <i className='fa fa-heart'></i>
                )}

                {isAddToCollection && showRemoveFromCollectionBtn && (
                  <i class='fa fa-heart-broken'></i>
                )}
                {/* <i class='fa fa-heart-broken'></i> */}
              </div>
              <div
                onMouseLeave={() => setShowRemoveFromCollectionBtn(false)}
                onMouseEnter={
                  isLoggined
                    ? () => setShowRemoveFromCollectionBtn(true)
                    : () => setShowLoginRequired(true)
                }
                className='add-to-collection-text'>
                {isAddToCollection
                  ? 'Đã thích phim này'
                  : 'Thêm vào danh sách thích'}
              </div>
            </div>

            {!auth.isLoggedIn && showLoginRequired && (
              <div className='movie-login-require'>
                Xin hãy <NavLink to='/auth'>Đăng nhập</NavLink> để tiếp tục
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    moviesCart: state.moviesCartReducer.moviesCart,
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToCart: (movie) => dispatch(actAddMovieToCart(movie)),
    removeMovie: (movie) => dispatch(actRemoveMovie(movie)),
    addMovieToCollection: (movie) => dispatch(actAddMovieToCollection(movie)),
    removeMovieFromCollection: (movieId) =>
      dispatch(actRemoveMovieFromCollection(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMovieDetail);
