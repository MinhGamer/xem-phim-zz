import React from 'react';

import './UserItem.css';

import { connect } from 'react-redux';

import {
  actDeleteUser,
  actGetUser,
} from '../../../redux/actionCreator/userActions';

function UserItem(props) {
  const { name, email, createdAt, collection } = props.user;
  const { userDetail } = props;

  const deleteHandler = (e) => {
    e.stopPropagation();
    props.deleteUser(email);
  };

  const editHandler = (e) => {
    e.stopPropagation();
    props.getUser(email);
  };

  return (
    <tr
      onClick={() => props.getUser(email)}
      className={`user-item ${
        userDetail && email === userDetail.email ? 'active' : ''
      }`}>
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
        <div onClick={deleteHandler} className='icon-delete icon-config'>
          <i class='fa fa-trash '></i>
          <span> Xóa</span>
        </div>
      </td>
      <td>
        <div onClick={editHandler} className='icon-edit icon-config'>
          <i class='fa fa-pen'></i>
          <span> Sửa</span>
        </div>
      </td>
    </tr>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetail: state.userReducer.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (userEmail) => dispatch(actDeleteUser(userEmail)),
    getUser: (userEmail) => dispatch(actGetUser(userEmail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
