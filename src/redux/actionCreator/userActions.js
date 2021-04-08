import {
  DELETE_USER,
  GET_USER,
  SET_ALL_USER,
  SORT_USER,
} from '../actionTypes/actionTypes';

export const actSortUsers = (field) => {
  return {
    type: SORT_USER,
    payload: {
      field,
    },
  };
};

export const actDeleteUser = (userEmail) => {
  return {
    type: DELETE_USER,
    payload: {
      userEmail,
    },
  };
};

export const actGetUser = (userEmail) => {
  return {
    type: GET_USER,
    payload: {
      userEmail,
    },
  };
};

export const actSetAllUser = (allUser) => {
  return {
    type: SET_ALL_USER,
    payload: {
      allUser,
    },
  };
};
