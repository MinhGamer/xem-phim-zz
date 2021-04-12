import * as actionTypes from '../actionTypes/actionTypes';

export const actLoginUser = (token, user) => {
  return {
    type: actionTypes.LOGIN_USER,
    payload: {
      token,
      user,
    },
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

export const actAddMovieToCart = (movie) => {
  return {
    type: actionTypes.ADD_MOVIE_TO_CART,
    payload: {
      movie,
    },
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
