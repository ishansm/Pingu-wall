import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HaikuWall() {
  const [haikus, setHaikus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHaikus();
  }, []);

  const fetchHaikus = async () => {
    try {
      const response = await fetch('/api/haikus');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setHaikus(data);
      setError(null);
    } catch (error) {
      setError('Failed to load haikus');
    } finally {
      setLoading(false);
    }
  };

  const deleteHaiku = async (id) => {
    try {
      const response = await fetch(`/api/haikus?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setHaikus(haikus.filter(h => h._id !== id));
      }
    } catch (error) {
      setError('Failed to delete haiku');
    }
  };

  return (
    <div style={{
      width: '50%',
      marginLeft: '50%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        backgroundColor: '#1a1a1a',
        zIndex: 1
      }}>
        <span style={{ fontSize: '16px', letterSpacing: '2px' }}>
          wall
        </span>
        <Link href="/compose" style={{
          background: 'transparent',
          border: '1px solid #f5f5dc',
          color: '#f5f5dc',
          padding: '4px 8px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '12px',
          letterSpacing: '1px',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          + new
        </Link>
      </div>

      <div style={{ padding: '0', flex: 1, overflowY: 'auto' }}>
        {error && (
          <div style={{
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '1rem',
            margin: '1rem',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#555',
            fontSize: '14px',
            letterSpacing: '1px'
          }}>
            loading...
          </div>
        ) : haikus.length === 0 ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#555',
            fontSize: '14px',
            letterSpacing: '1px'
          }}>
            no haikus yet
          </div>
        ) : (
          haikus.map((haiku, index) => (
            <div
              key={haiku._id}
              style={{
                padding: '1.5rem',
                borderBottom: '1px solid #333',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '11px',
                  color: '#888',
                  letterSpacing: '1px'
                }}>
                  #{haikus.length - index}
                </span>
                <span style={{
                  fontSize: '10px',
                  color: '#666',
                  letterSpacing: '1px'
                }}>
                  {haiku.timestamp}
                </span>
              </div>

              <div style={{
                fontSize: '14px',
                lineHeight: '1.8',
                marginBottom: '0.5rem'
              }}>
                {haiku.text.map((line, i) => (
                  <div key={i} style={{ marginBottom: '0.2rem' }}>
                    {line}
                  </div>
                ))}
              </div>

              <button
                onClick={() => deleteHaiku(haiku._id)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  opacity: '0.5'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.5'}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}