import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import { AppState } from '../store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchComments = createAsyncThunk<Comment[], number, { state: AppState }>(
  'comments/fetchComments',
  async (productId) => {
    const response = await axios.get<Comment[]>(`${API_URL}/comments/${productId}`);
    return response.data;
  }
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>, { state: AppState }>(
  'comments/addComment',
  async (comment) => {
    const response = await axios.post<Comment>(`${API_URL}/comments`, comment);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk<number, number, { state: AppState }>(
  'comments/deleteComment',
  async (id) => {
    await axios.delete(`${API_URL}/comments/${id}`);
    return id;
  }
);
