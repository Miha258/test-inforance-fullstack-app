import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './redux/store';

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

// Define your action types
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

interface FetchProductsAction extends Action<typeof FETCH_PRODUCTS> {
  payload: Product[];
}

interface AddProductAction extends Action<typeof ADD_PRODUCT> {
  payload: Product;
}

interface DeleteProductAction extends Action<typeof DELETE_PRODUCT> {
  payload: number;
}

interface EditProductAction extends Action<typeof EDIT_PRODUCT> {
  payload: Product;
}

interface FetchCommentsAction extends Action<typeof FETCH_COMMENTS> {
  payload: Comment[];
}

interface AddCommentAction extends Action<typeof ADD_COMMENT> {
  payload: Comment;
}

interface DeleteCommentAction extends Action<typeof DELETE_COMMENT> {
  payload: number;
}

export type ProductAction =
  | FetchProductsAction
  | AddProductAction
  | DeleteProductAction
  | EditProductAction;

export type CommentAction =
  | FetchCommentsAction
  | AddCommentAction
  | DeleteCommentAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
