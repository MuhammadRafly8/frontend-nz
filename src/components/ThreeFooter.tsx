import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function MovingLines() {
  const group = useRef<any>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.x = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });
  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[i * 0.6 - 2, Math.sin(i) * 0.2, 0]}>
          <boxGeometry args={[0.5, 0.03, 0.03]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#00eaff' : '#1e90ff'} emissive="#00eaff" emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

const ThreeFooter: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ width: '100%', height: 80 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <MovingLines />
    </Canvas>
  );
};

export default ThreeFooter; 