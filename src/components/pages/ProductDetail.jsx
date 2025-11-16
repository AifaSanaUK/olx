import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find((p) => p.id.toString() === id);
    const currentUser = auth?.currentUser;

    if (!product) return <p>Product not found.</p>;

    const handleDelete = () => {
        if (!currentUser) {
            navigate('/');
            return;
        }



        const updatedProducts = products.filter((p) => p.id.toString() !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        navigate('/');
    };

    const handleEdit = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        navigate(`/edit/${product.id}`);
    };

    return (
        <div className="product-detail-container">
            <div className="left-image-section">
                <div className="image-box">
                    <img src={product.imageUrl} alt={product.title} />
                </div>
                <p className="category-text">Category: {product.category}</p>
            </div>

            <div className="right-info-section">
                <div className="price-box">
                    <h2>₹{product.price?.toLocaleString()}</h2>
                    <p className="title">{product.title}</p>
                    <p className="place">Location: {product.place}</p>
                    <p className="date">
                        Posted on:{' '}
                        {new Date(product.id).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                    <p className="description">{product.description}</p>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <button
                            className="edit-btn"
                            onClick={currentUser ? handleEdit : null}
                            disabled={!currentUser}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            onClick={currentUser ? handleDelete : null}
                            disabled={!currentUser}
                        >
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
