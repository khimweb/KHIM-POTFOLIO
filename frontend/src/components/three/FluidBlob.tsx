import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Iridescent fluid blob — custom GLSL shaders
   Purple / Blue / Pink palette matching photo
───────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uPulse;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vPosition;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vPosition = position;

    vec3 pos   = position;
    float spd  = 0.55 + uHover * 1.1;
    float amp  = 0.20 + uHover * 0.13 + uPulse * 0.22;

    // Multi-frequency sine waves → fluid look
    float d =
        sin(pos.x * 2.6 + uTime * spd        ) * cos(pos.y * 2.2 + uTime * spd * 0.82)
      + cos(pos.y * 3.1 + uTime * spd * 0.71 ) * sin(pos.z * 2.7 + uTime * spd * 1.08)
      + sin(pos.z * 2.0 + uTime * spd * 0.93 ) * cos(pos.x * 3.6 + uTime * spd * 0.65)
      + cos((pos.x + pos.y + pos.z) * 1.4 + uTime * spd * 0.48) * 0.45;

    pos += normal * (d / 4.0) * amp;

    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vPosition;

  void main() {
    vec3  viewDir = normalize(cameraPosition - vWorldPos);
    float NdotV   = clamp(dot(vNormal, viewDir), 0.0, 1.0);
    float fresnel = pow(1.0 - NdotV, 2.8);

    float t = uTime * 0.17;

    // Photo palette: deep-purple · electric-blue · hot-pink · violet · cyan
    vec3 c0 = vec3(0.36, 0.02, 0.90);   // deep purple
    vec3 c1 = vec3(0.04, 0.40, 1.00);   // electric blue
    vec3 c2 = vec3(0.95, 0.08, 0.78);   // hot pink
    vec3 c3 = vec3(0.55, 0.05, 0.98);   // violet
    vec3 c4 = vec3(0.00, 0.82, 1.00);   // cyan

    float f1 = sin(t      + vNormal.x * 4.5 + vPosition.x * 1.2) * 0.5 + 0.5;
    float f2 = cos(t*0.85 + vNormal.y * 3.8 + vPosition.y * 1.1) * 0.5 + 0.5;
    float f3 = sin(t*1.2  + vNormal.z * 3.2 + vPosition.z * 0.9) * 0.5 + 0.5;

    vec3 col = mix(c0, c1, f1);
    col = mix(col, c2, f2 * 0.75);
    col = mix(col, c3, f3 * 0.45);
    col = mix(col, c4, f1 * f3 * 0.35);

    // Rim / edge glow
    col += vec3(0.65, 0.22, 1.00) * fresnel * (2.0 + uHover * 1.2);

    // Two specular highlights
    vec3 l1   = normalize(vec3( 1.0,  1.2,  0.6));
    vec3 l2   = normalize(vec3(-0.6,  0.4,  1.0));
    float s1  = pow(max(dot(reflect(-l1, vNormal), viewDir), 0.0), 18.0);
    float s2  = pow(max(dot(reflect(-l2, vNormal), viewDir), 0.0), 30.0);
    col += vec3(1.00, 0.85, 1.00) * s1 * 0.90;
    col += vec3(0.40, 0.75, 1.00) * s2 * 0.55;

    // Hover brightness boost
    col *= (1.0 + uHover * 0.30);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ── Inner blob mesh ─────────────────────── */
const BlobMesh = () => {
  const meshRef  = useRef<THREE.Mesh>(null);
  const matRef   = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const uniforms = useMemo(
    () => ({
      uTime:  { value: 0.0 },
      uHover: { value: 0.0 },
      uPulse: { value: 0.0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!matRef.current || !meshRef.current) return;
    const t = clock.getElapsedTime();

    matRef.current.uniforms.uTime.value  = t;
    matRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uHover.value, hovered ? 1 : 0, 0.06
    );
    matRef.current.uniforms.uPulse.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uPulse.value, clicked ? 1 : 0, 0.10
    );

    // Slow auto-rotation
    meshRef.current.rotation.y += hovered ? 0.007 : 0.0025;
    meshRef.current.rotation.x  = Math.sin(t * 0.18) * 0.12;
    meshRef.current.rotation.z  = Math.cos(t * 0.14) * 0.08;

    // Scale on hover
    const tgt = hovered ? 1.08 : 1.0;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, tgt, 0.05)
    );
  });

  const handlePointerEnter = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const handlePointerLeave = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 450);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* High-detail icosahedron = smooth fluid sphere */}
      <icosahedronGeometry args={[2.2, 6]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

/* ── Floating ring decoration ───────────── */
const RingDecor = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.2, 0.018, 16, 120]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.25} />
    </mesh>
  );
};

const RingDecor2 = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
  });
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.8, 0.012, 16, 120]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
    </mesh>
  );
};

/* ── Public component ────────────────────── */
export const FluidBlob = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 4, 4]}   color="#8B5CF6" intensity={3} />
      <pointLight position={[-4, -3, 3]} color="#00D4FF" intensity={2} />
      <pointLight position={[0, -5, 2]}  color="#ec4899" intensity={1.5} />

      <BlobMesh />
      <RingDecor />
      <RingDecor2 />
    </Canvas>
  );
};
