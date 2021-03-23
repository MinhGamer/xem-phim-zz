import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderDropdown.css';

export default function HeaderDropdown(props) {
  return (
    <div className='header-dropdown-container'>
      <div className='header-dropdown__list'>
        <NavLink className='header-dropdown__item' to='/collection'>
          <i className='fa fa-film'></i>
          <span>Bộ sưu tập</span>
        </NavLink>

        <div className='header-dropdown__item'>
          <i className='fa fa-user'></i>
          <span>Tài khoản</span>
        </div>

        <div className='header-dropdown__item'>
          <i className='fa fa-sign-out-alt'></i>
          <span>Thoát</span>
        </div>
      </div>
    </div>
  );
}
