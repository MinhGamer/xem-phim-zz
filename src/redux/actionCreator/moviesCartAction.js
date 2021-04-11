import {
  ADD_MOVIE_TO_CART,
  REMOVE_MOVIE,
  MINUS_MOVIE_BY_ONE,
} from '../actionTypes/actionTypes';

export const actAddMovieToCart = (movie) => {
  return {
    type: ADD_MOVIE_TO_CART,
    payload: {
      movie,
    },
  };
};

export const actRemoveMovie = (movie) => {
  return {
    type: REMOVE_MOVIE,
    payload: {
      movie,
    },
  };
};

export const actMinusMovieByOne = (movieId) => {
  return {
    type: MINUS_MOVIE_BY_ONE,
    payload: {
      movieId,
    },
  };
};
