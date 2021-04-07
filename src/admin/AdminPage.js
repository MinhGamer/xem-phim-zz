import React, { useState } from 'react';

import './AdminPage.css';

import AddMovie from './components/addMovie/AddMovie';
import AddUser from './components/addUser/AddUser';
import AllUser from './components/allUser/AllUser';

const ADMIN_NAVTAB_LIST = [
  { id: 'allUser', label: 'Tất cả người dùng' },
  { id: 'addUser', label: 'Thêm người dùng' },
  { id: 'addMovie', label: 'Đăng phim mới' },
];

const ADMIN_NAVTAB_ITEM = [<AllUser />, <AddUser />, <AddMovie />];

export default function AdminPage() {
  const [navtabIndex, setNavtabIndex] = useState(0);

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
    </div>
  );
}
