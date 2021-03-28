import React, { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom';

import './Header.css';

import Button from '../UI/Button';

import { AuthContext } from '../../context/AuthContext';

import logo from '../../../assets/image/logo-full.png';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = useContext(AuthContext);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);

  const renderLogin = () => {
    return (
      <>
        <NavLink
          to='/user'
          className='navlinks__item fixed'
          onMouseLeave={() => setShowDropdown(false)}>
          <div onMouseEnter={() => setShowDropdown(true)} to='/user'>
            {auth.user.name}
            <i class='fa fa-chevron-down arrow-expand'></i>
          </div>
          {showDropdown && <HeaderDropdown username={'Minh'} />}
        </NavLink>
      </>
    );
  };

  const changeBackgroundColor = () => {
    //fixed height of navbar
    if (window.scrollY >= 70) {
      setChangeNavbarColor(true);
    } else {
      setChangeNavbarColor(false);
    }
  };

  window.addEventListener('scroll', changeBackgroundColor);

  return (
    <header className={`header ${changeNavbarColor ? 'active' : ''}`}>
      <div className='header--wrapper'>
        <NavLink to='/' className='logo'>
          <img src={logo} alt='logo' />
        </NavLink>

        <nav className='navlinks'>
          <NavLink className='navlinks__item' to='/movie'>
            Phim lẻ
          </NavLink>
          <NavLink className='navlinks__item' to='/tv'>
            Phim bộ
          </NavLink>
          <NavLink className='navlinks__item' to='/FQA'>
            FQA
          </NavLink>
          <NavLink className='navlinks__item fixed' to='/search'>
            <i class='fa fa-search '></i> Tìm kiếm
          </NavLink>
        </nav>
      </div>

      <div className='login'>
        {!auth.isLoggedIn && (
          <NavLink to='/auth'>
            <Button isPrimary>Đăng nhập</Button>
          </NavLink>
        )}

        {auth.isLoggedIn && renderLogin()}
      </div>
    </header>
  );
}
