import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from '../UI/Modal';

import Button from '../UI/Button';

import './CartModal.css';
import CartItem from './CartItem/CartItem';

import ContactForm from '../../../components/contactForm/ContactForm';

import LoadingSpinner from '../../components/UI/LoadingSpinner';

function CartModal(props) {
  const [activeId, setActiveId] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { showed, backdropClick, closeCartModal } = props;

  const { totalOrderAmount, user, isLoading } = props;

  const cartArr = (user && Object.values(user.cart)) || [];

  const calcTotalItem = () => {
    let total = 0;
    cartArr.forEach((item) => (total += item.quantity));
    return total;
  };

  return (
    <>
      {/* cart modal */}
      <Modal
        className='cart-modal'
        backdropClick={backdropClick}
        showed={showed}>
        {!showContactForm && (
          <>
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
                    onCloseCartModal={closeCartModal}
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
                <Button onClick={() => setShowContactForm(true)} isPrimary>
                  ĐẶT MUA
                </Button>
              </div>
            )}
          </>
        )}

        {showContactForm && (
          <>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
              <ContactForm
                onBackToCartClick={() => setShowContactForm(false)}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    totalOrderAmount: state.userReducer.totalOrderAmount,
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
  };
};

export default connect(mapStateToProps, null)(CartModal);
