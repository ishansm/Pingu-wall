import { useEffect, useRef, useState } from 'react';

export default function Canvas() {
  const [codeEditor, setCodeEditor] = useState('');
  const [showCode, setShowCode] = useState(true);
  const iframeRef = useRef(null);

  const createExecutableHTML = (code) => {
    return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; background: #000; }
        canvas { display: block; }
    </style>
</head>
<body>
    ${code.includes('<script>') ? code : `<script>${code}</script>`}
</body>
</html>`;
  };

  return (
    <div style={{
      width: '50%',
      borderRight: '1px solid #333',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '16px', letterSpacing: '2px' }}>
          canvas
        </span>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            background: 'transparent',
            border: '1px solid #f5f5dc',
            color: '#f5f5dc',
            padding: '4px 8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '12px',
            letterSpacing: '1px'
          }}
        >
          {showCode ? 'view' : 'code'}
        </button>
      </div>

      {showCode ? (
        <textarea
          value={codeEditor}
          onChange={(e) => setCodeEditor(e.target.value)}
          placeholder="// Three.js code here - use THREE.Scene(), THREE.WebGLRenderer(), etc."
          style={{
            flex: 1,
            background: '#0f0f0f',
            border: 'none',
            color: '#f5f5dc',
            padding: '1rem',
            fontSize: '16px',
            fontFamily: 'Jost, sans-serif',
            resize: 'none',
            outline: 'none',
            lineHeight: '1.4'
          }}
        />
      ) : (
        <div style={{
          flex: 1,
          background: '#0f0f0f',
          position: 'relative'
        }}>
          {codeEditor ? (
            <iframe
              ref={iframeRef}
              key={codeEditor}
              srcDoc={createExecutableHTML(codeEditor)}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'transparent'
              }}
              sandbox="allow-scripts"
            />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#f5f5dc',
              fontSize: '16px',
              letterSpacing: '1px'
            }}>
              blank canvas
            </div>
          )}
        </div>
      )}
    </div>
  );
}