import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderDropdown.css';

import { connect } from 'react-redux';

import { actLogoutUser } from '../../../../redux/actionCreator/userActions';

function HeaderDropdown(props) {
  const { isAdmin } = props;

  return (
    <div className='header-dropdown__list'>
      {isAdmin && (
        <NavLink className='header-dropdown__item' to='/admin'>
          <i class='fa fa-user-cog'></i>
          <span>Quản lý người dùng</span>
        </NavLink>
      )}

      <NavLink className='header-dropdown__item' to='/collection'>
        <i className='fa fa-film'></i>
        <span>Bộ sưu tập</span>
      </NavLink>

      <NavLink className='header-dropdown__item' to='/account'>
        <i class='fa fa-history'></i>
        <span>Lịch sử mua hàng</span>
      </NavLink>

      <div onClick={() => props.logoutUser()} className='header-dropdown__item'>
        <i className='fa fa-sign-out-alt'></i>
        <span>Thoát</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.userReducer.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actLogoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDropdown);
