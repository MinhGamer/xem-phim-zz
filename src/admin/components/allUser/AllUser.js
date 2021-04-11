import React, { useEffect, useState } from 'react';

import './AllUser.css';

import {
  ADMIN_EMAIL,
  USERS_PER_PAGE,
  USERS_PAGINATION_RANGE,
} from '../../../shared/util/config';

import { actSortUsers } from '../../../redux/actionCreator/userActions';

import UserItem from '../userItem/UserItem';

import { connect } from 'react-redux';

import MovieCollectionPage from '../../../pages/collection/MovieCollectionPage';

function AllUser(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const { allUser } = props;

  //set current page to 1 when admin search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const renderUserItem = () =>
    pagination(filterUsersByName(allUser, search), currentPage).map(
      (user) =>
        user.email !== ADMIN_EMAIL && <UserItem key={user.userId} user={user} />
    );

  const clickSortHandler = (field) => {
    setCurrentPage(1);
    props.sortUsersByField(field);
  };

  const renderTableHead = () => {
    const tableHead = [
      { field: 'name', label: 'Tên' },
      { field: 'email', label: 'Email' },
      { field: 'createdAt', label: 'Ngày tạo' },
      { field: 'colletctionLength', label: 'Số lượng phim' },
    ];

    return tableHead.map((header) => (
      <th className={`user-${header.field}`}>
        {header.label}{' '}
        <i
          onClick={() => clickSortHandler(header.field)}
          className='fa fa-sort-alpha-down icon-sort'></i>
      </th>
    ));
  };

  const pagination = (users, pageNumber) => {
    const start = (pageNumber - 1) * USERS_PER_PAGE;
    const end = pageNumber * USERS_PER_PAGE;

    return users.slice(start, end);
  };

  const renderPagination = (users) => {
    const TOTAL_PAGE = Math.ceil(users.length / USERS_PER_PAGE);

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

      //total pages <= USERS_PAGINATION_RANGE + 1
      if (TOTAL_PAGE <= USERS_PAGINATION_RANGE + 2) {
        return (totalPages = createPages(1, TOTAL_PAGE));
      }

      //1. range from 1 to (USERS_PAGINATION_RANGE + 1)
      if (currentPage <= USERS_PAGINATION_RANGE + 1) {
        totalPages = createPages(1, USERS_PAGINATION_RANGE + 1);
        totalPages.push(dots);
        totalPages.push(createPages(TOTAL_PAGE, TOTAL_PAGE));
        return totalPages;
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
        return totalPages;
      }

      // 3. range from TOTAL_PAGE - USERS_PAGINATION_RANGE - 1) to TOTAL_PAGE
      if (currentPage >= TOTAL_PAGE - USERS_PAGINATION_RANGE) {
        totalPages.push(createPages(1, 1));
        totalPages.push(dots);
        totalPages.push(
          ...createPages(TOTAL_PAGE - USERS_PAGINATION_RANGE, TOTAL_PAGE)
        );
        return totalPages;
      }

      // return totalPages;
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

        <span className='page-number-list'>{renderTotalPages()}</span>

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

  const filterUsersByName = (users, keyword) => {
    users = users.filter((user) =>
      user.name.trim().toLowerCase().includes(keyword.toLowerCase())
    );

    return users;
  };

  console.log(props.userDetail);

  return (
    <>
      {allUser && (
        <div className='all-user-container'>
          <div className='search-user'>
            <span className='search-user__title'>Tìm kiếm </span>
            <input
              placeholder='Nhập tên người dùng...'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className='all-user-table'>
            <thead>{renderTableHead()}</thead>
            <tbody>{allUser && renderUserItem()}</tbody>
          </table>

          {renderPagination(filterUsersByName(allUser, search))}

          <div className='user-collection'>
            {props.userDetail && (
              <MovieCollectionPage
                username={props.userDetail.name}
                collection={props.userDetail.collection}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allUser: state.userReducer.allUser,
    userDetail: state.userReducer.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortUsersByField: (field) => dispatch(actSortUsers(field)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUser);
