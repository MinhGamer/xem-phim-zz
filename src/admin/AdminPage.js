import React, { useState, useEffect, useContext } from 'react';

import './AdminPage.css';

import AddMovie from './components/userForm/UserForm';
import UserForm from './components/userForm/UserForm';
import AllUser from './components/allUser/AllUser';
import UserDetail from './components/userDetail/UserDetail';

import { AuthContext } from '../shared/context/AuthContext';

import LoadingSpinner from '../shared/components/UI/LoadingSpinner';

import useHttp from '../shared/customHooks/useHttp';

const ADMIN_NAVTAB_LIST = [
  { id: 'allUser', label: 'Tất cả người dùng' },
  { id: 'addUser', label: 'Thêm người dùng' },
  { id: 'addMovie', label: 'Đăng phim mới' },
];

export default function AdminPage() {
  const [navtabIndex, setNavtabIndex] = useState(0);
  const [userDetail, setUserDetail] = useState(null);
  const [allUser, setAllUser] = useState(null);
  const auth = useContext(AuthContext);
  const { sendUser, isLoading } = useHttp();

  const ADMIN_NAVTAB_ITEM = [
    <>
      {isLoading && <LoadingSpinner />}
      {allUser && <AllUser allUser={allUser} />}
    </>,
    <UserForm />,
    <AddMovie />,
  ];

  useEffect(() => {
    const fetchAllUser = async () => {
      const data = await sendUser('user/all', 'GET', null, {
        Authorization: 'Bearer ' + auth.token,
      });

      console.log(data);

      setAllUser(data.allUser);
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
    <div className='admin-container'>
      <div className='search-user '>Tìm kiếm người d</div>
      <div className='navtab-header'>{renderNavtabList()}</div>
      <div className='navtab-item'>{renderNavtabItem()}</div>
      {userDetail && <UserDetail userDetail={userDetail} />}
    </div>
  );
}
