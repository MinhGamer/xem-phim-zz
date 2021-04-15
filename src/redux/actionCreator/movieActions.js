import * as actionTypes from '../actionTypes/actionTypes';

import { API_USER } from '../../shared/util/config';

const sendMovie = async (uri, method = 'GET', body = null, headers) => {
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

export const actUpdateMovieDisplay = (movie) => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());

    let updateDisplayedMovieList = [
      ...getState().movieReducer.displayedMovieList,
    ];

    let index = updateDisplayedMovieList.findIndex(
      (_movie) => +_movie.id === +movie.id
    );

    let updateMovie;
    if (index === -1) {
      updateMovie = { ...movie, allowedToDisplay: false };
      updateDisplayedMovieList = [...updateDisplayedMovieList, updateMovie];
    } else {
      updateMovie = { ...updateDisplayedMovieList[index] };

      updateMovie.allowedToDisplay = !updateMovie.allowedToDisplay;

      updateDisplayedMovieList[index] = updateMovie;
    }

    try {
      await sendMovie(
        `/movie/${movie.id}`,
        'PATCH',
        JSON.stringify({
          updateMovie,
        })
      );

      dispatch(sendApiSuccess());
      dispatch({
        type: actionTypes.ALLOW_MOVIE_TO_DISPLAY,
        payload: {
          displayedMovieList: updateDisplayedMovieList,
        },
      });
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actFetchDisplayedMovieList = () => {
  return async (dispatch) => {
    dispatch(sendApiStart());

    try {
      const { movies } = await sendMovie(`/movie`);

      dispatch(sendApiSuccess());
      dispatch({
        type: actionTypes.FETCH_DISPLAYED_MOVIE_LIST,
        payload: {
          movies,
        },
      });
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};
