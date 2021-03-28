import React, { useState } from 'react';

import './Collection.css';

export default function Collection(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => {
          setShow(false);
        }}
        className='collection'>
        <i className='fa fa-bookmark'></i>
        <span>Bộ sưu tập</span>
        {show && (
          <div className='collection-dropdown'>
            <p
              onClick={() => props.onClick('finished')}
              className='collection-dropdown--item'>
              Thêm vào danh sách <span>Đã xem</span>
            </p>
            <p
              onClick={() => props.onClick('wishlist')}
              className='collection-dropdown--item'>
              Thêm vào danh sách <span>Muốn xem</span>
            </p>
          </div>
        )}
      </span>
    </>
  );
}
