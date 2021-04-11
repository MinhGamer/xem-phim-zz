import React, { useState } from 'react';

import './UserItem.css';

import { connect } from 'react-redux';

import Modal from '../../../shared/components/UI/Modal';

import {
  actDeleteUser,
  actGetUser,
} from '../../../redux/actionCreator/adminActions';
import Button from '../../../shared/components/UI/Button';

function UserItem(props) {
  const { name, email, createdAt, collection } = props.user;
  const { userDetail } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteHandler = (e) => {
    e.stopPropagation();
    setConfirmDelete(true);
    // props.deleteUser(email);
  };

  const editHandler = (e) => {
    e.stopPropagation();
    props.getUser(email);
  };

  return (
    <>
      {/* confirm delete Modal */}
      <Modal
        backdropClick={() => setConfirmDelete(false)}
        showed={confirmDelete}>
        <div className='modal-confirm-delete'>
          <div className='modal-confirm-delete modal-header'>
            Xác nhận xóa người dùng
          </div>
          <h1 className='modal-confirm-delete modal-content'>
            <p>Bạn có chắc muốn xóa người dùng này?</p>
            <p>Một khi đã xóa thì sẽ không thể phục hồi</p>
          </h1>
          <div className='modal-confirm-delete modal-footer'>
            <Button onClick={() => props.deleteUser(email)} isPrimary>
              Chắc chắn
            </Button>
            <Button onClick={() => setConfirmDelete(false)} isSecondary>
              Hủy
            </Button>
          </div>
        </div>
      </Modal>

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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (userEmail) => dispatch(actDeleteUser(userEmail)),
    getUser: (userEmail) => dispatch(actGetUser(userEmail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
