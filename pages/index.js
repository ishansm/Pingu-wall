import Canvas from '../components/Canvas';
import HaikuWall from '../components/HaikuWall';

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#f5f5dc',
      fontFamily: 'Jost, sans-serif',
      minHeight: '100vh',
      display: 'flex'
    }}>
      <Canvas />
      <HaikuWall />
    </div>
  );
}