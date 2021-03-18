import React from 'react';

import { NavLink } from 'react-router-dom';

import './Header.css';

import Button from '../UI/Button';

import logo from '../../../assets/image/logo-full.png';

export default function Header() {
  return (
    <header className='header'>
      <div className='header--wrapper'>
        <NavLink to='/' className='logo'>
          <img src={logo} alt='logo' />
        </NavLink>
        <nav className='navlinks'>
          <NavLink className='navlinks__item' to='/movie'>
            Phim lẻ
          </NavLink>
          <NavLink className='navlinks__item' to='/show'>
            Phim bộ
          </NavLink>
          <NavLink className='navlinks__item' to='/FQA'>
            FQA
          </NavLink>
          <NavLink to='/search'>
            <i class='fa fa-search'></i> Tìm kiếm
          </NavLink>
        </nav>
      </div>
      <div className='login'>
        <Button isPrimary>Đăng nhập</Button>
      </div>
    </header>
  );
}
