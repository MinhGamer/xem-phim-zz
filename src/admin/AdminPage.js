import React, { useState, useEffect, useContext } from 'react';

import './AdminPage.css';

import AddMovie from './components/userForm/UserForm';
import UserForm from './components/userForm/UserForm';
import AllUser from './components/allUser/AllUser';

import Modal from '../shared/components/UI/Modal';

import { AuthContext } from '../shared/context/AuthContext';

import LoadingSpinner from '../shared/components/UI/LoadingSpinner';

import useHttp from '../shared/customHooks/useHttp';

import { connect } from 'react-redux';

import { actSetAllUser } from '../redux/actionCreator/userActions';

const ADMIN_NAVTAB_LIST = [
  { id: 'allUser', label: 'Tất cả người dùng' },
  { id: 'addUser', label: 'Thêm người dùng' },
  { id: 'addMovie', label: 'Đăng phim mới' },
];

function AdminPage(props) {
  const [navtabIndex, setNavtabIndex] = useState(0);
  const auth = useContext(AuthContext);
  const { sendUser, isLoading } = useHttp();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const ADMIN_NAVTAB_ITEM = [
    <>
      {isLoading && <LoadingSpinner />}

      {!isLoading && <AllUser />}
    </>,
    <UserForm />,
    <AddMovie />,
  ];

  //get token from local storage to login
  useEffect(() => {
    const fetchAllUser = async () => {
      const data = await sendUser('user/all', 'GET', null, {
        Authorization: 'Bearer ' + auth.token,
      });

      console.log(data);

      props.setAllUser(data.allUser);
    };

    auth.isAdmin && fetchAllUser();
  }, [auth.isAdmin]);

  const renderNavtabList = () =>
    ADMIN_NAVTAB_LIST.map((navtab, index) => (
      <div
        onClick={() => setNavtabIndex(index)}
        className={`navtab-header--item ${
          navtabIndex === index ? 'active' : ''
        }`}
        key='navtab.id'>
        {navtab.label}
      </div>
    ));

  const renderNavtabItem = () =>
    ADMIN_NAVTAB_ITEM.map((navItem, index) => navtabIndex === index && navItem);

  return (
    <>
      <div className='admin-container'>
        <div className='navtab-header'>{renderNavtabList()}</div>
        <div className='navtab-item'>{renderNavtabItem()}</div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAllUser: (allUser) => dispatch(actSetAllUser(allUser)),
  };
};

export default connect(null, mapDispatchToProps)(AdminPage);
