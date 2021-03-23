import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';

import './Header.css';

import Button from '../UI/Button';

import { AuthContext } from '../../context/AuthContext';

import logo from '../../../assets/image/logo-full.png';

export default function Header() {
  const auth = useContext(AuthContext);

  const renderLogin = () => {
    return (
      <div className='header__user-dropdown'>
        <NavLink className='navlinks__item' to='/user'>
          {auth.user.name}
          <i class='fa fa-chevron-down arrow-expand'></i>
        </NavLink>
      </div>
    );
  };

  console.log(auth.user);

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
        {!auth.isLoggedIn && <Button isPrimary>Đăng nhập</Button>}

        {auth.isLoggedIn && renderLogin()}
      </div>
    </header>
  );
}
