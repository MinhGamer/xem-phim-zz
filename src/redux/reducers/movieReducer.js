import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
  displayedMovieList: null,
  movieDetail: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALLOW_MOVIE_TO_DISPLAY: {
      return {
        ...state,
        displayedMovieList: action.payload.displayedMovieList,
      };
    }

    case actionTypes.FETCH_DISPLAYED_MOVIE_LIST: {
      return {
        ...state,
        displayedMovieList: action.payload.movies,
      };
    }

    default:
      return state;
  }
};

export default movieReducer;
