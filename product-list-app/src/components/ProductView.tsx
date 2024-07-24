import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/reducers';
import { fetchProducts, editProduct } from '../redux/actions/productActions';
import { fetchComments } from '../redux/actions/commentActions';
import EditProductModal from './EditProductModal';
import Comments from './Comments';
import { AppDispatch } from '../redux/store';

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(p => p.id === parseInt(id!));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchComments(parseInt(id!)));
  }, [dispatch, id]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleBackToList = () => {
    navigate('/');
  };  

  return product ? (
    <div className="p-6 bg-white">
      <button
        onClick={handleBackToList}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4 hover:bg-gray-400"
      >
        Back to Products List
      </button>
      <h1 className="text-4xl font-bold mb-4 text-yellow">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 border border-yellow"
      />
      <p className="text-lg mb-2">Count: <span className="font-semibold">{product.count}</span></p>
      <p className="text-lg mb-2">Size: <span className="font-semibold">{product.size.width}x{product.size.height}</span></p>
      <p className="text-lg mb-4">Weight: <span className="font-semibold">{product.weight}</span></p>
      <button
        onClick={handleEdit}
        className="bg-yellow text-white px-4 py-2 rounded hover:bg-yellow/80"
      >
        Edit
      </button>
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={product}
        onSave={(updatedProduct) => {
          dispatch(editProduct(updatedProduct));
          setIsEditModalOpen(false);
        }}
      />
      <Comments productId={parseInt(id!)} />
    </div>
  ) : (
    <div className="p-6 bg-white text-center">
      <p className="text-lg">Loading...</p>
    </div>
  );
};

export default ProductView;
