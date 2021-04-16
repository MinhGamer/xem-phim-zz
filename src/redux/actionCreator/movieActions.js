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

    console.log(updateDisplayedMovieList);

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
          updateMovie,
        },
      });
    } catch (err) {
      dispatch(sendApiFail());
    }
  };
};

export const actAddCommentToMovie = (movie, comment) => {
  return async (dispatch, getState) => {
    dispatch(sendApiStart());

    let updateDisplayedMovieList = getState().movieReducer.displayedMovieList;
    const { name, email } = getState().userReducer.user;
    const { starCount, message } = comment;
    const date = new Date().toISOString();

    const updateComment = {
      name,
      email,
      message,
      starCount,
      date,
    };

    let index = updateDisplayedMovieList.findIndex(
      (_movie) => +_movie.id === +movie.id
    );

    let updateMovie;
    //check if had movie
    if (index === -1) {
      updateMovie = {
        ...movie,
        comments: { [date]: updateComment },
      };
      updateDisplayedMovieList = [...updateDisplayedMovieList, updateMovie];
    } else {
      // check if moive had comment property
      if (updateDisplayedMovieList[index].comments) {
        updateDisplayedMovieList[index].comments[date] = updateComment;
      } else {
        updateDisplayedMovieList[index].comments = { [date]: updateComment };
      }

      updateMovie = updateDisplayedMovieList[index];
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
        type: actionTypes.ADD_COMMENT_TO_MOVIE,
        payload: {
          movies: updateDisplayedMovieList,
          updateMovie,
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

export const actGetMovieDetail = (movieId) => {
  return {
    type: actionTypes.GET_MOVIE_DETAIL,
    payload: {
      movieId,
    },
  };
};
