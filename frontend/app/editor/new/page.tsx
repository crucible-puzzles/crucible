'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../lib/api';

export default function NewPuzzle() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    boardWidth: 5,
    boardHeight: 5
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('crucible_user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create empty puzzle structure
      const totalSquares = formData.boardWidth * formData.boardHeight;
      const solution = '.'.repeat(totalSquares); // All black squares initially

      const response = await axios.post(API_ENDPOINTS.puzzles, {
        title: formData.title,
        board_width: formData.boardWidth,
        board_height: formData.boardHeight,
        solution: solution,
        hints: []
      }, {
        params: { user_id: user.id }
      });

      // Redirect to editor with puzzle ID
      router.push(`/editor/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create puzzle');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">Crucible</Link>
            <span className="nav-link">Welcome, {user.username}</span>
            <Link href="/my-puzzles" className="nav-link">My Puzzles</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ maxWidth: '500px', margin: '40px auto' }}>
          <h1 style={{ fontSize: '14pt', marginBottom: '20px' }}>Create New Puzzle</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Puzzle Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                maxLength={150}
                style={{ width: '100%' }}
                placeholder="Enter puzzle title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Board Width (3-25)</label>
              <input
                type="number"
                value={formData.boardWidth}
                onChange={(e) => setFormData({ ...formData, boardWidth: parseInt(e.target.value) })}
                required
                min={3}
                max={25}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Board Height (3-25)</label>
              <input
                type="number"
                value={formData.boardHeight}
                onChange={(e) => setFormData({ ...formData, boardHeight: parseInt(e.target.value) })}
                required
                min={3}
                max={25}
                style={{ width: '100%' }}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div style={{ marginTop: '20px' }}>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Puzzle'}
              </button>
              {' '}
              <Link href="/">
                <button type="button">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}