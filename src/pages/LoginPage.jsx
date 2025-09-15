import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'test123') {
      const mockToken = 'mock-jwt-token';
      login(mockToken);
      navigate('/dashboard');
    } else {
      setError('Invalid password. Please use \'test123\'.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-slate-700">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-slate-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter any username (ANYTHING IS FINE)"
            />
          </div>
          <div>
            <label htmlFor="password" class="text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400"
              placeholder="Password is test123"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
