import * as actionTypes from '../actionTypes/actionTypes';

import { API_USER } from '../../shared/util/config';

const sendUser = async (uri, method = 'GET', body = null, headers) => {
  try {
    const res = await fetch(`${API_USER}/${uri}`, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    const resData = await res.json();

    return resData;
  } catch (err) {
    throw err;
  }
};

const sendApiStart = () => {
  return {
    type: actionTypes.SEND_API_START,
  };
};

const sendApiSuccess = () => {
  return {
    type: actionTypes.SEND_API_SUCCESS,
  };
};

const sendApiFail = () => {
  return {
    type: actionTypes.SEND_API_FAIL,
  };
};

export const actSortUsers = (field) => {
  return {
    type: actionTypes.SORT_USER,
    payload: {
      field,
    },
  };
};

export const actDeleteUser = (userEmail) => {
  return {
    type: actionTypes.DELETE_USER,
    payload: {
      userEmail,
    },
  };
};

export const actGetUser = (userEmail) => {
  return {
    type: actionTypes.GET_USER,
    payload: {
      userEmail,
    },
  };
};

export const actFetchAllUser = () => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());

    const { token } = getState().userReducer;

    try {
      const data = await sendUser('user/all', 'GET', null, {
        Authorization: 'Bearer ' + token,
      });

      dispatch(sendApiSuccess());
      dispatch(fetchAllUser(data.allUser));
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

const fetchAllUser = (allUser) => {
  return {
    type: actionTypes.FETCH_ALL_USER,
    payload: {
      allUser,
    },
  };
};
