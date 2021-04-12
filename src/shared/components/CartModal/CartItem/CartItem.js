import React from 'react';
import { connect } from 'react-redux';

import { API_MOVIE_IMAGE } from '../../../util/config';

import {
  actMinusMovieByOneFromCart,
  actRemoveMovieFromCart,
  actAddMovieToCart,
} from '../../../../redux/actionCreator/userActions';

import './CartItem.css';

function CartItem(props) {
  const { movie, minusMovieByOne, removeMovie, addMovie, onClick } = props;

  return (
    <div>
      <div className='cart-item'>
        <div className='item-img'>
          <img
            onClick={onClick}
            src={`${API_MOVIE_IMAGE}/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className='item-title'>
          <p onClick={onClick}>{movie.title}</p>
        </div>

        <div className='item-price'>
          <span className='price-promotion'>${movie.vote_average} </span>
          <p className='price-original'>$29.99</p>
        </div>
        <div className='item-quantity'>
          <i onClick={() => addMovie(movie)} class='fa fa-plus icon-plus'></i>
          <span> {movie.quantity}</span>
          <i
            onClick={() => minusMovieByOne(movie)}
            class='fa fa-minus icon-minus'></i>
        </div>
        <div className='item-total'>
          <span>${(movie.quantity * movie.vote_average).toFixed(1)}</span>
        </div>
        <div className='item-delete'>
          <i onClick={() => removeMovie(movie)} class='fa fa-trash'></i>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    minusMovieByOne: (movieId) => dispatch(actMinusMovieByOneFromCart(movieId)),
    removeMovie: (movie) => dispatch(actRemoveMovieFromCart(movie)),
    addMovie: (movie) => dispatch(actAddMovieToCart(movie)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
