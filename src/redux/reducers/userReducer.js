import {
  DELETE_USER,
  GET_USER,
  SET_ALL_USER,
} from '../actionTypes/actionTypes';

const initialState = {
  allUser: {},
  editUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USER: {
      return {
        ...state,
        allUser: action.payload.allUser,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
      };
    }

    case GET_USER: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
