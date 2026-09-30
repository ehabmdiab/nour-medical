import React, { Suspense, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Preload 3D model
try {
  useGLTF.preload(`${import.meta.env.BASE_URL}models/philips-mri-scanner.glb`);
} catch {
  // Preload fallback
}

// ── MINIMAL 3D SCANNER MODEL ──────────────────────────────────────
function CleanScannerModel({ mouse }: { mouse: { x: number; y: number } }) {
  const modelUrl = `${import.meta.env.BASE_URL}models/philips-mri-scanner.glb`;
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);

  // Style materials to clean clinical finish
  useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        if (!mat?.name || mat?.map) {
          child.visible = false;
        }
        if (mat && mat.name === 'Bore_Interior') {
          mat.color = new THREE.Color('#081326');
          mat.roughness = 0.2;
          mat.metalness = 0.5;
        }
      }
    });
  }, [scene]);

  // Elegant, pristine front-facing presentation with subtle interactive tilt
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Keep iconic circular bore facing front with responsive parallax tilt
      const targetRotY = mouse.x * 0.22;
      const targetRotX = -mouse.y * 0.08;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.75, 0]}>
      <primitive object={scene} scale={[1.4, 1.4, 1.4]} />
      {/* Soft circular floor shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── FORMAL MEDICAL PRELOADER ──────────────────────────────────────
export interface Cinematic3DLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const Cinematic3DLoader: React.FC<Cinematic3DLoaderProps> = ({
  onComplete,
  minDurationMs = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const isDebugMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true';
  const effectiveDuration = isDebugMode ? 25000 : minDurationMs;

  // Lock body scroll while loader is visible
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, []);

  // Subtle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle finish
  const handleFinish = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  }, [onComplete]);

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Smooth loading progression
  useEffect(() => {
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(100, (elapsed / effectiveDuration) * 100);
      setProgress(Math.floor(raw));

      if (raw < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(handleFinish, 200);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [effectiveDuration, handleFinish]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading Nour Medical"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#07111e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* Ambient Radial Background matching Dark Navy Hero */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, #0e1c32 0%, #07111e 70%, #040911 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Brand Header */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}nour-medical-logo.png`}
          alt="Nour Medical"
          style={{
            height: '42px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.625rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          Healthcare Technology · Est. 2015
        </span>
      </div>

      {/* Center 3D Scanner Stage */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(320px, 48vw, 540px)',
          height: 'clamp(280px, 44vh, 420px)',
          zIndex: 5,
        }}
      >
        <Canvas
          camera={{ position: [0, 2.0, 8.5], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 8, 5]} intensity={2.0} />
          <directionalLight position={[-5, 4, -4]} intensity={1.0} color="#bae6fd" />

          <Suspense fallback={null}>
            <CleanScannerModel mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Clean Minimal Progress Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginTop: '12px',
        }}
      >
        <div
          style={{
            width: '180px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0284c7 0%, var(--teal-accent) 100%)',
              transition: 'width 0.08s ease-out',
            }}
          />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.6875rem',
            color: 'rgba(255, 255, 255, 0.45)',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.05em',
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
};
