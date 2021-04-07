import React, { useEffect, useContext, useState } from 'react';

import './AllUser.css';

import { ADMIN_EMAIL } from '../../../shared/util/config';

import { AuthContext } from '../../../shared/context/AuthContext';

import useHttp from '../../../shared/customHooks/useHttp';

import UserItem from '../userItem/UserItem';

import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

export default function AllUser() {
  const { sendUser, isLoading } = useHttp();
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

    auth.isAdmin && fetchAllUser();
  }, []);

  const renderUserItem = () =>
    Object.values(allUser).map(
      (user) => user.email !== ADMIN_EMAIL && <UserItem user={user} />
    );

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {allUser && !isLoading && (
        <div className='all-user-container'>
          <table className='all-user-table'>
            <thead>
              <th className='user-name'>Tên</th>
              <th className='user-email'>Email</th>
              <th className='user-create-date'>Ngày tạo</th>
              <th>Bộ sưu tập</th>
              <th>Số lượng phim</th>
              <th></th>
              <th></th>
            </thead>
            <tbody>{renderUserItem()}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
