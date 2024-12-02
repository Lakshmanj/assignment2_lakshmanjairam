import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const token = response.token;
      localStorage.setItem('token', token); 
      onLogin(token);
      alert('Login successful. Please choose to either add a student or course, or view list of students or courses.');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
