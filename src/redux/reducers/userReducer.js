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
  isPurchased: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_API_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case actionTypes.SEND_API_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.SEND_API_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.LOGIN_USER: {
      const { token, user } = action.payload;

      const userCartArr = Object.values(user.cart);

      let totalOrderAmount = 0;

      if (userCartArr.length > 0) {
        userCartArr.forEach((movie) => {
          totalOrderAmount += movie.quantity * movie.vote_average;
        });
      }

      return {
        ...state,
        token,
        user,
        isLoggined: token !== null,
        isAdmin: user.email === ADMIN_EMAIL,
        totalOrderAmount,
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

    case actionTypes.UPDATE_MOVIE_COLLECTION: {
      return {
        ...state,
        user: {
          ...state.user,
          collection: action.payload.updateCollection,
        },
      };
    }

    case actionTypes.UPDATE_MOVIE_CART: {
      const { updateCart, updateTotalOrderAmount } = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          cart: updateCart,
        },
        totalOrderAmount: updateTotalOrderAmount,
        isPurchased: false,
      };
    }

    case actionTypes.PURCHASE_ITEM_IN_CART: {
      return {
        ...state,
        user: {
          ...state.user,
          orderHistory: action.payload.orderHistory,
          deliveryInfo: action.payload.deliveryInfo,
          cart: {},
        },
        isPurchased: true,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
