import React, { useState } from 'react';

import './AllUser.css';

import { ADMIN_EMAIL, USERS_PER_PAGE } from '../../../shared/util/config';

import UserItem from '../userItem/UserItem';

import { connect } from 'react-redux';

import UserDetail from '../userDetail/UserDetail';

function AllUser(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { allUser } = props;

  const allUserArr = allUser && Object.values(allUser);

  const renderUserItem = () =>
    pagination(allUserArr, currentPage).map(
      (user) =>
        user.email !== ADMIN_EMAIL && <UserItem key={user.userId} user={user} />
    );

  const renderTableHead = () => (
    <>
      <th className='user-name'>Tên</th>
      <th className='user-email'>Email</th>
      <th className='user-create-date'>Ngày tạo</th>
      <th>Số lượng phim</th>
      <th></th>
      <th></th>
      <th></th>
    </>
  );

  const pagination = (users, pageNumber) => {
    const start = (pageNumber - 1) * USERS_PER_PAGE;
    const end = pageNumber * USERS_PER_PAGE;

    return users.slice(start, end);
  };

  const renderPagination = () => {
    const USER_TOTAL_PAGE = Math.ceil(allUserArr.length / USERS_PER_PAGE);

    // console.log(USER_TOTAL_PAGE);
    const renderTotalPages = () => {
      const totalPages = [];
      for (let page = 1; page <= USER_TOTAL_PAGE; page++) {
        totalPages.push(
          <span
            onClick={() => setCurrentPage(page)}
            className={`page-number ${currentPage === page ? 'active' : ''}`}>
            {page}
          </span>
        );
      }

      return totalPages;
    };

    return (
      <div className='all-users-pagination'>
        {/* prev-page */}
        <i
          onClick={() =>
            setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1))
          }
          className={`fa fa-less-than prev-page ${
            currentPage === 1 ? 'disabled' : ''
          }`}></i>

        {renderTotalPages()}

        {/* next-page */}
        <i
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage === USER_TOTAL_PAGE ? USER_TOTAL_PAGE : prevPage + 1
            )
          }
          className={`fa fa-greater-than next-page ${
            currentPage === USER_TOTAL_PAGE ? 'disabled' : ''
          }`}></i>
      </div>
    );
  };

  return (
    <>
      {allUser && (
        <div className='all-user-container'>
          <table className='all-user-table'>
            <thead>{renderTableHead()}</thead>
            <tbody>{renderUserItem()}</tbody>
          </table>

          {renderPagination()}
          <UserDetail />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allUser: state.userReducer.allUser,
  };
};

export default connect(mapStateToProps, null)(AllUser);
