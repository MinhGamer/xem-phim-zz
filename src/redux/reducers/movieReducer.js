import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
  displayedMovieList: null,
  movieDetail: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALLOW_MOVIE_TO_DISPLAY: {
      const { updateMovie, displayedMovieList } = action.payload;
      return {
        ...state,
        displayedMovieList,
        movieDetail: updateMovie,
      };
    }

    case actionTypes.GET_MOVIE_DETAIL: {
      const { movieId } = action.payload;

      const movieFound =
        state.displayedMovieList &&
        state.displayedMovieList.find((movie) => +movie.id === +movieId);

      return {
        ...state,
        movieDetail: movieFound || null,
      };
    }

    case actionTypes.FETCH_DISPLAYED_MOVIE_LIST: {
      return {
        ...state,
        displayedMovieList: action.payload.movies,
      };
    }

    case actionTypes.ADD_COMMENT_TO_MOVIE: {
      const { movies, updateMovie } = action.payload;
      return {
        ...state,
        displayedMovieList: movies,
        movieDetail: updateMovie,
      };
    }

    default:
      return state;
  }
};

export default movieReducer;
