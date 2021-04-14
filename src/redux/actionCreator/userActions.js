import * as actionTypes from '../actionTypes/actionTypes';

import { API_USER } from '../../shared/util/config';

const sendApi = async (uri, method = 'GET', body = null, headers) => {
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

const loginUser = (token, user) => {
  return {
    type: actionTypes.LOGIN_USER,
    payload: {
      token,
      user,
    },
  };
};

export const actLoginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(sendApiStart());

    try {
      //get user info
      const { token, user } = await sendApi(
        'user/login',
        'POST',
        JSON.stringify({ email, password })
      );

      dispatch(sendApiSuccess());
      dispatch(loginUser(token, user));
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actLoginWithGoogle = (tokenId, user) => {
  return async (dispatch) => {
    dispatch(sendApiStart());

    try {
      const { token, user } = await sendApi('user/g-login', 'POST', null, {
        Authorization: 'Bearer ' + tokenId,
      });

      if (!token) {
        dispatch(sendApiFail());
      }

      dispatch(sendApiSuccess());
      dispatch(loginUser(token, user));
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actUpdateMovieCollection = (type, movie) => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());
    const { token, user } = getState().userReducer;
    const updateCollection = { ...user.collection };

    console.log(movie);

    switch (type) {
      case actionTypes.ADD_MOVIE_TO_COLLECTION_WHISLIST:
        updateCollection[movie.id] = { ...movie, isDone: false };
        break;

      case actionTypes.ADD_MOVIE_TO_COLLECTION_FINISHED:
        updateCollection[movie.id] = { ...movie, isDone: true };
        break;

      case actionTypes.REMOVIE_MOVIE_FROM_COLLECTION:
        delete updateCollection[movie.id];
        break;

      case actionTypes.TOGGLE_MOVIE_IN_COLLECTION:
        updateCollection[movie.id].isDone = !updateCollection[movie.id].isDone;
        break;

      default:
        return;
    }

    try {
      await sendApi(
        'user/collection',
        'PATCH',
        JSON.stringify({ collection: updateCollection }),
        {
          Authorization: 'Bearer ' + token,
        }
      );

      dispatch({
        type: actionTypes.UPDATE_MOVIE_COLLECTION,
        payload: {
          updateCollection,
        },
      });
      dispatch(sendApiSuccess());
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actUpdateMovieCart = (type, movie) => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());
    const { token, user } = getState().userReducer;
    const updateCart = { ...user.cart };
    let updateTotalOrderAmount = getState().userReducer.totalOrderAmount;

    switch (type) {
      case actionTypes.ADD_MOVIE_TO_CART:
        if (updateCart[movie.id]) {
          //movie is already in cart
          updateCart[movie.id].quantity += 1;
        } else {
          //movie is NOT in cart
          updateCart[movie.id] = { ...movie, quantity: 1 };
        }
        updateTotalOrderAmount += movie.vote_average;
        break;

      case actionTypes.REMOVE_MOVIE_FROM_CART:
        updateTotalOrderAmount -=
          updateCart[movie.id].quantity * movie.vote_average;
        delete updateCart[movie.id];
        break;

      case actionTypes.MINUS_MOVIE_BY_ONE_FROM_CART:
        if (updateCart[movie.id].quantity === 1) {
          //remove
          delete updateCart[movie.id];
        } else {
          //minus by one
          updateCart[movie.id].quantity -= 1;
        }
        updateTotalOrderAmount -= movie.vote_average;
        break;

      default:
        return;
    }

    try {
      await sendApi(
        'user/cart',
        'PATCH',
        JSON.stringify({ cart: updateCart }),
        {
          Authorization: 'Bearer ' + token,
        }
      );

      dispatch({
        type: actionTypes.UPDATE_MOVIE_CART,
        payload: {
          updateCart,
          updateTotalOrderAmount,
        },
      });
      dispatch(sendApiSuccess());
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actPurchaseItemInCart = (deliveryInfo) => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());

    const { token, user } = getState().userReducer;

    const { cart, orderHistory } = user;

    const date = new Date().toISOString();

    orderHistory[date] = cart;

    try {
      await sendApi(
        'user/order-history',
        'PATCH',
        JSON.stringify({ orderHistory, deliveryInfo }),
        {
          Authorization: 'Bearer ' + token,
        }
      );

      dispatch({
        type: actionTypes.PURCHASE_ITEM_IN_CART,
        payload: {
          orderHistory,
          deliveryInfo,
        },
      });
      dispatch(sendApiSuccess());
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actLogoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

export const actSignUpUser = (newUser) => {
  return async (dispatch) => {
    dispatch(sendApiStart());

    try {
      const { token, user } = await sendApi(
        'user/signup',
        'POST',
        JSON.stringify(newUser)
      );

      dispatch(sendApiSuccess());
      dispatch(loginUser(token, user));
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};
