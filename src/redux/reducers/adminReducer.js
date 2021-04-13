import * as actionTypes from '../actionTypes/actionTypes';

import { ADMIN_EMAIL } from '../../shared/util/config';

const initialState = {
  allUser: null,
  userDetail: null,
  sortASC: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_USER: {
      // remove ADMIN_EMAIL from list
      delete action.payload.allUser[ADMIN_EMAIL];

      // const allUserArr = Object.values(action.payload.allUser);

      return {
        ...state,
        allUser: action.payload.allUser,
      };
    }

    case actionTypes.DELETE_USER: {
      let updateAllUsers = [...state.allUser];

      updateAllUsers = updateAllUsers.filter(
        (user) => user.email !== action.payload.userEmail
      );

      return {
        ...state,
        allUser: updateAllUsers,
      };
    }

    case actionTypes.GET_USER: {
      return {
        ...state,
        userDetail: state.allUser[action.payload.userEmail],
      };
    }

    case actionTypes.SORT_USER: {
      const sortUsers = [...state.allUser];
      let updateSortASC = !state.sortASC;

      let compare = null;
      if (action.payload.field === 'colletctionLength') {
        compare = (a, b) => {
          //compare collection length
          const aLength = Object.values(a.collection).length;
          const bLength = Object.values(b.collection).length;

          if (aLength < bLength) {
            return updateSortASC ? -1 : 1;
          }
          if (aLength > bLength) {
            return updateSortASC ? 1 : -1;
          }

          return 0;
        };
      } else {
        compare = (a, b) => {
          if (
            a[action.payload.field].toLowerCase() <
            b[action.payload.field].toLowerCase()
          ) {
            return updateSortASC ? -1 : 1;
          }
          if (
            a[action.payload.field].toLowerCase() >
            b[action.payload.field].toLowerCase()
          ) {
            return updateSortASC ? 1 : -1;
          }

          return 0;
        };
      }

      sortUsers.sort(compare);

      return {
        ...state,
        allUser: sortUsers,
        sortASC: updateSortASC,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
