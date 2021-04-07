import React from 'react';

import './UserItem.css';

export default function UserItem(props) {
  const { name, email, createdAt, collection } = props.user;

  return (
    <tr className='user-item'>
      <td>{name}</td>
      <td>{email}</td>
      <td>{createdAt}</td>
      <td></td>
      <td>{collection.length}</td>
      <td>
        <div className='icon-delete icon-config'>
          <i class='fa fa-trash '></i>
          <span> Xóa</span>
        </div>
      </td>
      <td>
        <div className='icon-edit icon-config'>
          <i class='fa fa-pen'></i>
          <span> Sửa</span>
        </div>
      </td>
    </tr>
  );
}
