import React, { useState, useCallback } from 'react';
import axios from 'axios';

const Signin = React.memo(() => {
    const [empEmail, setEmail] = useState('');
    const [empPassword, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Basic validation
        if (!empEmail || !empPassword) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');
        console.log({ empEmail, empPassword })

        try {
            // Replace with your API endpoint
            const response = await axios.post(
                // `http://localhost:8071/auth/sign-in`,
                // `https://back.vaarat.tech/auth/sign-in`,
                `https://srjprwajp5.execute-api.us-east-1.amazonaws.com/test1/hrms-signin`,
                { empEmail, empPassword }
            );

            // Handle successful login (e.g., store token, redirect)
            console.log('Login successful:', response.data);
            if (response.data.status) {
                setMessage("Login successfull")
            }
            // Example: localStorage.setItem('token', response.data.token);
            // Redirect to dashboard or home page
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [empEmail, empPassword]);

    return (
        <>
            <div className="signin-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="empEmail"
                            value={empEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="empPassword"
                            value={empPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>

            <div>
                {message}
            </div>
        </>
    );
});

export default Signin;