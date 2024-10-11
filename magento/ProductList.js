import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = 'http://localhost.magento.com/rest/V1/products?searchCriteria';
  const accessToken = 'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MiwiaWF0IjoxNzI4NjMzMzUyLCJleHAiOjE3Mjg2MzY5NTJ9.eW4DLyumaQGzi2uirOGjz9fBVJjVwRKu9886vokZnwc'; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProducts(response.data.items);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Giá: {product.price} $</p>
            <p>SKU: {product.sku}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
