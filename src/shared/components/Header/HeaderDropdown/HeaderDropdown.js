import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderDropdown.css';

import { AuthContext } from '../../../context/AuthContext';
import { connect } from 'react-redux';

import { actLogoutUser } from '../../../../redux/actionCreator/userActions';

function HeaderDropdown(props) {
  const auth = useContext(AuthContext);

  return (
    <div className='header-dropdown__list'>
      {auth.isAdmin && (
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
        <i className='fa fa-user'></i>
        <span>Tài khoản</span>
      </NavLink>

      <div onClick={() => props.logoutUser()} className='header-dropdown__item'>
        <i className='fa fa-sign-out-alt'></i>
        <span>Thoát</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actLogoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(HeaderDropdown);
