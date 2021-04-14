import React from 'react';
import { connect } from 'react-redux';
import OrderHistory from '../../components/orderHistory/OrderHistory';

import './AccountPage.css';

function Account(props) {
  const { user } = props;

  return (
    <div className='account-container'>
      <div className='account-info text-center'>
        <div className='account-info__name'>{user.name}</div>
        <p>
          Email: <span className='account-info__email'>{user.email}</span>
        </p>
        <p>
          Ngày gia nhập:
          <span className='account-info__join-date'>{user.createdAt}</span>
        </p>

        <div className='account-info__diveded'></div>
      </div>

      <OrderHistory />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
    isAdmin: state.userReducer.isAdmin,
  };
};

export default connect(mapStateToProps)(Account);
