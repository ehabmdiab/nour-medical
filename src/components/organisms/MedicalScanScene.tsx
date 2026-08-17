import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 1. Rotating Inner Detector & X-Ray Tube Assembly
const RotatingGantryInner = () => {
  const innerRingRef = useRef<THREE.Group>(null);
  const rayConeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.7; // Continuous rotation of gantry inner ring
    }
  });

  return (
    <group ref={innerRingRef}>
      {/* Inner Detector Rotor Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.08, 16, 64]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* X-Ray Tube Gantry Mount (Top Focal Source) */}
      <group position={[0, 2.1, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.4, 0.5]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glowing X-Ray Focal Emitter Port */}
        <mesh position={[0, -0.21, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
          <meshBasicMaterial color="#00a8e8" />
        </mesh>
      </group>

      {/* Flat Panel Digital Detector Receiver Array (Opposing Bottom Mount) */}
      <group position={[0, -2.1, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.15, 0.6]} />
          <meshStandardMaterial color="#0369a1" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <planeGeometry args={[0.7, 0.5]} />
          <meshBasicMaterial color="#00a8e8" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Conical X-Ray Radiation Scan Beam */}
      <mesh ref={rayConeRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.5, 4.2, 32, 1, true]} />
        <meshBasicMaterial
          color="#00a8e8"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// 2. Main Outer CT / MRI Gantry Housing & Patient Couch
const GantryStructure = () => {
  const mainGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (mainGroupRef.current) {
      const t = clock.getElapsedTime();
      // Gentle floating tilt guided by mouse
      mainGroupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1 + mouse.x * 0.45;
      mainGroupRef.current.rotation.x = mouse.y * 0.25;
    }
  });

  return (
    <group ref={mainGroupRef}>
      {/* Outer Gantry Main Shell Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.45, 32, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
      </mesh>

      {/* Gantry Accent LED Ring (Bright Cyan Glow) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.46]}>
        <torusGeometry args={[2.65, 0.03, 16, 64]} />
        <meshBasicMaterial color="#00a8e8" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.46]}>
        <torusGeometry args={[2.65, 0.03, 16, 64]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Gantry Base Pedestal */}
      <mesh position={[0, -2.8, 0]}>
        <boxGeometry args={[3.2, 0.6, 2.2]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Motorized Carbon-Fiber Patient Couch Bed */}
      <group position={[0, -0.6, 0]}>
        {/* Couch Top Slider */}
        <mesh position={[0, 0, 0.8]}>
          <boxGeometry args={[1.2, 0.12, 4.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        {/* Patient Target Laser Crosshair Indicator */}
        <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.43, 32]} />
          <meshBasicMaterial color="#00a8e8" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Rotating Inner Detector System */}
      <RotatingGantryInner />

      {/* Holographic DICOM Image Cross-Section Slice Planes */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <planeGeometry args={[2.4, 2.4]} />
          <meshBasicMaterial
            color="#00a8e8"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
};

// 3. Photon Radiation Particle Field
const PhotonParticles = () => {
  const count = 500;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorTeal = new THREE.Color("#00a8e8");
    const colorBlue = new THREE.Color("#0284c7");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const c = Math.random() > 0.5 ? colorTeal : colorBlue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const MedicalScanScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[3.5, 2, 6.5]} fov={45} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 15, 10]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-8, -5, -5]} intensity={1.2} color="#00a8e8" />
        <pointLight position={[5, 8, 5]} intensity={1.5} color="#0284c7" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <GantryStructure />
        </Float>

        <PhotonParticles />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
};
