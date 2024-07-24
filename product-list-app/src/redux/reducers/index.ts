import { combineReducers } from 'redux';
import productReducer from './productReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  products: productReducer,
  comments: commentReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;