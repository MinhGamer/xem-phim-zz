import { DELETE_USER } from '../actionTypes/actionTypes';

const initialState = {
  allUser: [],
  editUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
