import React from 'react';

import './HeaderDropdown.css';

export default function HeaderDropdown(props) {
  return (
    <div className='header-dropdown-container'>
      <div className='header-dropdown__list'>
        <div className='header-dropdown__item'>
          <i className='fa fa-film'></i>
          <span>Bộ sưu tập</span>
        </div>

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
