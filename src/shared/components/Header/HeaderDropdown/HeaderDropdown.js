import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderDropdown.css';

import { AuthContext } from '../../../context/AuthContext';

export default function HeaderDropdown(props) {
  const auth = useContext(AuthContext);

  return (
    <div className='header-dropdown__list'>
      <NavLink className='header-dropdown__item' to='/collection'>
        <i className='fa fa-film'></i>
        <span>Bộ sưu tập</span>
      </NavLink>

      <NavLink className='header-dropdown__item' to='/account'>
        <i className='fa fa-user'></i>
        <span>Tài khoản</span>
      </NavLink>

      <div onClick={auth.logout} className='header-dropdown__item'>
        <i className='fa fa-sign-out-alt'></i>
        <span>Thoát</span>
      </div>
    </div>
  );
}
