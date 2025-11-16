
import React from 'react';
import { useParams } from 'react-router-dom';


const ProductDetail = () => {
    const { id } = useParams();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find((p) => p.id.toString() === id);
    if (!product) return <p>Product not found.</p>;
    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
                />
            </div>
            <div style={{ flex: 1, marginLeft: '40px' }}>
                <h2>{product.title}</h2>
                <p><strong>Price:</strong> ₹{product.price.toLocaleString()}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Date Posted:</strong> {new Date(product.id).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
