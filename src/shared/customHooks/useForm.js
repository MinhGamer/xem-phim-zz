import { useReducer, useCallback } from 'react';

// initialState = {
//   inputs: {
//     title: {
//       value: '',
//       isValid: false,
//     },
//     description: {
//       value: '',
//       isValid: false,
//     },
//   },
// };

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let isFormValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (inputId === action.inputId) {
          //set current input valid
          isFormValid = isFormValid && action.isValid;
        } else {
          //set remian inputs valid
          isFormValid = isFormValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,

        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },

        isValid: isFormValid,
      };
    }

    case 'SET_DATA': {
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    }

    default:
      return state;
  }
};

export default function useForm(initialInputs, isFormValid) {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: isFormValid,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
  }, []);

  const setFormData = useCallback((inputData, isValid) => {
    dispatch({ type: 'SET_DATA', inputs: inputData, isValid });
  }, []);

  return { formState, inputHandler, setFormData };
}
