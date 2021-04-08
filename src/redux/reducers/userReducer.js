import {
  DELETE_USER,
  GET_USER,
  SET_ALL_USER,
} from '../actionTypes/actionTypes';

import { ADMIN_EMAIL } from '../../shared/util/config';

const initialState = {
  allUser: null,
  userDetail: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USER: {
      // remove ADMIN_EMAIL from list
      delete action.payload.allUser[ADMIN_EMAIL];

      return {
        ...state,
        allUser: action.payload.allUser,
      };
    }

    case DELETE_USER: {
      const updateAllUsers = { ...state.allUser };
      delete updateAllUsers[action.payload.userEmail];
      return {
        ...state,
        allUser: updateAllUsers,
      };
    }

    case GET_USER: {
      return {
        ...state,
        userDetail: state.allUser[action.payload.userEmail],
      };
    }

    default:
      return state;
  }
};

export default userReducer;
