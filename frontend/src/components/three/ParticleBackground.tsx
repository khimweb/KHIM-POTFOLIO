import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Multi-colored dynamic starfield with depth
───────────────────────────────────────────── */
const StarField = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 3800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Color palette: Cyan, Violet, Purple, Hot Pink, Soft White
    const palette = [
      new THREE.Color('#00D4FF'), // Cyan
      new THREE.Color('#8B5CF6'), // Purple
      new THREE.Color('#C084FC'), // Soft Violet
      new THREE.Color('#EF4444'), // Crimson Red (Ninja theme)
      new THREE.Color('#F43F5E'), // Rose
      new THREE.Color('#FFFFFF'), // Pure White star
    ];

    for (let i = 0; i < count; i++) {
      // Spherical distribution with layered depth
      const r = 26 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x -= delta * 0.035;
    pointsRef.current.rotation.y -= delta * 0.045;

    // Smooth responsive pointer parallax
    const { pointer } = state;
    pointsRef.current.rotation.x += (pointer.y * 0.05 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (pointer.x * 0.05 - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.048}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.85}
        />
      </Points>
    </group>
  );
};

/* ── Floating Cyber Dust Orbs ────────────── */
const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      scale: 0.08 + Math.random() * 0.16,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#8B5CF6' : Math.random() > 0.5 ? '#00D4FF' : '#EF4444',
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.y + Math.sin(t * orb.speed + orb.offset) * 0.8;
      child.position.x = orb.x + Math.cos(t * orb.speed * 0.7 + orb.offset) * 0.6;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={[orb.x, orb.y, orb.z]} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
};

/* ── Shooting Meteor Streaks ─────────────── */
const Meteors = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const meteorData = useRef({
    active: false,
    x: 0,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    life: 0,
  });

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const m = meteorData.current;

    if (!m.active) {
      // 1.5% chance per frame to spawn a shooting star
      if (Math.random() < 0.015) {
        m.active = true;
        m.x = 10 + Math.random() * 5;
        m.y = 8 + Math.random() * 4;
        m.z = (Math.random() - 0.5) * 6;
        m.vx = -(14 + Math.random() * 10);
        m.vy = -(8 + Math.random() * 6);
        m.life = 1.0;
        meshRef.current.scale.set(1.5, 0.04, 0.04);
        meshRef.current.rotation.z = Math.atan2(m.vy, m.vx);
      }
    } else {
      m.x += m.vx * delta;
      m.y += m.vy * delta;
      m.life -= delta * 1.8;

      meshRef.current.position.set(m.x, m.y, m.z);
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, m.life * 0.8);

      if (m.life <= 0 || m.x < -15 || m.y < -15) {
        m.active = false;
        meshRef.current.position.set(100, 100, 100);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[100, 100, 100]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0} />
    </mesh>
  );
};

/* ── Public Component with Glowing Cosmic Backdrops ── */
export const ParticleBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, background: '#05020a' }}
    >
      {/* Dynamic Animated Cosmic Nebula Orbs (CSS Hardware-accelerated) */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full pointer-events-none animate-pulse"
        style={{
          top: '10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)',
          filter: 'blur(90px)',
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          bottom: '15%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(239,68,68,0.14) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          top: '55%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Cyber Grid Lines overlay (subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* 3D Canvas Starfield & Meteors */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false, alpha: true }}>
        <StarField />
        <FloatingOrbs />
        <Meteors />
      </Canvas>
    </div>
  );
};
