import React, { useState, useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      const user = jwt_decode(token);
      localStorage.setItem('token', token);
      setAuth({ token, user });

      toast.success('Logged in!');
      if (user.role === 'normal') navigate('/dashboard');
      else navigate('/unauthorized'); // Change based on your roles
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-xl rounded-xl bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" className="input w-full" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="input w-full" onChange={handleChange} />
        <button type="submit" className="btn w-full bg-blue-600 text-white" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
