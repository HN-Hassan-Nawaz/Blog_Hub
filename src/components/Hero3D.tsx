'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null!)
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    
    for (let i = 0; i < 5000; i++) {
      const radius = Math.random() * 10 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere />
      <FloatingGeometry />
    </>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
