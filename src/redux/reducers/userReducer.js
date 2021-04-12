import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_MOVIE_TO_COLLECTION,
  REMOVIE_MOVIE_FROM_COLLECTION,
} from '../actionTypes/actionTypes';

import { ADMIN_EMAIL } from '../../shared/util/config';

const initialState = {
  user: null,
  token: null,
  isLoggined: false,
  isAdmin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const { token, user } = action.payload;
      return {
        ...state,
        token,
        user,
        isLoggined: token !== null,
        isAdmin: user.email === ADMIN_EMAIL,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        token: null,
        user: null,
        isLoggined: false,
      };
    }

    case ADD_MOVIE_TO_COLLECTION: {
      const { movie } = action.payload;
      const updateCollection = { ...state.user.collection };

      //isDone: false => add to whislist
      updateCollection[movie.id] = { ...movie, isDone: false };

      return {
        ...state,
        user: {
          ...state.user,
          collection: updateCollection,
        },
      };
    }

    case REMOVIE_MOVIE_FROM_COLLECTION: {
      const { movieId } = action.payload;
      let updateCollection = { ...state.user.collection };

      delete updateCollection[movieId];

      return {
        ...state,
        user: {
          ...state.user,
          collection: updateCollection,
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
