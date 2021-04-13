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

// const signUpUser = (name, email, password) => {
//   return {
//     type: actionTypes.LOGIN_USER,
//     payload: {
//       name,
//       email,
//       password,
//     },
//   };
// };

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

    try {
      const { token, user } = await sendUser('user/g-login', 'POST', null, {
        Authorization: 'Bearer ' + tokenId,
      });

      dispatch(sendApiSuccess());
      dispatch(loginUser(token, user));
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actAddMovieToCollection = (movie) => {
  return {
    type: actionTypes.ADD_MOVIE_TO_COLLECTION,
    payload: {
      movie,
    },
  };
};

export const actRemoveMovieFromCollection = (movieId) => {
  return {
    type: actionTypes.REMOVIE_MOVIE_FROM_COLLECTION,
    payload: {
      movieId,
    },
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
