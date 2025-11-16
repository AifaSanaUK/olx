

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';


import guitar from '../../assets/guita.png';
import love from '../../assets/love.png';
import avatar from '../../assets/avatar.png';
import google from '../../assets/google.png'
import './Login.css';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../Firebase/Firebase';
// ----------------------------------------------------------------------------
const slides = [
    { img: guitar, text: 'Help us become one of the safest place to buy and sell' },
    { img: love, text: 'Close deals from the comfort of your home' },
    { img: avatar, text: 'Keep all your favorite in one place' },
];
// -------------------------------------------------------------------------
const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(0);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleDotClick = (index) => setSlideIndex(index);
    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email });
        navigate('/');
    };
    // -------------------------------------------------------------
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User:', result.user);
            navigate('/')
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="login-modal">
                <button className="close-btn" onClick={() => navigate('/')}>×</button>

                {!showEmailForm ? (
                    <>
                        <div className="slide-content">
                            <img
                                src={slides[slideIndex].img}
                                alt={`Slide ${slideIndex + 1}`}
                                className="slide-image"
                            />
                            <p className="slide-text">{slides[slideIndex].text}</p>
                        </div>

                        <div className="dots-container">
                            {slides.map((_, i) => (
                                <span
                                    key={i}
                                    className={`dot ${i === slideIndex ? 'active' : ''}`}
                                    onClick={() => handleDotClick(i)}
                                />
                            ))}
                        </div>

                        <button className="login-btn phone">📱 Continue with phone</button>

                        <button onClick={handleGoogleSignIn} className="login-btn google">
                            <img src={google} alt="Google logo" />
                            Continue with Google
                        </button>


                        <p className="or">OR</p>
                        <button className="email-login" onClick={() => setShowEmailForm(true)}>Login with Email</button>

                        <p className="privacy-text">
                            All your personal details are safe with us.</p>

                        <p className="privacy-text"> If you continue, you are accepting</p>
                        <a href="" className='tag'> OLX Terms and
                            Conditions and Privacy Policy</a>

                    </>
                ) : (
                    <>
                        <h2>Email Login</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            /><br />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            /><br />
                            <button type="submit">Login</button>
                            <p className="back" onClick={() => setShowEmailForm(false)}>← Back</p>
                        </form>
                    </>
                )}
            </div>
        </div >
    );
};

export default LoginPage;
