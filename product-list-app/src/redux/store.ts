import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import commentReducer from './reducers/commentReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
