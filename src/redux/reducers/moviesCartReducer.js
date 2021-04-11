import {
  ADD_MOVIE_TO_CART,
  REMOVE_MOVIE,
  MINUS_MOVIE_BY_ONE,
} from '../actionTypes/actionTypes';

const initialState = {
  moviesCart: [],
  totalOrderAmount: 0,
  // totalQuantity: 0,
};

const moviesCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE_TO_CART: {
      const updateCart = [...state.moviesCart];
      const { movie } = action.payload;

      const index = updateCart.findIndex((_movie) => _movie.id === movie.id);

      if (index === -1) {
        //add movie to cart
        updateCart.push({ ...movie, quantity: 1 });
      } else {
        //increase quantity
        updateCart[index].quantity++;
      }

      return {
        ...state,
        moviesCart: updateCart,
        totalOrderAmount: state.totalOrderAmount + movie.vote_average,
      };
    }

    case MINUS_MOVIE_BY_ONE: {
      const updateCart = [...state.moviesCart];
      let updateTotalAmount = state.totalOrderAmount;
      const { movieId } = action.payload;

      const index = updateCart.findIndex((movie) => movie.id === movieId);

      if (updateCart[index].quantity === 1) {
        //remove movie from cart
        updateTotalAmount -= updateCart[index].vote_average;
        updateCart.splice(index, 1);
      } else {
        //minus quantity by 1
        updateCart[index].quantity--;
        updateTotalAmount -= updateCart[index].vote_average;
      }

      return {
        ...state,
        moviesCart: updateCart,
        totalOrderAmount: updateTotalAmount,
      };
    }

    case REMOVE_MOVIE: {
      let updateCart = [...state.moviesCart];
      const { movie } = action.payload;

      return {
        ...state,
        moviesCart: updateCart.filter((_movie) => _movie.id !== movie.id),
        totalOrderAmount:
          state.totalOrderAmount - +(movie.quantity * movie.vote_average),
      };
    }

    default:
      return state;
  }
};

export default moviesCartReducer;
