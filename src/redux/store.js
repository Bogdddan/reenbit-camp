// import { configureStore } from "@reduxjs/toolkit";
// import reducers from "./reducers";

// export const store = configureStore({
//     reducer: reducers,
// })


import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  message: 'Hello World',
};

const reducer = (state = initialState, action) => {
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

const store = configureStore({
  reducer,
});

export default store;