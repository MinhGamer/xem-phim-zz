import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import './Collection.css';

export default function Collection(props) {
  const { status, isLoggedIn } = props;
  const [show, setShow] = useState(false);

  //status === null => user did not login
  //status.isDone === true => user add movie to finish collection
  //status.isDone === false => user add movie to wishlist collection

  useEffect(() => {}, []);
  const collectionStyle =
    status === null
      ? 'collection-normal'
      : status.isDone
      ? 'collection-done'
      : 'collection-wishlist';

  return (
    <>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => {
          setShow(false);
        }}
        className={`collection-header ${collectionStyle}`}>
        {/* dropdown-header */}
        {!status && (
          <>
            <i className='fa fa-bookmark '></i>
            <span>Bộ sưu tập</span>
          </>
        )}

        {/* user click "Đã xem" */}
        {status && status.isDone && (
          <>
            <i class='fa fa-check '></i>
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

        {/* show is a flag to open dropdown */}
        {show && (
          <div className='collection-dropdown'>
            {/* user did not login */}
            {!isLoggedIn && (
              <p className='collection-require-login'>
                Xin hãy <NavLink to='/auth'>đăng nhập</NavLink> để thêm phim vào
                bộ sưu tập
              </p>
            )}

            {/* user already logined */}
            {isLoggedIn && (
              <>
                {/* user did not take action on collection */}

                <p
                  //arg: movieIsDone
                  onClick={() => props.onClick('addDone')}
                  className='collection-dropdown--item '>
                  Thêm vào danh sách <span>Đã xem</span>
                </p>
                <p
                  //arg: movieIsDone
                  onClick={() => props.onClick('addFavorited')}
                  className='collection-dropdown--item'>
                  Thêm vào danh sách <span>Muốn xem</span>
                </p>
              </>
            )}
          </div>
        )}
      </span>

      {isLoggedIn && status && (
        <span
          onClick={() => props.onClick('delete')}
          className={`collection-header collection-delete`}>
          <i class='fa fa-trash '></i>
          <span>Xóa khỏi danh sách</span>
        </span>
      )}
    </>
  );
}
