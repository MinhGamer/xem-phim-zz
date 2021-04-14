import React, { useState } from 'react';
import { connect } from 'react-redux';

import './OrderHistory.css';

import CartItem from '../../shared/components/CartModal/CartItem/CartItem';

function OrderHistory(props) {
  const [activeOrderIndex, setActiveOrderIndex] = useState(0);
  const { orderHistory } = props.user;

  const orderHistoryArr = Object.values(orderHistory);

  const orderHistoryKey = Object.keys(orderHistory);

  console.log(orderHistoryArr);
  return (
    <div>
      <div className='order-history-title'>Lịch sử đơn hàng</div>
      <div className='order-history-container'>
        <div className='order-list'>
          {orderHistoryKey.map((orderKey, index) => (
            <div
              className={`order-list-item ${
                activeOrderIndex === index ? 'active' : ''
              }`}
              onClick={() => setActiveOrderIndex(index)}>
              {orderKey}
            </div>
          ))}
        </div>
        <div className='order-detail-item cart-modal'>
          {orderHistoryArr.map((order, index) => {
            const orderArr = Object.values(order);
            return (
              activeOrderIndex === index &&
              orderArr.map((movie) => <CartItem noAction movie={movie} />)
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(OrderHistory);
