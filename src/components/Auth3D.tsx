'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null!)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 3
    }
  })

  return (
    <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={[4, 0, -2]}>
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.2}
        wireframe
      />
    </Box>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 1.5
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 4
    }
  })

  return (
    <Torus ref={meshRef} args={[1, 0.3, 16, 32]} position={[-3, 2, -1]}>
      <meshStandardMaterial
        color="#ec4899"
        transparent
        opacity={0.3}
        wireframe
      />
    </Torus>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 1
      meshRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 2
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]} position={[0, -2, 3]}>
      <meshStandardMaterial
        color="#10b981"
        transparent
        opacity={0.25}
        wireframe
      />
    </Sphere>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <AnimatedParticles />
      <FloatingCube />
      <FloatingTorus />
      <FloatingSphere />
    </>
  )
}

export function Auth3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
