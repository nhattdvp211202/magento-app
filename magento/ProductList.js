import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ token, updateCartCount }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10; // Số sản phẩm trên mỗi trang

    useEffect(() => {
        const fetchProducts = async (page = 1, pageSize = 10) => {
            try {
                const response = await axios.get(`http://localhost.magento.com/rest/V1/products?searchCriteria[currentPage]=${page}&searchCriteria[pageSize]=${pageSize}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProducts(response.data.items);
                setTotalPages(Math.ceil(response.data.total_count / pageSize));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(currentPage, pageSize);
    }, [token, currentPage]);

    const getProductImageUrl = (product) => {
        if (product.media_gallery_entries && product.media_gallery_entries.length > 0) {
            const imagePath = product.media_gallery_entries[0].file;
            return `http://localhost.magento.com/pub/media/catalog/product${imagePath}`;
        }
        return 'https://via.placeholder.com/100';
    };

    const handleAddToCart = async (product) => {
        if (!token) {
            const userConfirmed = window.confirm('Please log in to add products to cart!');
            if (userConfirmed) {
                window.location.href = '/login';
            }
            return;
        }

        try {
            await axios.post(
                'http://localhost.magento.com/rest/V1/carts/mine/items',
                {
                    cartItem: {
                        sku: product.sku,
                        qty: 1,
                        name: product.name,
                        price: product.price,
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            updateCartCount((prevCount) => prevCount + 1);
            alert(`You added ${product.name} to your shopping cart.`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };

    const handleBuyNow = (productId) => {
        if (!token) {
            const userConfirmed = window.confirm('Please login to purchase product!');
            if (userConfirmed) {
                window.location.href = '/login';
            }
            return;
        }
        console.log(`Buy product ${productId} now`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h2>Products List</h2>
            {products.length === 0 ? (
                <p>There is no product!</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.sku}>
                            <img src={getProductImageUrl(product)} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Price: {product.price} {product.currency_code}$</p>
                            <div className="product-actions">
                                <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
                                <button onClick={() => handleBuyNow(product)} className="buy-now-btn">Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={index + 1 === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
