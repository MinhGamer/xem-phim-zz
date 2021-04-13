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
    type: actionTypes.USER_SEND_API_START,
  };
};

const sendApiSuccess = () => {
  return {
    type: actionTypes.USER_SEND_API_SUCCESS,
  };
};

const sendApiFail = () => {
  return {
    type: actionTypes.USER_SEND_API_FAIL,
  };
};

const adddMovieToCart = (movie) => {
  return {
    type: actionTypes.ADD_MOVIE_TO_CART,
    payload: {
      movie,
    },
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

export const actLoginUser = (tokenId, user) => {
  return async (dispatch) => {
    dispatch(sendApiStart());

    try {
      const { token, user } = await sendUser('user/login', 'POST', null, {
        Authorization: 'Bearer ' + tokenId,
      });

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

    console.log(tokenId);

    try {
      const { token, user } = await sendUser('user/g-login', 'POST', null, {
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

    switch (type) {
      case actionTypes.ADD_MOVIE_TO_COLLECTION:
        updateCollection[movie.id] = { ...movie, isDone: false };
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
      await sendUser(
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
      await sendUser(
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
      await sendUser(
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
      const { token, user } = await sendUser(
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

export const actAddMovieToCart = (movie) => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());

    const { user, token } = getState().userReducer;

    console.log({ user, token });

    if (user.cart[movie.id]) {
      //movie is already in cart
      user.cart[movie.id].quantity += 1;
    } else {
      //movie is NOT in cart

      user.cart[movie.id] = { ...movie, quantity: 1 };
    }

    try {
      const data = await sendUser(
        'user/cart',
        'PATCH',
        JSON.stringify({ cart: user.cart }),
        {
          Authorization: 'Bearer ' + token,
        }
      );

      dispatch(adddMovieToCart(movie));
      dispatch(sendApiSuccess);
      console.log(data);
    } catch (err) {
      console.log(err);

      dispatch(sendApiFail());
    }
  };
};

export const actRemoveMovieFromCart = (movie) => {
  return {
    type: actionTypes.REMOVE_MOVIE_FROM_CART,
    payload: {
      movie,
    },
  };
};

export const actMinusMovieByOneFromCart = (movie) => {
  return {
    type: actionTypes.MINUS_MOVIE_BY_ONE_FROM_CART,
    payload: {
      movie,
    },
  };
};
