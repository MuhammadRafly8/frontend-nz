'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Import komponen 3D secara dinamis
const NewsCard3D = dynamic(() => import('@/components/3d/NewsCard3D'), {
  ssr: false
})

export default function NewsSection() {
  return (
    <div className="w-full h-[50vh] relative bg-gray-900">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white">Berita Populer</h2>
      </div>
      
      <div className="w-full h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            <NewsCard3D 
              position={[-2.5, 1, 0]} 
              title="Perkembangan Ekonomi Nasional Triwulan Pertama" 
              category="Ekonomi" 
              color="#3498db"
            />
            
            <NewsCard3D 
              position={[0, 1, -1]} 
              title="Inovasi Teknologi AI Terbaru" 
              category="Teknologi" 
              color="#2ecc71"
            />
            
            <NewsCard3D 
              position={[2.5, 1, 0]} 
              title="Hasil Pertandingan Liga Champions" 
              category="Olahraga" 
              color="#e74c3c"
            />
            
            <NewsCard3D 
              position={[-2.5, -1, 0]} 
              title="Perkembangan Situasi Politik Timur Tengah" 
              category="Internasional" 
              color="#9b59b6"
            />
            
            <NewsCard3D 
              position={[0, -1, -1]} 
              title="Festival Budaya Nusantara 2023" 
              category="Budaya" 
              color="#f39c12"
            />
            
            <NewsCard3D 
              position={[2.5, -1, 0]} 
              title="Tren Gaya Hidup Sehat di Kalangan Milenial" 
              category="Lifestyle" 
              color="#1abc9c"
            />
            
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}