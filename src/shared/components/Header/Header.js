import React, { useContext, useEffect, useState } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import './Header.css';

import Button from '../UI/Button';

import { AuthContext } from '../../context/AuthContext';

import { LOCAL_STORAGE_KEY } from '../../util/config';

import logo from '../../../assets/image/logo-full.png';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';

import useHttp from '../../customHooks/useHttp';

import CartModal from '../CartModal/CartModal';
import { connect } from 'react-redux';

function Header(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const auth = useContext(AuthContext);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const { sendUser } = useHttp();
  const history = useHistory();

  const { moviesCart } = props;

  const userCollectionArr = auth.user && Object.values(auth.user.collection);

  useEffect(() => {
    const loginUser = async () => {
      const tokenId = localStorage.getItem(LOCAL_STORAGE_KEY);

      // console.log(sendToken);

      if (!tokenId) return;

      const { token, user } = await sendUser('user/g-login', 'POST', null, {
        Authorization: 'Bearer ' + tokenId,
      });

      if (!token) return;

      auth.login(token, user);
    };

    loginUser();
  }, []);

  const renderLogin = () => {
    return (
      <>
        <div
          onClick={() => history.push('/collection')}
          className='user-collection user-icon'>
          <i class='fa fa-film '></i>
          {userCollectionArr.length > 0 && (
            <div className='user-message'>
              <p>{userCollectionArr.length}</p>
            </div>
          )}
        </div>

        <div
          onClick={() => setShowCartModal(true)}
          className='user-cart user-icon'>
          <i class='fa fa-shopping-cart '></i>
          {moviesCart.length > 0 && (
            <div className='user-message'>
              <p>{moviesCart.length}</p>
            </div>
          )}
        </div>

        <NavLink
          to='/user'
          className='navlinks__item fixed'
          onMouseLeave={() => setShowDropdown(false)}>
          <div onMouseEnter={() => setShowDropdown(true)} to='/user'>
            {auth.user.name} {auth.isAdmin ? '(Admin)' : ''}
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
      <CartModal
        closeCartModal={() => setShowCartModal(false)}
        backdropClick={() => setShowCartModal(false)}
        showed={showCartModal}
      />

      <div className='header--wrapper'>
        <NavLink to='/' className='logo'>
          <img src={logo} alt='logo' />
        </NavLink>

        <nav className='navlinks'>
          <NavLink className='navlinks__item' to='/series'>
            Phim series
          </NavLink>
          <NavLink className='navlinks__item' to='/tv'>
            Phim bộ
          </NavLink>
          <NavLink className='navlinks__item' to='/faq'>
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

const mapStateToProps = (state) => {
  return {
    moviesCart: state.moviesCartReducer.moviesCart,
  };
};

export default connect(mapStateToProps, null)(Header);
