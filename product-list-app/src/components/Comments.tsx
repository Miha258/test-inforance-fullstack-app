import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../redux/store';
import { Comment } from '../types';
import { fetchComments, addComment, deleteComment } from '../redux/actions/commentActions';
import DOMPurify from 'dompurify';

interface CommentsProps {
  productId: number;
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [commentText, setCommentText] = useState<string>('');
  const { comments, loading } = useSelector((state: AppState) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Omit<Comment, 'id'> = {
        productId,
        description: commentText,
        date: new Date().toISOString(),
      };
      dispatch(addComment(newComment));
      setCommentText('');
    }
  };

  const handleDeleteComment = (id: number) => {
    dispatch(deleteComment(id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-yellow">Comments</h2>
      {loading ? (
        <p className="text-gray-600">Loading comments...</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment: Comment) => (
            <li key={comment.id} className="flex items-start border-b border-gray-200 pb-4">
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="bg-yellow text-white text-xs px-2 py-1 rounded hover:bg-yellow/80 mr-4"
              >
                Delete
              </button>
              <div className="flex-1">
                <p
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.description) }}
                />
                <span className="text-gray-500 text-sm">({new Date(comment.date).toLocaleDateString()})</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <textarea
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Add a comment"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded mb-2 resize-none"
        />
        <button
          onClick={handleAddComment}
          className="bg-yellow text-white px-4 py-2 rounded hover:bg-yellow/80"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
