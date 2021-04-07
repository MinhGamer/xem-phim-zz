import React from 'react';

import './UserItem.css';

import { connect } from 'react-redux';

import {
  actDeleteUser,
  actGetUser,
} from '../../../redux/actionCreator/userActions';

function UserItem(props) {
  const { userId, name, email, createdAt, collection } = props.user;

  console.log(props);

  return (
    <tr className='user-item'>
      <td>{name}</td>
      <td>{email}</td>
      <td>{createdAt}</td>
      <td className='collection-count'>{Object.keys(collection).length}</td>
      <td>
        <div className='icon-goto-collection icon-config'>
          <i class='fa fa-arrow-alt-circle-right'></i>
          <span> Bộ sưu tập</span>
        </div>
      </td>
      <td>
        <div
          onClick={() => props.deleteUser(userId)}
          className='icon-delete icon-config'>
          <i class='fa fa-trash '></i>
          <span> Xóa</span>
        </div>
      </td>
      <td>
        <div
          onClick={() => props.getUser(userId)}
          className='icon-edit icon-config'>
          <i class='fa fa-pen'></i>
          <span> Sửa</span>
        </div>
      </td>
    </tr>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (userId) => dispatch(actDeleteUser(userId)),
    getUser: (userId) => dispatch(actGetUser(userId)),
  };
};

export default connect(null, mapDispatchToProps)(UserItem);
