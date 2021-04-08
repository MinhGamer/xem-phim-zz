import React, { useState } from 'react';

import './AllUser.css';

import {
  ADMIN_EMAIL,
  USERS_PER_PAGE,
  USERS_PAGINATION_RANGE,
} from '../../../shared/util/config';

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
    const TOTAL_PAGE = Math.ceil(allUserArr.length / USERS_PER_PAGE);

    const createPages = (from, to) => {
      const totalPages = [];

      if (from === to) {
        return (
          <span
            onClick={() => setCurrentPage(from)}
            className={`page-number ${currentPage === from ? 'active' : ''}`}>
            {from}
          </span>
        );
      }

      for (let page = from; page <= to; page++) {
        const pageEle = (
          <span
            onClick={() => setCurrentPage(page)}
            className={`page-number ${currentPage === page ? 'active' : ''}`}>
            {page}
          </span>
        );
        totalPages.push(pageEle);
      }

      return totalPages;
    };

    const dots = <span className={`page-dots`}>...</span>;

    const renderTotalPages = () => {
      let totalPages = [];

      //1. range from 1 to (USERS_PAGINATION_RANGE + 1)
      if (currentPage <= USERS_PAGINATION_RANGE + 1) {
        totalPages = createPages(1, USERS_PAGINATION_RANGE + 1);
        totalPages.push(dots);
        totalPages.push(createPages(TOTAL_PAGE, TOTAL_PAGE));
      }

      //2. range from  (USERS_PAGINATION_RANGE + 2) to (TOTAL_PAGE - USERS_PAGINATION_RANGE - 2)
      if (
        currentPage >= USERS_PAGINATION_RANGE + 2 &&
        currentPage < TOTAL_PAGE - USERS_PAGINATION_RANGE
      ) {
        totalPages.push(createPages(1, 1));
        totalPages.push(dots);
        totalPages.push(createPages(currentPage - 1, currentPage + 1));
        totalPages.push(dots);
        totalPages.push(createPages(TOTAL_PAGE, TOTAL_PAGE));
      }

      // 3. range from TOTAL_PAGE - USERS_PAGINATION_RANGE - 1) to TOTAL_PAGE
      if (currentPage >= TOTAL_PAGE - USERS_PAGINATION_RANGE) {
        totalPages.push(createPages(1, 1));
        totalPages.push(dots);
        totalPages.push(
          ...createPages(TOTAL_PAGE - USERS_PAGINATION_RANGE, TOTAL_PAGE)
        );
      }

      return <span className='page-number-list'>{totalPages}</span>;
    };

    return (
      <div className='all-users-pagination'>
        {/* prev-page */}
        <i
          onClick={() =>
            setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1))
          }
          className={`fa fa-less-than arrow-page ${
            currentPage === 1 ? 'disabled' : ''
          }`}></i>

        {renderTotalPages()}

        {/* next-page */}
        <i
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage === TOTAL_PAGE ? TOTAL_PAGE : prevPage + 1
            )
          }
          className={`fa fa-greater-than arrow-page ${
            currentPage === TOTAL_PAGE ? 'disabled' : ''
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
