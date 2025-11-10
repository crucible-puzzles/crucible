'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shakespeareQuotes } from './shakespeare-quotes';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('crucible_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Select random Shakespeare quote
    const randomQuote = shakespeareQuotes[Math.floor(Math.random() * shakespeareQuotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('crucible_user');
    localStorage.removeItem('crucible_token');
    setUser(null);
  };

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="header-content">
            <span className="logo">Crucible</span>
            <Link href="/public-puzzles" className="nav-link">Public Puzzles</Link>
            {user ? (
              <>
                <span className="nav-link">Welcome, {user.username}</span>
                <Link href="/my-puzzles" className="nav-link">My Puzzles</Link>
                <button onClick={handleLogout} style={{color: '#fff', background: 'transparent', border: 'none'}}>
                  logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">login</Link>
                <Link href="/register" className="nav-link">register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h1 className="main-title">Crucible.</h1>
          
          <h2 style={{ fontSize: '14pt', marginBottom: '20px' }}>
            Create and Share Crossword Puzzles
          </h2>
          
          {user ? (
            <div>
              <Link href="/editor/new">
                <button style={{ fontSize: '12pt', padding: '10px 20px' }}>
                  Create New Puzzle
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <p style={{ marginBottom: '20px' }}>
                Please <Link href="/login" style={{ color: '#ff6600' }}>login</Link> or{' '}
                <Link href="/register" style={{ color: '#ff6600' }}>register</Link> to create puzzles
              </p>
            </div>
          )}

          <div style={{ marginTop: '40px', fontSize: '9pt', color: '#828282' }}>
            <p>Simple crossword puzzle creation and sharing</p>
          </div>
          
          <div className="shakespeare-section">
            <div className="quote-box">
              <p className="shakespeare-quote">{quote}</p>
            </div>
            <div className="shakespeare-image">
              <Image
                src="/shakespeare.jpg"
                alt="William Shakespeare"
                width={250}
                height={188}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
