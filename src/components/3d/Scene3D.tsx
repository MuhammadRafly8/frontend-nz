import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function NewsGlobe(props: { position?: [number, number, number] }) {
  const meshRef = useRef<import('three').Mesh>(null!)
  
  // Animasi rotasi
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        color="#0066cc" 
        metalness={0.5}
        roughness={0.2}
        emissive="#003366"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function FloatingNews({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<import('three').Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animasi mengambang
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.7, 0.05]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div className="w-full h-[50vh] md:h-[70vh]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NewsGlobe position={[0, 0, 0]} />
          
          {/* Berita mengambang di sekitar globe */}
          <FloatingNews position={[2, 0.5, 0]} />
          <FloatingNews position={[-2, -0.5, 0]} />
          <FloatingNews position={[1, -1.5, 1]} />
          <FloatingNews position={[-1, 1.5, -1]} />
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}