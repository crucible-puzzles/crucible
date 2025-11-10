'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { API_ENDPOINTS } from '../../lib/api';

interface PuzzleItem {
  id: number;
  title: string;
  createdOn: string;
  createdBy: string;
  boardWidth: number;
  boardHeight: number;
  shareToken: string;
  isPublic: boolean;
}

export default function PublicPuzzles() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('crucible_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchPublicPuzzles();
  }, []);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchPublicPuzzles();
  }, [searchQuery]);

  const fetchPublicPuzzles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.publicPuzzles(searchQuery));
      setPuzzles(response.data);
    } catch (err: any) {
      setError('Failed to load public puzzles');
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
            {user ? (
              <>
                <span className="nav-link">Welcome, {user.username}</span>
                <Link href="/my-puzzles" className="nav-link">My Puzzles</Link>
                <Link href="/editor/new" className="nav-link">New Puzzle</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">Login</Link>
                <Link href="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ marginTop: '40px' }}>
          <h1 style={{ fontSize: '14pt', marginBottom: '20px' }}>Public Puzzles</h1>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search by puzzle title or author username..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '10pt',
                border: '1px solid #828282',
                borderRadius: '3px'
              }}
            />
          </div>

          {loading ? (
            <p>Loading puzzles...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : puzzles.length === 0 ? (
            <div>
              <p>No public puzzles found{searchQuery ? ' matching your search' : ''}.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #828282' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Title</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Author</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Size</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Created</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {puzzles.map((puzzle) => (
                  <tr key={puzzle.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '8px' }}>
                      <Link href={`/puzzle/${puzzle.shareToken}`} style={{ color: '#ff6600' }}>
                        {puzzle.title}
                      </Link>
                    </td>
                    <td style={{ padding: '8px', fontSize: '9pt', color: '#828282' }}>
                      {puzzle.createdBy}
                    </td>
                    <td style={{ padding: '8px' }}>
                      {puzzle.boardWidth}x{puzzle.boardHeight}
                    </td>
                    <td style={{ padding: '8px', fontSize: '9pt', color: '#828282' }}>
                      {new Date(puzzle.createdOn).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '8px' }}>
                      <Link href={`/puzzle/${puzzle.shareToken}`}>
                        <button style={{ fontSize: '9pt', padding: '2px 6px' }}>Solve</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}