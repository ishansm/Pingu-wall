import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Compose() {
  const [lines, setLines] = useState(['', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (lines.some(line => !line.trim())) {
      setError('Please fill in all three lines');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/haikus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: lines,
          timestamp: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        })
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      router.push('/');
    } catch (error) {
      setError('Failed to submit haiku');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#f5f5dc',
      fontFamily: 'Jost, sans-serif',
      minHeight: '100vh',
      padding: '2rem',
      fontSize: '14px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          borderBottom: '1px solid #333',
          paddingBottom: '1rem'
        }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: 'normal',
            margin: 0,
            letterSpacing: '2px'
          }}>
            compose
          </h1>
          <Link href="/" style={{
            background: 'transparent',
            border: '1px solid #f5f5dc',
            color: '#f5f5dc',
            padding: '8px 16px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '14px',
            letterSpacing: '1px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            ← back to wall
          </Link>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '4rem' }}>
          <div style={{
            fontSize: '20px',
            color: '#f5f5dc',
            marginBottom: '2rem',
            letterSpacing: '1px'
          }}>
            hi pingu!
          </div>
          
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={line}
                onChange={(e) => {
                  const newLines = [...lines];
                  newLines[i] = e.target.value;
                  setLines(newLines);
                }}
                placeholder={``}
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #333',
                  color: '#f5f5dc',
                  padding: '12px 0',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'transparent',
              border: '1px solid #f5f5dc',
              color: '#f5f5dc',
              padding: '12px 24px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              letterSpacing: '2px',
              marginTop: '2rem',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'submitting...' : 'submit to wall'}
          </button>
        </form>
      </div>
    </div>
  );
}