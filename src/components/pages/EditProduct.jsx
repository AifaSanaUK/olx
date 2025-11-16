import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import { toast } from 'react-toastify';
// --------------------------------------------------------------------------------
const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find((p) => p.id.toString() === id);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [place, setPlace] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    useEffect(() => {
        if (product) {
            console.log("loeaded rodu", product)
            setTitle(product.title || '');
            setPrice(product.price || '');
            setDescription(product.description || '');
            setCategory(product.category || '');
            setPlace(product.place || '');
            setPreview(product.imageUrl || '');
        }
    }, [id]);
    // -------------------------------------------------------------
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price || !description || !category || !place) {
            toast.warn("Please fill in all required fields.");
            return;
        }
        const validPrice = isNaN(parseFloat(price)) ? 0 : parseFloat(price);

        const updatedProduct = {
            ...product,
            title: title.trim(),
            price: validPrice,
            description: description.trim(),
            category: category.trim(),
            place: place.trim(),
            imageUrl: image ? preview : product.imageUrl,
        };

        const updatedProducts = products.map((p) =>
            p.id.toString() === id ? updatedProduct : p
        );

        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setSuccess(true);

        setTimeout(() => {
            navigate(`/product/${id}`);
        }, 1500);

    };




    if (!product) return <p>Product not found.</p>;

    return (

        <div className="edit-container">
            <h2>Edit Product</h2>
            {success && <p className="success-msg">Product updated successfully!</p>}

            <form onSubmit={handleSubmit} className="edit-form">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Category:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </label>

                <label>
                    Product Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && <img src={preview} alt="Preview" className="preview-image" />}
                </label>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProduct;
