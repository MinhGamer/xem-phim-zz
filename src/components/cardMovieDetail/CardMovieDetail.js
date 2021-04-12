import React, { useState, useContext } from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

// import {
//   actAddMovieToCart,
//   actRemoveMovie,
// } from '../../redux/actionCreator/moviesCartAction';

import {
  actAddMovieToCollection,
  actRemoveMovieFromCollection,
  actAddMovieToCart,
  actRemoveMovieFromCart,
} from '../../redux/actionCreator/userActions';

import './CardMovieDetail.css';

import { AuthContext } from '../../shared/context/AuthContext';

import Button from '../../shared/components/UI/Button';
import { NavLink, useHistory } from 'react-router-dom';

import Backdrop from '../../shared/components/UI/Backdrop';
import { connect } from 'react-redux';

import useHttp from '../../shared/customHooks/useHttp';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

function CardMovieDetail(props) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [showRemoveFromCartBtn, setShowDeleteBtn] = useState(false);
  const [
    showRemoveFromCollectionBtn,
    setShowRemoveFromCollectionBtn,
  ] = useState(false);

  const { sendUser, isLoading, error } = useHttp();

  const history = useHistory();

  const auth = useContext(AuthContext);

  const {
    movie,
    cardMovieRight,
    onBackdropClick,
    moviesCart,
    removeMovie,
    addMovieToCart,
    user,
    isLoggined,
    userToken,
    addMovieToCollection,
    removeMovieFromCollection,
  } = props;

  //check to see if movie is in cart or not
  const cartArr = user && user.cart && Object.values(user.cart);
  const isAddedToCart =
    cartArr.findIndex((_movie) => _movie.id === movie.id) !== -1;

  //check to see if movie is in collection or not
  const collectionArr =
    user && user.collection && Object.values(user.collection);
  const isAddToCollection =
    collectionArr.findIndex((_movie) => _movie.id === movie.id) !== -1;

  const addMovieToCollectionHandler = async (movie) => {
    user.collection[movie.id] = movie;

    try {
      const data = await sendUser(
        'user',
        'PATCH',
        JSON.stringify({ collection: user.collection }),
        {
          Authorization: 'Bearer ' + userToken,
        }
      );

      addMovieToCollection(movie);
      console.log(data);
    } catch (err) {}
  };

  const removeMovieFromCollectionHandler = async (movieId) => {
    delete user.collection[movieId];

    try {
      const data = await sendUser(
        'user',
        'PATCH',
        JSON.stringify({ collection: user.collection }),
        {
          Authorization: 'Bearer ' + userToken,
        }
      );

      removeMovieFromCollection(movie);
      console.log(data);
    } catch (err) {}
  };

  const addMovieToCartHandler = async (movie) => {
    console.log(moviesCart, movie);

    // try {
    //   const data = await sendUser(
    //     'user',
    //     'PATCH',
    //     JSON.stringify({ collection: user.collection }),
    //     {
    //       Authorization: 'Bearer ' + userToken,
    //     }
    //   );

    //   addMovieToCollection(movie);
    //   console.log(data);
    // } catch (err) {}
    addMovieToCart(movie);
  };

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
                    ? () => addMovieToCartHandler(movie)
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

            {!isAddToCollection && (
              <>
                {isLoading && <LoadingSpinner />}
                {!isLoading && (
                  <div
                    onClick={() => addMovieToCollectionHandler(movie)}
                    className={`btn-add-to-collection`}>
                    {!isLoading && (
                      <>
                        <div className='icon-heart'>
                          <i className='fa fa-heart'></i>
                        </div>
                      </>
                    )}
                    <div className='add-to-collection-text'>
                      Thêm vào danh sách thích
                    </div>
                  </div>
                )}
              </>
            )}

            {isAddToCollection && (
              <>
                {isLoading && <LoadingSpinner />}
                {!isLoading && (
                  <div
                    onClick={() => removeMovieFromCollectionHandler(movie.id)}
                    className='btn-add-to-collection 
                 is-added-to-collection'>
                    <div
                      onMouseLeave={() => setShowRemoveFromCollectionBtn(false)}
                      onMouseEnter={
                        isLoggined
                          ? () => setShowRemoveFromCollectionBtn(true)
                          : () => setShowLoginRequired(true)
                      }
                      className='icon-heart'>
                      {!showRemoveFromCollectionBtn && (
                        <i className='fa fa-heart'></i>
                      )}

                      {showRemoveFromCollectionBtn && (
                        <i class='fa fa-heart-broken'></i>
                      )}
                    </div>
                    (
                    <div
                      onMouseLeave={() => setShowRemoveFromCollectionBtn(false)}
                      onMouseEnter={() => setShowRemoveFromCollectionBtn(true)}
                      className='add-to-collection-text'>
                      {showRemoveFromCollectionBtn
                        ? 'Xóa phim khỏi danh sách'
                        : 'Đã thích phim này'}
                    </div>
                    )
                  </div>
                )}
              </>
            )}

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
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
    userToken: state.userReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToCart: (movie) => dispatch(actAddMovieToCart(movie)),
    removeMovie: (movie) => dispatch(actRemoveMovieFromCart(movie)),
    addMovieToCollection: (movie) => dispatch(actAddMovieToCollection(movie)),
    removeMovieFromCollection: (movieId) =>
      dispatch(actRemoveMovieFromCollection(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMovieDetail);
