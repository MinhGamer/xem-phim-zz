import React, { useEffect, useState } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import './Header.css';

import Button from '../UI/Button';

import { LOCAL_STORAGE_KEY } from '../../util/config';

import logo from '../../../assets/image/logo-full.png';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';

import CartModal from '../CartModal/CartModal';
import { connect } from 'react-redux';

import { actLoginWithGoogle } from '../../../redux/actionCreator/userActions';

function Header(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [changeNavbarColor, setChangeNavbarColor] = useState(false);

  const history = useHistory();

  const { user, isLoggined, isAdmin } = props;

  const userCartArr = (user && user.cart && Object.values(user.cart)) || [];

  const userCollectionArr =
    (user && user.collection && Object.values(user.collection)) || [];

  useEffect(() => {
    const loginUserAsync = async () => {
      const tokenId = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!tokenId) return;

      props.loginWithGoogle(tokenId, user);

      // if (!token) return;
    };

    loginUserAsync();
  }, []);

  const renderLogin = () => {
    return (
      <>
        <div
          onClick={() => history.push('/collection')}
          className='user-collection user-icon'>
          <i class='fa fa-film '></i>
          {userCollectionArr && userCollectionArr.length > 0 && (
            <div className='user-message'>
              <p>{userCollectionArr.length}</p>
            </div>
          )}
        </div>

        <div
          onClick={() => setShowCartModal(true)}
          className='user-cart user-icon'>
          <i class='fa fa-shopping-cart '></i>
          {userCartArr.length > 0 && (
            <div className='user-message'>
              <p>{userCartArr.length}</p>
            </div>
          )}
        </div>

        {user && (
          <NavLink
            to='/user'
            className='navlinks__item fixed'
            onMouseLeave={() => setShowDropdown(false)}>
            <div onMouseEnter={() => setShowDropdown(true)} to='/user'>
              {user.name} {isAdmin ? '(Admin)' : ''}
              <i class='fa fa-chevron-down arrow-expand'></i>
            </div>
            {showDropdown && <HeaderDropdown username={'Minh'} />}
          </NavLink>
        )}
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
        {!isLoggined && (
          <NavLink to='/auth'>
            <Button isPrimary>Đăng nhập</Button>
          </NavLink>
        )}

        {isLoggined && renderLogin()}
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
    isAdmin: state.userReducer.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithGoogle: (token, user) => dispatch(actLoginWithGoogle(token, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
