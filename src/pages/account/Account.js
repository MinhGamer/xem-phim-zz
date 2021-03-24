import React, { useContext } from 'react';

import { AuthContext } from '../../shared/context/AuthContext';

import './Account.css';

export default function Account() {
  const auth = useContext(AuthContext);

  const { name, email, createdAt } = auth.user;

  console.log(auth.user);

  return (
    <div className='account-container'>
      <div className='account-info text-center'>
        <div className='account-info__name'>{name}</div>
        <p>
          Email: <span className='account-info__email'>{email}</span>
        </p>
        <p>
          Ngày gia nhập:
          <span className='account-info__join-date'>{createdAt}</span>
        </p>

        <div className='account-info__diveded'></div>
      </div>
    </div>
  );
}
