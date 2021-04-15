import React, { useState, useEffect } from 'react';

import './AdminPage.css';

import { useParams, useHistory } from 'react-router-dom';

import AllUser from './components/allUser/AllUser';

import { connect } from 'react-redux';

import { actFetchAllUser } from '../redux/actionCreator/adminActions';
import DashBoard from '../components/dashboard/DashBoard';

import MoviesManagement from './components/moviesManagement/MoviesManagement';

function AdminPage(props) {
  const { item } = useParams();
  const history = useHistory();

  const { fetchAllUser } = props;

  const ADMIN_NAVTAB_LIST = [
    {
      label: 'Thống kê',
      icon: <i class='fa fa-chart-line'></i>,
      item: 'dashboard',
      component: <DashBoard />,
    },
    {
      label: 'Quản lý người dùng',
      icon: <i class='fa fa-users'></i>,
      item: 'users',
      component: <AllUser />,
    },
    {
      label: 'Quản lý phim',
      icon: <i class='fa fa-film'></i>,
      item: 'movies',
      component: <MoviesManagement />,
    },
  ];

  useEffect(() => {
    fetchAllUser();
  }, []);

  const renderNavtabList = () =>
    ADMIN_NAVTAB_LIST.map((navtab) => (
      <div
        onClick={() => history.push(`/admin/${navtab.item}`)}
        className={`navtab-header--item ${
          navtab.item === item ? 'active' : ''
        }`}
        key='navtab.id'>
        {navtab.icon} {navtab.label}
      </div>
    ));

  const renderNavtabItem = () =>
    ADMIN_NAVTAB_LIST.map(
      (navItem) => navItem.item === item && navItem.component
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
    fetchAllUser: () => dispatch(actFetchAllUser()),
  };
};

export default connect(null, mapDispatchToProps)(AdminPage);
