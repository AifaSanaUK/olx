
import React, { createContext, useContext, useEffect, useState } from 'react';
import './Home.css';
import heart from '../../assets/heart.avif'
import { Link } from 'react-router-dom';


const CONTEXT = createContext()
function ContextProvider({ children }) {
    const [count, setcount] = useState(0)
    const incremnt = () => {
        setcount(count + 1)
    }
    const decremnt = () => {
        setcount(count - 1)
    }
    return (
        <CONTEXT.Provider value={{ count, incremnt, decremnt }}>
            {children}
        </CONTEXT.Provider>
    )
}
function Counter() {
    const { count, incremnt, decremnt } = useContext(CONTEXT)
    return (
        <>
            <h1>count:{count}</h1>
            <button onClick={incremnt}>+</button>
            <button onClick={decremnt}>-</button>
        </>
    )
}
function App() {
    return (
        <ContextProvider>
            <Counter />
        </ContextProvider>
    )
}
// --------------------------------------------------------------------------
const categories = [
    'Cars',
    'Motorcycles',
    'Mobile Phones',
    'For Sale: Houses & Apartments',
    'Scooters',
    'Commercial & Other Vehicles',
    'For Rent: Houses & Apartments',
];
// --------------------------------------------------------------------
const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);
    return (
        <div>
            <div className="category-bar">
                <span className="label">ALL CATEGORIES ⌄</span>
                {categories.map((cat, index) => (
                    <span key={index}>{cat}</span>
                ))}
            </div>

            <div className="product-grid">
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) :

                    products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="product-card">
                                <div className="image-container">
                                    <img src={product.imageUrl} alt={product.title} />
                                    <img src={heart} alt="Favorite" className="heart-icon" />
                                </div>
                                <div className="product-details">
                                    <p className="price">₹{product.price.toLocaleString()}</p>
                                    <p className="title">{product.title}</p>
                                    <p className="category">{product.category}</p>
                                    <div className="bottom-row">
                                        <p className="place">{product.place}</p>
                                        <p className="date">
                                            {new Date(product.id).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>


        </div >
    );
};

export default App;
