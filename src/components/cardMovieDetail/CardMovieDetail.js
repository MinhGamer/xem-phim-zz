import React, { useState } from 'react';

import {
  API_MOVIE_IMAGE,
  API_MOVIE_IMAGE_CUSTOM,
} from '../../shared/util/config';

import {
  actUpdateMovieCollection,
  actUpdateMovieCart,
} from '../../redux/actionCreator/userActions';

import { actUpdateMovieDisplay } from '../../redux/actionCreator/movieActions';

import * as actionTypes from '../../redux/actionTypes/actionTypes';

import './CardMovieDetail.css';

import Button from '../../shared/components/UI/Button';
import { NavLink, useHistory } from 'react-router-dom';

import Backdrop from '../../shared/components/UI/Backdrop';
import { connect } from 'react-redux';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ToggleSwitch from '../../shared/components/UI/ToggleSwitch';

function CardMovieDetail(props) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [showRemoveFromCartBtn, setShowDeleteBtn] = useState(false);
  const [
    showRemoveFromCollectionBtn,
    setShowRemoveFromCollectionBtn,
  ] = useState(false);

  const history = useHistory();

  const {
    movie,
    cardMovieRight,
    onBackdropClick,
    user,
    isLoggined,
    addMovieToCart,
    removeMovieFromCart,
    addMovieToCollection,
    removeMovieFromCollection,
    allowMovieToDisplay,
    isLoading,
    displayedMovieList,
    isAdmin,
  } = props;

  //check to see if movie is in cart or not
  const cartArr = (user && user.cart && Object.values(user.cart)) || [];
  const isAddedToCart =
    cartArr.findIndex((_movie) => _movie.id === movie.id) !== -1;

  //check to see if movie is in collection or not
  const collectionArr =
    (user && user.collection && Object.values(user.collection)) || [];
  const isAddToCollection =
    collectionArr.findIndex((_movie) => _movie.id === movie.id) !== -1;

  //check to see if movie is allow to display  or not
  //only visible with admin
  let foundMovie =
    displayedMovieList &&
    displayedMovieList.find((_movie) => +_movie.id === movie.id);

  let isAllowedToDisplay = !foundMovie ? true : foundMovie.allowedToDisplay;

  return (
    <>
      {showFullOverview && <Backdrop onClick={onBackdropClick} />}

      {showFullOverview && (
        <div
          onClick={() => history.push(`/movie/${movie.id}`)}
          className={`card-movie-poster ${
            cardMovieRight ? 'card-right' : 'card-left'
          }`}>
          <img
            src={`${API_MOVIE_IMAGE_CUSTOM}/w342/${movie.poster_path}`}
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
            backgroundImage: `url('${API_MOVIE_IMAGE_CUSTOM}/w780/${movie.backdrop_path}')`,
          }}
          className='movie-content'>
          <div className={`movie-overview `}>{movie.overview}</div>

          {!showFullOverview && (
            <span
              onClick={() => setShowFullOverview(true)}
              className='movie-read-more'>
              Xem th??m
            </span>
          )}

          {showFullOverview && (
            <span
              onClick={() => setShowFullOverview(false)}
              className='movie-read-more'>
              Thu g???n
            </span>
          )}

          <div className='movie-info'>
            <div className='movie-info--item item-like'>
              <p>L?????t th??ch:</p>
              <span className='movie-statistic '>{movie.vote_count}</span>
              <i className='fa fa-thumbs-up icon-liked'></i>
            </div>
            <div className='movie-info--item item-buy'>
              <p>???? mua:</p>
              <span className='movie-statistic'>
                {movie.popularity.toFixed(0)}
              </span>
              <i className='fa fa-hand-holding-usd icon-buy'></i>
            </div>
            <div className='movie-info--item item-imdb'>
              <p>??i???m:</p>
              <span className='movie-statistic'>{movie.vote_average}</span>
              <span className='IMDb--icon'>IMDb</span>
            </div>
          </div>
          <div
            onMouseLeave={() => setShowLoginRequired(false)}
            className='movie-action'>
            {isLoading && <LoadingSpinner />}

            {isAdmin && !isLoading && (
              <div className='admin-show-display'>
                <span>Cho ph??p hi???n th???</span>
                <ToggleSwitch
                  isChecked={isAllowedToDisplay}
                  onClick={() => allowMovieToDisplay(movie)}
                />
              </div>
            )}

            {!isLoading && !isAddedToCart && (
              <Button
                isFull
                onClick={
                  isLoggined
                    ? () => addMovieToCart(movie)
                    : () => history.push(`/auth`)
                }
                onMouseEnter={() => setShowLoginRequired(true)}
                isGreen>
                <span>
                  Th??m v??o gi??? h??ng <i class='fa fa-shopping-cart '></i>
                </span>
              </Button>
            )}

            {!isLoading && isAddedToCart && (
              <>
                {!isLoading && !showRemoveFromCartBtn && (
                  <Button
                    onMouseEnter={() => setShowDeleteBtn(true)}
                    isDarkblue>
                    <span>
                      ???? th??m v??o gi??? h??ng <i className='fa fa-check'></i>
                    </span>
                  </Button>
                )}

                {showRemoveFromCartBtn && (
                  <Button
                    onMouseLeave={() => setShowDeleteBtn(false)}
                    onClick={() => removeMovieFromCart(movie)}
                    onMouseEnter={() => setShowLoginRequired(true)}
                    isPrimary>
                    <span>
                      Xo?? kh???i gi??? h??ng <i className='fa fa-trash'></i>
                    </span>
                  </Button>
                )}
              </>
            )}

            {!isAddToCollection && (
              <>
                {!isLoading && (
                  <div
                    onClick={() => addMovieToCollection(movie)}
                    className={`btn-add-to-collection`}>
                    <div className='icon-heart'>
                      <i className='fa fa-heart'></i>
                    </div>

                    <div className='add-to-collection-text'>
                      Th??m v??o danh s??ch th??ch
                    </div>
                  </div>
                )}
              </>
            )}

            {isAddToCollection && (
              <>
                {!isLoading && (
                  <div
                    onClick={() => removeMovieFromCollection(movie)}
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
                        ? 'X??a phim kh???i danh s??ch'
                        : '???? th??ch phim n??y'}
                    </div>
                    )
                  </div>
                )}
              </>
            )}

            {!isLoggined && showLoginRequired && (
              <div className='movie-login-require'>
                Xin h??y <NavLink to='/auth'>????ng nh???p</NavLink> ????? ti???p t???c
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
    isLoading: state.userReducer.isLoading,
    isAdmin: state.userReducer.isAdmin,
    displayedMovieList: state.movieReducer.displayedMovieList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToCart: (movie) =>
      dispatch(actUpdateMovieCart(actionTypes.ADD_MOVIE_TO_CART, movie)),

    removeMovieFromCart: (movie) =>
      dispatch(actUpdateMovieCart(actionTypes.REMOVE_MOVIE_FROM_CART, movie)),

    addMovieToCollection: (movie) =>
      dispatch(
        actUpdateMovieCollection(
          actionTypes.ADD_MOVIE_TO_COLLECTION_WHISLIST,
          movie
        )
      ),

    removeMovieFromCollection: (movie) =>
      dispatch(
        actUpdateMovieCollection(
          actionTypes.REMOVIE_MOVIE_FROM_COLLECTION,
          movie
        )
      ),

    allowMovieToDisplay: (movie) => dispatch(actUpdateMovieDisplay(movie)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(CardMovieDetail));
