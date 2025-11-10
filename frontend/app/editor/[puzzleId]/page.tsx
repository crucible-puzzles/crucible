'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import EditorBoard from '../../shared/board/editorBoard';
import { API_ENDPOINTS } from '../../../lib/api';

export default function PuzzleEditor() {
  const params = useParams();
  const router = useRouter();
  const puzzleId = params.puzzleId as string;
  
  const [user, setUser] = useState<any>(null);
  const [puzzle, setPuzzle] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [boardContents, setBoardContents] = useState<string[]>([]);
  const [hints, setHints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('crucible_user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    
    if (puzzleId !== 'new') {
      fetchPuzzle();
    } else {
      setLoading(false);
    }
  }, [puzzleId, router]);

  const fetchPuzzle = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.puzzle(puzzleId));
      setPuzzle(response.data);
      setTitle(response.data.title);
      setHints(response.data.hints || []);
    } catch (err) {
      console.error('Error fetching puzzle:', err);
      setMessage('Failed to load puzzle');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setMessage('');

    try {
      const solution = boardContents.join('');
      
      // Convert hints to API format
      const hintsData = hints.map(h => ({
        clue_number: parseInt(h.number),
        direction: h.direction === 'across' ? 'a' : 'd',
        hint_text: h.hint
      }));

      if (puzzle) {
        // Update existing puzzle
        await axios.put(
          API_ENDPOINTS.puzzle(puzzle.id),
          {
            title,
            solution,
            hints: hintsData
          },
          { params: { user_id: user.id } }
        );
        setMessage('Puzzle saved successfully!');
      }
    } catch (err: any) {
      console.error('Error saving puzzle:', err);
      setMessage(err.response?.data?.detail || 'Failed to save puzzle');
    } finally {
      setSaving(false);
    }
  };

  const handleAddHint = () => {
    const newHint = {
      number: (hints.length + 1).toString(),
      direction: 'across',
      hint: ''
    };
    setHints([...hints, newHint]);
  };

  const handleUpdateHint = (index: number, field: string, value: string) => {
    const updatedHints = [...hints];
    updatedHints[index] = { ...updatedHints[index], [field]: value };
    setHints(updatedHints);
  };

  const handleDeleteHint = (index: number) => {
    setHints(hints.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="container"><p style={{ marginTop: '40px' }}>Loading...</p></div>;
  }

  if (!user) {
    return <div className="container"><p style={{ marginTop: '40px' }}>Please log in</p></div>;
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
        <div style={{ marginTop: '40px' }}>
          <h1 style={{ fontSize: '14pt', marginBottom: '20px' }}>
            {puzzle ? 'Edit Puzzle' : 'Create Puzzle'}
          </h1>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', maxWidth: '500px' }}
              placeholder="Puzzle title"
            />
          </div>

          <div style={{ marginTop: '30px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '12pt', marginBottom: '10px' }}>Grid</h2>
            <p style={{ fontSize: '9pt', color: '#666', marginBottom: '10px' }}>
              Use arrow keys to navigate. Type "." to make a square black. Press Tab to switch between horizontal and vertical directions.
            </p>
            <EditorBoard
              boardWidth={puzzle?.boardWidth || 5}
              boardHeight={puzzle?.boardHeight || 5}
              editorMode={true}
              initialStructure={puzzle?.structure || []}
              initialSolution={puzzle?.solution || ''}
              initialHints={hints}
              onBoardContentChange={setBoardContents}
              externalLetter=""
            />
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '12pt', marginBottom: '10px' }}>Hints</h2>
            
            {hints.map((hint, index) => (
              <div key={index} style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  value={hint.number}
                  onChange={(e) => handleUpdateHint(index, 'number', e.target.value)}
                  style={{ width: '60px' }}
                  placeholder="#"
                />
                <select
                  value={hint.direction}
                  onChange={(e) => handleUpdateHint(index, 'direction', e.target.value)}
                  style={{ width: '100px' }}
                >
                  <option value="across">Across</option>
                  <option value="down">Down</option>
                </select>
                <input
                  type="text"
                  value={hint.hint}
                  onChange={(e) => handleUpdateHint(index, 'hint', e.target.value)}
                  style={{ flex: 1 }}
                  placeholder="Hint text"
                />
                <button onClick={() => handleDeleteHint(index)} style={{ padding: '4px 8px' }}>
                  Delete
                </button>
              </div>
            ))}

            <button onClick={handleAddHint} style={{ marginTop: '10px' }}>
              Add Hint
            </button>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button onClick={handleSave} disabled={saving || !title}>
              {saving ? 'Saving...' : 'Save Puzzle'}
            </button>
            {' '}
            <Link href="/my-puzzles">
              <button>Back to My Puzzles</button>
            </Link>
          </div>

          {message && (
            <div style={{ marginTop: '10px' }} className={message.includes('success') ? 'success-message' : 'error-message'}>
              {message}
            </div>
          )}

          {puzzle && (
            <div style={{ marginTop: '30px', padding: '10px', backgroundColor: '#f0f0f0' }}>
              <p style={{ fontSize: '9pt', marginBottom: '5px' }}>
                <strong>Share Link:</strong>
              </p>
              <p style={{ fontSize: '9pt', wordBreak: 'break-all' }}>
                {window.location.origin}/puzzle/{puzzle.shareToken}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/puzzle/${puzzle.shareToken}`);
                  alert('Link copied!');
                }}
                style={{ marginTop: '5px', fontSize: '9pt' }}
              >
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}