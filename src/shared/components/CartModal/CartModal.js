import React from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import Modal from '../UI/Modal';

import { API_MOVIE_IMAGE } from '../../util/config';

import Button from '../UI/Button';

import {
  actMinusMovieByOne,
  actRemoveMovie,
  actAddMovieToCart,
} from '../../../redux/actionCreator/moviesCartAction';

import './CartModal.css';
import CartItem from './CartItem/CartItem';

function CartModal(props) {
  const { showed, backdropClick, closeCartModal } = props;

  const history = useHistory();

  const {
    moviesCart,
    totalOrderAmount,
    minusMovieByOne,
    removeMovie,
    addMovie,
  } = props;

  const gotoMovieDetailPage = (movieId) => {
    history.push(`/movie/${movieId}`);

    closeCartModal();
  };

  return (
    <>
      <Modal
        className='cart-modal'
        backdropClick={backdropClick}
        showed={showed}>
        <div className='cart-header'>
          <div className='cart-header--title'>Giỏ hàng của bạn</div>
          <div>
            <i onClick={closeCartModal} class='fa fa-times'></i>
          </div>
        </div>
        <div
          className={`cart-list ${
            moviesCart.length > 0 ? 'cart-list-scrollable' : ''
          }`}>
          {moviesCart.length > 0 &&
            moviesCart.map((movie) => (
              <CartItem
                onClick={() => gotoMovieDetailPage(movie.id)}
                movie={movie}
              />
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
