import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      alert('Registration successful. You can now log in. Click the login link and enter your info to continue.');
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
