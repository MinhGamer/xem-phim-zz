import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_MOVIE_TO_COLLECTION,
  REMOVIE_MOVIE_FROM_COLLECTION,
} from '../actionTypes/actionTypes';

export const actLoginUser = (token, user) => {
  return {
    type: LOGIN_USER,
    payload: {
      token,
      user,
    },
  };
};

export const actAddMovieToCollection = (movie) => {
  return {
    type: ADD_MOVIE_TO_COLLECTION,
    payload: {
      movie,
    },
  };
};

export const actRemoveMovieFromCollection = (movieId) => {
  return {
    type: REMOVIE_MOVIE_FROM_COLLECTION,
    payload: {
      movieId,
    },
  };
};

export const actLogoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
