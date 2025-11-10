'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { API_ENDPOINTS } from '../../lib/api';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Save user data and token
      localStorage.setItem('crucible_user', JSON.stringify(response.data.user));
      localStorage.setItem('crucible_token', response.data.token);

      // Redirect to home
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">Crucible</Link>
            <Link href="/login" className="nav-link">login</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
          <h1 style={{ fontSize: '14pt', marginBottom: '20px' }}>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                minLength={3}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                style={{ width: '100%' }}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div style={{ marginTop: '20px' }}>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </div>
          </form>

          <div style={{ marginTop: '20px', fontSize: '9pt' }}>
            Already have an account? <Link href="/login" style={{ color: '#ff6600' }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}