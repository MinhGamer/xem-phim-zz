import React, { useState, useEffect } from 'react';

import './AdminPage.css';

import AllUser from './components/allUser/AllUser';

import LoadingSpinner from '../shared/components/UI/LoadingSpinner';

import useHttp from '../shared/customHooks/useHttp';

import { connect } from 'react-redux';

import { actFetchAllUser } from '../redux/actionCreator/adminActions';
import DashBoard from '../components/dashboard/DashBoard';

import MoviesManagement from './components/moviesManagement/MoviesManagement';

function AdminPage(props) {
  const [navtabIndex, setNavtabIndex] = useState(0);

  const { fetchAllUser } = props;

  const ADMIN_NAVTAB_LIST = [
    {
      label: 'Thống kê',
      icon: <i class='fa fa-chart-line'></i>,
      component: <DashBoard />,
    },
    {
      label: 'Quản lý người dùng',
      icon: <i class='fa fa-users'></i>,
      component: <AllUser />,
    },
    {
      label: 'Quản lý phim',
      icon: <i class='fa fa-film'></i>,
      component: <MoviesManagement />,
    },
  ];

  useEffect(() => {
    fetchAllUser();
  }, []);

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
    fetchAllUser: () => dispatch(actFetchAllUser()),
  };
};

export default connect(null, mapDispatchToProps)(AdminPage);
