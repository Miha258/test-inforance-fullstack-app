import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { AppState } from '../store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchProducts = createAsyncThunk<Product[], void, { state: AppState }>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk<Product, Omit<Product, 'id' | 'comments'>, { state: AppState }>(
  'products/addProduct',
  async (product) => {
    const response = await axios.post<Product>(`${API_URL}/products`, product);
    console.log(response)
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<number, number, { state: AppState }>(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`${API_URL}/products/${id}`);
    return id;
  }
);

export const editProduct = createAsyncThunk<Product, Product, { state: AppState }>(
  'products/editProduct',
  async (product) => {
    const response = await axios.put<Product>(`${API_URL}/products/${product.id}`, product);
    return response.data;
  }
);