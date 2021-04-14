import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { NavLink, useHistory } from 'react-router-dom';

import './Collection.css';

import { actUpdateMovieCollection } from '../../redux/actionCreator/userActions';
import * as actionTypes from '../../redux/actionTypes/actionTypes';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

function Collection(props) {
  const { status, isLoggined, isLoading } = props;
  const [show, setShow] = useState(false);
  const history = useHistory();

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
            {!isLoggined && (
              <p className='collection-require-login'>
                Xin hãy <NavLink to='/auth'>đăng nhập</NavLink> để thêm phim vào
                bộ sưu tập
              </p>
            )}

            {/* user already logined */}
            {isLoggined && (
              <>
                {/* user did not take action on collection */}
                {!isLoading && <LoadingSpinner size='small' />}
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

      {isLoggined && status && (
        <>
          <span
            onClick={() => props.onClick('delete')}
            className={`collection-header collection-delete`}>
            <i class='fa fa-trash '></i>
            <span>Xóa khỏi danh sách</span>
          </span>

          <span
            onClick={() => history.push(`/collection`)}
            className='collection-header collection-normal'>
            <i class='fa fa-arrow-alt-circle-right'></i>
            <span>Đi tới Bộ sưu tập</span>
          </span>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
    isAdmin: state.userReducer.isAdmin,
    isLoading: state.userReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToCart: (movie) =>
      dispatch(
        actUpdateMovieCollection(actionTypes.ADD_MOVIE_TO_COLLECTION, movie)
      ),

    removeMovieFromCart: (movie) =>
      dispatch(
        actUpdateMovieCollection(
          actionTypes.REMOVIE_MOVIE_FROM_COLLECTION,
          movie
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
