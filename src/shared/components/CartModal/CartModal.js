import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from '../UI/Modal';

import Button from '../UI/Button';

import './CartModal.css';
import CartItem from './CartItem/CartItem';

function CartModal(props) {
  const [activeId, setActiveId] = useState(false);
  const { showed, backdropClick, closeCartModal } = props;

  const { totalOrderAmount, user } = props;

  const cartArr = (user && Object.values(user.cart)) || [];

  const calcTotalItem = () => {
    let total = 0;
    cartArr.forEach((item) => (total += item.quantity));
    return total;
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
            cartArr.length > 0 ? 'cart-list-scrollable' : ''
          }`}>
          {cartArr.length > 0 &&
            cartArr.map((movie) => (
              <CartItem
                setActiveId={setActiveId}
                activeId={activeId}
                movie={movie}
              />
            ))}

          {cartArr.length === 0 && (
            <div className='cart-empty'>
              Bạn chưa có phim nào trong giỏ hàng !!
            </div>
          )}
        </div>

        {cartArr.length > 0 && (
          <div className='cart-summary'>
            <div>Tổng đơn hàng: </div>
            <div>{calcTotalItem()} phim</div>
            <div>${totalOrderAmount.toFixed(1)}</div>
            <Button isPrimary>ĐẶT MUA</Button>
          </div>
        )}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    totalOrderAmount: state.userReducer.totalOrderAmount,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(CartModal);
