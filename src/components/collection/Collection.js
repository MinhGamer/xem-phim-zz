import React, { useState } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import './Collection.css';

export default function Collection(props) {
  const { status } = props;
  const [show, setShow] = useState(false);
  const history = useHistory();

  //status === null => user did not login
  //status.isDone === true => user add movie to finish collection
  //status.isDone === false => user add movie to wishlist collection

  const collectionStyle =
    status === null
      ? 'collection-normal'
      : status.isDone
      ? 'collection-done'
      : 'collection-wishlist';

  const clickHandler = () => {
    history.push(`/auth`);
  };

  return (
    <>
      <span
        onClick={clickHandler}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => {
          setShow(false);
        }}
        className={`collection-header ${collectionStyle}`}>
        {/* user did not take action on collection */}
        {status === null && (
          <>
            <i className='fa fa-bookmark '></i>
            <span>Bộ sưu tập</span>
          </>
        )}

        {/* user click "Đã xem" */}
        {status && status.isDone && (
          <>
            <i class='fa fa-check movie-is-done'></i>
            <span>Đã xem</span>
          </>
        )}

        {/* user click "Muốn xem" */}
        {status && !status.isDone && (
          <>
            <i class='fa fa-eye '></i>
            <span>Muốn xem</span>
          </>
        )}

        {show && !status && (
          <div className='collection-dropdown'>
            <p className='collection-require-login'>
              Xin hãy <NavLink to='/auth'>đăng nhập</NavLink> để thêm phim vào
              bộ sưu tập
            </p>
          </div>
        )}

        {show && status && (
          <div className='collection-dropdown'>
            <p
              //arg: movieIsDone
              onClick={() => props.onClick(true)}
              className='collection-dropdown--item '>
              Thêm vào danh sách <span>Đã xem</span>
            </p>
            <p
              //arg: movieIsDone
              onClick={() => props.onClick(false)}
              className='collection-dropdown--item'>
              Thêm vào danh sách <span>Muốn xem</span>
            </p>
          </div>
        )}
      </span>
    </>
  );
}
