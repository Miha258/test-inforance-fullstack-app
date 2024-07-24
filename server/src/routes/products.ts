import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

let products: Product[] = [];

router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

router.post('/', (req: Request, res: Response) => {
  const newProduct: Product = { ...req.body, id: Date.now(), comments: [] };
  products.push(newProduct);
  res.json(newProduct);
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  products = products.map(product => product.id === parseInt(id) ? { ...product, ...updatedProduct } : product);
  res.json(updatedProduct);
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  products = products.filter(product => product.id !== parseInt(id));
  res.json({ message: 'Product deleted' });
});

export default router;
