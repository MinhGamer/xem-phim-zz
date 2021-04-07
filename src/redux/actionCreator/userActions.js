import {
  DELETE_USER,
  GET_USER,
  SET_ALL_USER,
} from '../actionTypes/actionTypes';

export const actDeleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: {
      userId,
    },
  };
};

export const actGetUser = (userId) => {
  return {
    type: GET_USER,
    payload: {
      userId,
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
