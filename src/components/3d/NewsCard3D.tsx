import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'

interface NewsCard3DProps {
  position: [number, number, number]
  title: string
  category: string
  color?: string
}

export default function NewsCard3D({ position, title, category, color = '#ffffff' }: NewsCard3DProps) {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  // Target position for smooth animation
  const targetPos = useRef(new Vector3(...position))
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth position animation when hovered
      if (hovered) {
        targetPos.current.z = position[2] + 0.3
      } else {
        targetPos.current.z = position[2]
      }
      
      // Lerp current position to target position
      meshRef.current.position.lerp(targetPos.current, 0.1)
      
      // Subtle floating animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={clicked ? 1.2 : 1}
      >
        <boxGeometry args={[2, 1, 0.05]} />
        <meshStandardMaterial 
          color={hovered ? '#2a6fdb' : color}
          metalness={0.1}
          roughness={0.3}
        />
        
        {/* Judul Berita */}
        <Text 
          position={[0, 0.1, 0.06]} 
          fontSize={0.12}
          maxWidth={1.8}
          textAlign="center"
          color="#ffffff"
        >
          {title}
        </Text>
        
        {/* Kategori */}
        <Text 
          position={[0, -0.3, 0.06]} 
          fontSize={0.08}
          color="#ffcc00"
        >
          {category}
        </Text>
      </mesh>
    </group>
  )
}