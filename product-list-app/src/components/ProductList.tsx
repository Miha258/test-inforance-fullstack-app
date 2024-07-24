import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, AppDispatch } from '../redux/store';
import { fetchProducts, deleteProduct } from '../redux/actions/productActions';
import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: AppState) => state.products.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete !== null) {
      dispatch(deleteProduct(productToDelete));
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow">Product List</h1>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-yellow text-white px-4 py-2 rounded mb-6"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md border-yellow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-yellow">{product.name}</h2>
              <p className="text-gray-800 mb-4">Count: {product.count}</p>
              <div className="flex justify-between">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-yellow text-white px-3 py-1 rounded hover:bg-yellow/80"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-yellow text-white px-3 py-1 rounded hover:bg-yellow/80"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <DeleteProductModal
        isOpen={productToDelete !== null}
        onClose={() => setProductToDelete(null)}
        onDelete={confirmDeleteProduct}
      />
    </div>
  );
};

export default ProductList;
