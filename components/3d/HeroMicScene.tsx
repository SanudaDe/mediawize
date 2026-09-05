'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Studio Microphone Mesh Component
 * Designed to resemble a high-end broadcast microphone (Shure SM7B style)
 * with matte black finish, metallic mesh grill, glowing red accent ring, and studio boom arm mount.
 */
function StudioMicrophone() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle interactive hover oscillation & rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.35 + 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08 - 0.1;
    }
    if (ringRef.current) {
      // Pulsing red glow effect
      const material = ringRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Mic Main Cylindrical Body - Matte Dark Metallic */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 2.2, 32]} />
        <meshStandardMaterial
          color="#151821"
          roughness={0.35}
          metalness={0.85}
        />
      </mesh>

      {/* Mic Capsule Top Grill Mesh */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.68, 0.7, 0.8, 32]} />
        <meshStandardMaterial
          color="#222630"
          roughness={0.6}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Mic Dome Top */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.68, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#1A1E26"
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* WizeTV Signature Red Indicator Glow Ring */}
      <mesh ref={ringRef} position={[0, 0.95, 0]}>
        <torusGeometry args={[0.72, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#EC2328"
          emissive="#EC2328"
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>

      {/* Lower Chassis Taper Ring */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.45, 0.3, 32]} />
        <meshStandardMaterial
          color="#0F1219"
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* XLR Connector Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.4, 32]} />
        <meshStandardMaterial
          color="#0A0C10"
          roughness={0.7}
          metalness={0.5}
        />
      </mesh>

      {/* Studio Yoke / U-Mount Support Arm */}
      <group position={[0, -0.2, 0]}>
        {/* Left Arm */}
        <mesh position={[-0.9, 0, 0]}>
          <boxGeometry args={[0.15, 1.4, 0.2]} />
          <meshStandardMaterial color="#1E232F" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Right Arm */}
        <mesh position={[0.9, 0, 0]}>
          <boxGeometry args={[0.15, 1.4, 0.2]} />
          <meshStandardMaterial color="#1E232F" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Bottom Swivel Connector */}
        <mesh position={[0, -0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 1.95, 16]} />
          <meshStandardMaterial color="#1E232F" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Stand Adapter */}
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
          <meshStandardMaterial color="#2B3242" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* Subtle Studio Red Ambient Light Glow Backdrop */}
      <pointLight position={[0, 0.95, 0.5]} color="#EC2328" intensity={3} distance={4} />
      <pointLight position={[0, -0.5, -1.5]} color="#EC2328" intensity={2} distance={5} />
    </group>
  );
}

/**
 * Main 3D Studio Microphone Canvas Scene
 * With SSR fallback, soft floating physics, particle dust, and brand-aligned lighting.
 */
export default function HeroMicScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center relative">
        <div className="w-64 h-64 rounded-full bg-brand-red/10 blur-3xl animate-pulse" />
        <div className="absolute flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full border-2 border-brand-red border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Loading 3D Studio Mic...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] sm:h-[500px] lg:h-[560px] relative">
      {/* Radial Red Glow Background behind 3D Canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-brand-red/15 rounded-full blur-[90px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        {/* Ambient & Key Studio Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFFFF" castShadow />
        <directionalLight position={[-5, -2, -3]} intensity={1.2} color="#4A607A" />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-3, 2, 2]} intensity={2.5} color="#EC2328" />

        {/* Floating Animation Wrapper */}
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <StudioMicrophone />
        </Float>

        {/* Ambient Studio Dust Sparkles */}
        <Sparkles
          count={35}
          scale={6}
          size={2.5}
          speed={0.4}
          opacity={0.4}
          color="#EC2328"
        />
      </Canvas>
    </div>
  );
}
