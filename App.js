import React, { useState } from 'react';
import './App.css';
import ProductList from './magento/ProductList';
import TestimonialList from './magento/TestimonialList';



const App = () => {
    // const [token, setToken] = useState('');

    return (
      <div className="container">
      <h1>Product List</h1>
      <ProductList />
      <h1>Testimonials</h1>
      <TestimonialList />
  </div>
    );
};

export default App;
