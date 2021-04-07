import React, { useEffect, useContext, useState } from 'react';

import './AllUser.css';

import { AuthContext } from '../../../shared/context/AuthContext';

import useHttp from '../../../shared/customHooks/useHttp';

import UserItem from '../userItem/UserItem';

export default function AllUser() {
  const { sendUser } = useHttp();
  const [allUser, setAllUser] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchAllUser = async () => {
      const data = await sendUser('user/all', 'GET', null, {
        Authorization: 'Bearer ' + auth.token,
      });

      console.log(data);

      setAllUser(data.allUser);
    };

    fetchAllUser();
  }, []);

  const renderUserItem = () =>
    Object.values(allUser).map((user) => <UserItem user={user} />);

  return (
    allUser && (
      <div className='all-user-container'>
        <table className='all-user-table'>
          <thead>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th>Bộ sưu tập</th>
            <th>Số lượng phim</th>
            <th></th>
            <th></th>
          </thead>
          <tbody>{renderUserItem()}</tbody>
        </table>
      </div>
    )
  );
}
