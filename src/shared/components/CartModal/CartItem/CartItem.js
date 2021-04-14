import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { API_MOVIE_IMAGE } from '../../../util/config';

import { actUpdateMovieCart } from '../../../../redux/actionCreator/userActions';

import * as actionTypes from '../../../../redux/actionTypes/actionTypes';

import './CartItem.css';

import LoadingSpinner from '../../UI/LoadingSpinner';

function CartItem(props) {
  const history = useHistory();
  const {
    movie,
    minusMovieByOne,
    removeMovie,
    addMovie,
    isLoading,
    activeId,
    setActiveId,
    onCloseCartModal,
    noAction,
  } = props;

  const gotoMovieDetailPage = () => {
    history.push(`/movie/${movie.id}`);

    !noAction && onCloseCartModal();
  };

  return (
    <div>
      <div
        onClick={noAction ? () => {} : () => setActiveId(movie.id)}
        className='cart-item'>
        <div className='item-img'>
          <img
            onClick={gotoMovieDetailPage}
            src={`${API_MOVIE_IMAGE}/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className='item-title'>
          <p onClick={gotoMovieDetailPage}>{movie.title}</p>
        </div>

        <div className='item-price'>
          <span className='price-promotion'>${movie.vote_average} </span>
          <p className='price-original'>$29.99</p>
        </div>
        <div className='item-quantity'>
          {!noAction && (
            <i onClick={() => addMovie(movie)} class='fa fa-plus icon-plus'></i>
          )}
          <span> {movie.quantity}</span>
          {!noAction && (
            <i
              onClick={() => minusMovieByOne(movie)}
              class='fa fa-minus icon-minus'></i>
          )}
        </div>
        <div className='item-total'>
          {isLoading && activeId === movie.id && (
            <LoadingSpinner size='small' />
          )}

          {(!isLoading || activeId !== movie.id) && (
            <span>${(movie.quantity * movie.vote_average).toFixed(1)}</span>
          )}
        </div>
        <div className='item-delete'>
          {!noAction && (
            <i onClick={() => removeMovie(movie)} class='fa fa-trash'></i>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    minusMovieByOne: (movie) =>
      dispatch(
        actUpdateMovieCart(actionTypes.MINUS_MOVIE_BY_ONE_FROM_CART, movie)
      ),

    removeMovie: (movie) =>
      dispatch(actUpdateMovieCart(actionTypes.REMOVE_MOVIE_FROM_CART, movie)),

    addMovie: (movie) =>
      dispatch(actUpdateMovieCart(actionTypes.ADD_MOVIE_TO_CART, movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
