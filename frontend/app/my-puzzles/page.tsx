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

export default function MyPuzzles() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('crucible_user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchPuzzles(parsedUser.id);
  }, [router]);

  const fetchPuzzles = async (userId: number) => {
    try {
      const response = await axios.get(API_ENDPOINTS.userPuzzles(userId));
      setPuzzles(response.data);
    } catch (err: any) {
      setError('Failed to load puzzles');
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = (shareToken: string) => {
    const link = `${window.location.origin}/puzzle/${shareToken}`;
    navigator.clipboard.writeText(link);
    alert('Share link copied to clipboard!');
  };

  const deletePuzzle = async (puzzleId: number, puzzleTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${puzzleTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(API_ENDPOINTS.deletePuzzle(puzzleId, user.id));
      // Remove the deleted puzzle from the list
      setPuzzles(puzzles.filter(p => p.id !== puzzleId));
      alert('Puzzle deleted successfully');
    } catch (err: any) {
      alert('Failed to delete puzzle: ' + (err.response?.data?.detail || err.message));
    }
  };

  const togglePublic = async (puzzleId: number, currentStatus: boolean) => {
    try {
      await axios.patch(API_ENDPOINTS.togglePuzzlePrivacy(puzzleId, user.id, !currentStatus));
      // Update the puzzle in the list
      setPuzzles(puzzles.map(p =>
        p.id === puzzleId ? { ...p, isPublic: !currentStatus } : p
      ));
    } catch (err: any) {
      alert('Failed to update privacy: ' + (err.response?.data?.detail || err.message));
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
            <Link href="/public-puzzles" className="nav-link">Public Puzzles</Link>
            <span className="nav-link">Welcome, {user.username}</span>
            <Link href="/editor/new" className="nav-link">New Puzzle</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ marginTop: '40px' }}>
          <h1 style={{ fontSize: '14pt', marginBottom: '20px' }}>My Puzzles</h1>

          {loading ? (
            <p>Loading puzzles...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : puzzles.length === 0 ? (
            <div>
              <p>You haven't created any puzzles yet.</p>
              <Link href="/editor/new">
                <button style={{ marginTop: '10px' }}>Create Your First Puzzle</button>
              </Link>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #828282' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Title</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Size</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Created</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Public</th>
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
                    <td style={{ padding: '8px' }}>
                      {puzzle.boardWidth}x{puzzle.boardHeight}
                    </td>
                    <td style={{ padding: '8px', fontSize: '9pt', color: '#828282' }}>
                      {new Date(puzzle.createdOn).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={puzzle.isPublic}
                          onChange={() => togglePublic(puzzle.id, puzzle.isPublic)}
                          style={{ marginRight: '5px' }}
                        />
                        <span style={{ fontSize: '9pt' }}>{puzzle.isPublic ? 'Yes' : 'No'}</span>
                      </label>
                    </td>
                    <td style={{ padding: '8px' }}>
                      <button
                        onClick={() => copyShareLink(puzzle.shareToken)}
                        style={{ fontSize: '9pt', padding: '2px 6px' }}
                      >
                        Copy Link
                      </button>
                      {' '}
                      <Link href={`/editor/${puzzle.id}`}>
                        <button style={{ fontSize: '9pt', padding: '2px 6px' }}>Edit</button>
                      </Link>
                      {' '}
                      <button
                        onClick={() => deletePuzzle(puzzle.id, puzzle.title)}
                        style={{ fontSize: '9pt', padding: '2px 6px', color: '#cc0000' }}
                      >
                        Delete
                      </button>
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