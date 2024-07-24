import express, { Request, Response } from 'express';
import { Comment } from '../models/comment';

const router = express.Router();

let comments: Comment[] = [];
router.get('/:productId', (req: Request, res: Response) => {
  const { productId } = req.params;
  const productComments = comments.filter(comment => comment.productId === parseInt(productId));
  res.json(productComments);
});

router.post('/', (req: Request, res: Response) => {
  const newComment: Comment = { ...req.body, id: Date.now() };
  comments.push(newComment);
  res.json(newComment);
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  comments = comments.filter(comment => comment.id !== parseInt(id));
  res.json({ message: 'Comment deleted' });
});

export default router;