import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = ({ token, deleteCartItem }) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState({});

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost.magento.com/rest/V1/carts/mine/items', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data);
            fetchProductImages(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } 
    };

    const fetchProductImages = async (items) => {
        const productResponses = await Promise.all(
            items.map(item => axios.get(`http://localhost.magento.com/rest/V1/products/${item.sku}`))
        );

        const productsWithImages = {};
        productResponses.forEach(res => {
            productsWithImages[res.data.sku] = res.data;
        });
        setProducts(productsWithImages);
    };

    useEffect(() => {
        if (token) fetchCartItems();
    }, [token]);

    const handleDeleteCartItem = async (itemId) => {
        await deleteCartItem(itemId);
        fetchCartItems();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    };

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-grid">
                    <div className="cart-items">
                        {cartItems.map(item => {
                            const product = products[item.sku];
                            const thumbnailUrl = product?.media_gallery_entries?.[0]
                                ? `http://localhost.magento.com/pub/media/catalog/product${product.media_gallery_entries[0].file}`
                                : 'https://via.placeholder.com/100';

                            return (
                                <div key={item.item_id} className="cart-item">
                                    <img src={thumbnailUrl} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h2>{item.name}</h2>
                                        <p>Price: {item.price} $</p>
                                        <p>Qty: {item.qty}</p>
                                        <p>Total: {(item.price * item.qty).toFixed(2)} $</p>
                                    </div>
                                    <button className="remove-button" onClick={() => handleDeleteCartItem(item.item_id)}>
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>Subtotal: {calculateTotal().toFixed(2)} $</p>
                        <h3>Order Total: {calculateTotal().toFixed(2)} $</h3>
                        <div className="cart-actions">
                            <button className="proceed-checkout-button">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
