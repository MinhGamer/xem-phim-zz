import React from 'react';

import './AllUser.css';

import { ADMIN_EMAIL } from '../../../shared/util/config';

import UserItem from '../userItem/UserItem';

export default function AllUser(props) {
  const { allUser } = props;

  const renderUserItem = () =>
    Object.values(allUser).map(
      (user) => user.email !== ADMIN_EMAIL && <UserItem user={user} />
    );

  console.log(allUser);

  return (
    <>
      <div className='all-user-container'>
        <table className='all-user-table'>
          <thead>
            <th className='user-name'>Tên</th>
            <th className='user-email'>Email</th>
            <th className='user-create-date'>Ngày tạo</th>
            <th>Số lượng phim</th>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>{renderUserItem()}</tbody>
        </table>
      </div>
    </>
  );
}
