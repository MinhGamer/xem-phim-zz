import React, { useState, useEffect, useContext } from 'react';

import './AdminPage.css';

import AddMovie from './components/userForm/UserForm';
import UserForm from './components/userForm/UserForm';
import AllUser from './components/allUser/AllUser';

import { AuthContext } from '../shared/context/AuthContext';

import LoadingSpinner from '../shared/components/UI/LoadingSpinner';

import useHttp from '../shared/customHooks/useHttp';

import { connect } from 'react-redux';

import { actSetAllUser } from '../redux/actionCreator/userActions';
import DashBoard from '../components/dashboard/DashBoard';

function AdminPage(props) {
  const [navtabIndex, setNavtabIndex] = useState(0);
  const auth = useContext(AuthContext);
  const { sendUser, isLoading } = useHttp();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const ADMIN_NAVTAB_LIST = [
    // { id: 'allUser', label: 'Thống kê' },
    // { id: 'allUser', label: 'Quản lý người dùng' },
    // { id: 'addUser', label: 'Thêm người dùng' },
    // { id: 'addMovie', label: 'Quản lý phim' },

    {
      label: 'Thống kê',
      icon: <i class='fa fa-chart-line'></i>,
      component: <DashBoard />,
    },
    {
      label: 'Quản lý người dùng',
      icon: <i class='fa fa-users'></i>,
      component: (
        <>
          {isLoading && <LoadingSpinner />}
          {!isLoading && <AllUser />}
        </>
      ),
    },
    {
      label: 'Quản lý phim',
      icon: <i class='fa fa-film'></i>,
      component: DashBoard,
    },
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
        {navtab.icon} {navtab.label}
      </div>
    ));

  const renderNavtabItem = () =>
    ADMIN_NAVTAB_LIST.map(
      (navItem, index) => navtabIndex === index && navItem.component
    );

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
