import React from 'react';
import { connect } from 'react-redux';

import Modal from '../UI/Modal';

import { API_MOVIE_IMAGE } from '../../util/config';

import Button from '../UI/Button';

import {
  actMinusMovieByOne,
  actRemoveMovie,
  actAddMovieToCart,
} from '../../../redux/actionCreator/moviesCartAction';

import './CartModal.css';

function CartModal(props) {
  const { showed, backdropClick } = props;

  const {
    moviesCart,
    totalOrderAmount,
    minusMovieByOne,
    removeMovie,
    addMovie,
  } = props;

  console.log(moviesCart);

  return (
    <>
      <Modal
        className='cart-modal'
        backdropClick={backdropClick}
        showed={showed}>
        <div
          className={`cart-list ${
            moviesCart.length > 0 ? 'cart-list-scrollable' : ''
          }`}>
          {moviesCart.length > 0 &&
            moviesCart.map((movie, index) => (
              <div className='cart-item'>
                <div className='item-img'>
                  <img
                    src={`${API_MOVIE_IMAGE}/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className='item-title'>
                  <p>{movie.title} </p>
                </div>

                <div className='item-price'>
                  <p className='price-promotion'>$ {movie.vote_average} </p>
                  <p className='price-original'>$ 29.99</p>
                </div>
                <div className='item-quantity'>
                  <i
                    onClick={() => addMovie(movie)}
                    class='fa fa-plus icon-plus'></i>
                  <span> {movie.quantity}</span>
                  <i
                    onClick={() => minusMovieByOne(movie.id)}
                    class='fa fa-minus icon-minus'></i>
                </div>
                <div className='item-total'>
                  $ {(movie.quantity * movie.vote_average).toFixed(1)}
                </div>
                <div className='item-delete'>
                  <i onClick={() => removeMovie(movie)} class='fa fa-trash'></i>
                </div>
              </div>
            ))}

          {moviesCart.length === 0 && (
            <div className='cart-empty'>
              Bạn chưa có phim nào trong giỏ hàng !!
            </div>
          )}
        </div>
        {moviesCart.length > 0 && (
          <div className='cart-summary'>
            <div>Tổng đơn hàng: </div>
            <div>{moviesCart.length} phim</div>
            <div>$ {totalOrderAmount.toFixed(1)}</div>
            <Button isPrimary>ĐẶT MUA</Button>
          </div>
        )}
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    minusMovieByOne: (movieId) => dispatch(actMinusMovieByOne(movieId)),
    removeMovie: (movie) => dispatch(actRemoveMovie(movie)),
    addMovie: (movie) => dispatch(actAddMovieToCart(movie)),
  };
};

const mapStateToProps = (state) => {
  return {
    moviesCart: state.moviesCartReducer.moviesCart,
    totalOrderAmount: state.moviesCartReducer.totalOrderAmount,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
