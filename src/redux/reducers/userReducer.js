import * as actionTypes from '../actionTypes/actionTypes';

import { ADMIN_EMAIL } from '../../shared/util/config';

const initialState = {
  user: null,
  token: null,
  isLoggined: false,
  isAdmin: false,
  totalOrderAmount: 0,
  isLoading: false,
  isError: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SEND_API_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case actionTypes.USER_SEND_API_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.USER_SEND_API_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.LOGIN_USER: {
      const { token, user } = action.payload;
      return {
        ...state,
        token,
        user,
        isLoggined: token !== null,
        isAdmin: user.email === ADMIN_EMAIL,
      };
    }

    case actionTypes.LOGOUT_USER: {
      return {
        ...state,
        token: null,
        user: null,
        isLoggined: false,
      };
    }

    case actionTypes.ADD_MOVIE_TO_COLLECTION: {
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

    case actionTypes.REMOVIE_MOVIE_FROM_COLLECTION: {
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

    case actionTypes.ADD_MOVIE_TO_CART: {
      const { movie } = action.payload;
      const updateCart = { ...state.user.cart };

      if (updateCart[movie.id]) {
        //movie is already in cart
        updateCart[movie.id].quantity += 1;
      } else {
        //movie is NOT in cart
        updateCart[movie.id] = { ...movie, quantity: 1 };
      }

      return {
        ...state,
        user: {
          ...state.user,
          cart: updateCart,
        },
        totalOrderAmount: state.totalOrderAmount + movie.vote_average,
      };
    }

    case actionTypes.REMOVE_MOVIE_FROM_CART: {
      const { movie } = action.payload;
      const updateCart = { ...state.user.cart };

      delete updateCart[movie.id];

      return {
        ...state,
        user: {
          ...state.user,
          cart: updateCart,
        },
        totalOrderAmount: state.totalOrderAmount - movie.vote_average,
      };
    }

    case actionTypes.MINUS_MOVIE_BY_ONE_FROM_CART: {
      const { movie } = action.payload;
      const updateCart = { ...state.user.cart };

      if (updateCart[movie.id].quantity === 1) {
        delete updateCart[movie.id];
      } else {
        updateCart[movie.id].quantity -= 1;
      }

      return {
        ...state,
        user: {
          ...state.user,
          cart: updateCart,
        },
        totalOrderAmount: state.totalOrderAmount - movie.vote_average,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
