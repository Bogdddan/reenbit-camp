export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAY_HELLO':
        return {
          ...state,
          message: 'Hello World!',
        };
      default:
        return state;
    }
  };