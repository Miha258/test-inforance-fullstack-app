import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import { fetchComments, addComment, deleteComment } from '../actions/commentActions';

interface CommentState {
  comments: Comment[];
  loading: boolean;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
