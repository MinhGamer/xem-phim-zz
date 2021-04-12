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
  collection: null,
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
        collection: user.collection,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        token: null,
        user: null,
        isLoggined: false,
        collection: [],
      };
    }

    case ADD_MOVIE_TO_COLLECTION: {
      const { movieId } = action.payload;

      return {
        ...state,
        collection: [],
      };
    }

    case REMOVIE_MOVIE_FROM_COLLECTION: {
      return {
        ...state,
        token: null,
        user: null,
        isLoggined: false,
        collection: [],
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
