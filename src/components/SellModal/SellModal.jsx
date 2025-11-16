import React, { useState } from 'react';
import './SellModal.css';
import { useNavigate } from 'react-router-dom';


const SellModal = ({ onClose }) => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [place, setPlace] = useState(null)
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!place || !place.trim()) newErrors.place = 'Please enter a place name.';

        if (!price.trim() || isNaN(price) || Number(price) <= 0)
            newErrors.price = 'Enter a valid positive price.';
        if (!category) newErrors.category = 'Please select a category.';
        if (!description.trim() || description.length < 10)
            newErrors.description = 'Description must be at least 10 characters.';
        if (!image) newErrors.image = 'Image is required.';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const productData = {
            id: Date.now(),
            title,
            price: parseFloat(price),
            category,
            description,
            place,
            imageUrl: preview,
        };

        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(productData);
        localStorage.setItem('products', JSON.stringify(existingProducts));



        setTitle('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImage(null);
        setPlace('');
        setPreview(null);
        onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="sell-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Sell a Product</h2>

                <form className="sell-form" onSubmit={handleSubmit}>
                    <label>
                        Product Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter product title"
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </label>
                    <label>
                        Place Name:
                        <input
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder="Enter place name"
                        />
                        {errors.place && <span className="error">{errors.place}</span>}
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                        />
                        {errors.price && <span className="error">{errors.price}</span>}
                    </label>

                    <label>
                        Description:
                        <textarea
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </label>

                    <label>
                        Category:
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="vehicles">Vehicles</option>
                        </select>
                        {errors.category && <span className="error">{errors.category}</span>}
                    </label>

                    <label>
                        Product Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {errors.image && <span className="error">{errors.image}</span>}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="image-preview"
                            />
                        )}
                    </label>

                    <button type="submit" className="submit-btn">Post Ad</button>
                </form>
            </div>
        </div>
    );
};

export default SellModal;
