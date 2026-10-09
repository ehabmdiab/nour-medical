import React, { Suspense, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── ROTATING LOGO INSIDE BORE (VISIBLE AT CLOSE ZOOM) ──────────────
function ScannerBoreLogo({ opacity }: { opacity: number }) {
  const logoTexture = useTexture(`${import.meta.env.BASE_URL}nour-medical-logo.png`);

  useMemo(() => {
    logoTexture.wrapS = THREE.ClampToEdgeWrapping;
    logoTexture.wrapT = THREE.ClampToEdgeWrapping;
    logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.generateMipmaps = true;
    logoTexture.needsUpdate = true;
  }, [logoTexture]);

  // Aspect ratio is 221 / 66 (~3.348)
  const width = 2.15;
  const height = width / (221 / 66);

  return (
    <group position={[0, 2.42, -0.05]}>
      <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.08}>
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent
            opacity={opacity}
            depthWrite={false}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ── CAMERA CONTROLLER WITH SMOOTH BORE ZOOM ───────────────────────
function LoaderCameraController({
  progress,
  onLogoOpacityChange,
  onZoomProgressChange,
}: {
  progress: number;
  onLogoOpacityChange: (opacity: number) => void;
  onZoomProgressChange: (zoom: number) => void;
}) {
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  const isPortrait = aspect < 1.0;

  // Responsive framing: scale distance on portrait/mobile so full gantry is framed with headroom
  const startZ = isPortrait ? 12.0 / Math.min(1, aspect * 1.35) : 12.0;
  const zoomZ = isPortrait ? 2.85 / Math.min(1, aspect * 1.25) : 2.85;

  const currentTarget = useRef(new THREE.Vector3(0, 2.25, 0));

  const startPos = useMemo(() => new THREE.Vector3(0, 2.45, startZ), [startZ]);
  const startTarget = useMemo(() => new THREE.Vector3(0, 2.25, 0.0), []);

  const zoomPos = useMemo(() => new THREE.Vector3(0, 2.42, zoomZ), [zoomZ]);
  const zoomTarget = useMemo(() => new THREE.Vector3(0, 2.42, 0.0), []);

  const targetPos = useRef(new THREE.Vector3().copy(startPos));
  const lookTarget = useRef(new THREE.Vector3().copy(startTarget));

  useEffect(() => {
    camera.position.set(0, 2.45, startZ);
    camera.lookAt(0, 2.25, 0);
  }, [camera, startZ]);

  useFrame((_, delta) => {
    const t = Math.min(1, Math.max(0, progress / 100));

    let zoomT = 0;
    if (t > 0.15) {
      zoomT = Math.min(1, (t - 0.15) / 0.70);
    }

    const easedZoom =
      zoomT < 0.5 ? 4 * zoomT * zoomT * zoomT : 1 - Math.pow(-2 * zoomT + 2, 3) / 2;

    onZoomProgressChange(easedZoom);

    let logoOpacity = 0;
    if (zoomT > 0.25) {
      logoOpacity = Math.min(1, (zoomT - 0.25) / 0.55);
      logoOpacity = logoOpacity * logoOpacity * (3 - 2 * logoOpacity);
    }
    onLogoOpacityChange(logoOpacity);

    targetPos.current.lerpVectors(startPos, zoomPos, easedZoom);
    lookTarget.current.lerpVectors(startTarget, zoomTarget, easedZoom);

    camera.position.lerp(targetPos.current, Math.min(1, delta * 5.0));
    currentTarget.current.lerp(lookTarget.current, Math.min(1, delta * 5.0));
    camera.lookAt(currentTarget.current);
  });

  return null;
}

// ── 3D SCANNER MODEL ──────────────────────────────────────────────
function CleanScannerModel({
  mouse,
  zoomProgress,
}: {
  mouse: { x: number; y: number };
  zoomProgress: number;
}) {
  const modelUrl = `${import.meta.env.BASE_URL}models/nour-mri-scanner.glb`;
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);

  // Style materials to clean clinical finish matching Hero section
  useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        // Hide unlit plane graphics inside bore
        if (!mat?.name || mat?.map) {
          child.visible = false;
        }
        if (mat && mat.name === 'Bore_Interior') {
          mat.color = new THREE.Color('#0B1B33');
          mat.roughness = 0.25;
          mat.metalness = 0.4;
        }
      }
    });
  }, [scene]);

  // Subtle interactive parallax tilt (dampened when zoomed in to keep bore & logo centered)
  useFrame((_, delta) => {
    if (groupRef.current) {
      const dampFactor = Math.max(0.15, 1 - zoomProgress * 0.85);
      const targetRotY = mouse.x * 0.18 * dampFactor;
      const targetRotX = -mouse.y * 0.08 * dampFactor;

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
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene} scale={[1.6, 1.6, 1.6]} />
      {/* Floor Contact Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 48]} />
        <meshBasicMaterial
          color="#0A1628"
          transparent
          opacity={0.12}
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
  minDurationMs = 2800,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [logoOpacity, setLogoOpacity] = useState<number>(0);
  const [zoomProgress, setZoomProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isDebugMode =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('debug') === 'true';
  const freezeParam =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('freeze')
      : null;
  const effectiveDuration = isDebugMode ? 25000 : minDurationMs;

  // Lock body & html scroll while loader is visible
  useEffect(() => {
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
    };
  }, []);

  // Subtle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle finish
  const handleFinish = useCallback((): void => {
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  }, [onComplete]);

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Smooth loading progression
  useEffect(() => {
    if (freezeParam !== null) {
      setProgress(parseInt(freezeParam, 10));
      return;
    }
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const raw = Math.min(100, (elapsed / effectiveDuration) * 100);
      setProgress(Math.floor(raw));

      if (raw < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(handleFinish, 250);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [effectiveDuration, handleFinish, freezeParam]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading Nour Medical"
      className={`fixed inset-0 z-[99999] bg-white overflow-hidden transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Ambient Radial Background matching Dark Navy Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#FFFFFF_0%,#F8FAFC_60%,#EBF1F6_100%)] pointer-events-none" />

      {/* Brand Header - floats at top with subtle fade during bore zoom */}
      <div
        className="absolute top-[clamp(24px,5vh,44px)] inset-x-0 z-10 flex flex-col items-center gap-2 pointer-events-none transition-all duration-200"
        style={{
          opacity: Math.max(0, 1 - (progress > 20 ? (progress - 20) / 45 : 0)),
          transform: `translateY(${progress > 20 ? -((progress - 20) * 0.3) : 0}px)`,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}nour-medical-logo.png`}
          alt="Nour Medical"
          className="h-9 w-auto object-contain"
        />
        <span className="font-mono text-[0.625rem] tracking-widest uppercase text-text-muted">
          Healthcare Technology · Est. 2015
        </span>
      </div>

      {/* Fullscreen 3D MRI Scanner Stage */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          camera={{ position: [0, 2.5, 12.0], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[6, 9, 6]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-6, 4, -4]} intensity={0.9} color="#e2e8f0" />
          {/* Subtle royal cyan interior bore lighting that highlights the logo during zoom */}
          <pointLight
            position={[0, 2.42, 0.4]}
            color="#0284c7"
            intensity={2.2 + logoOpacity * 3.0}
            distance={6}
          />

          <Suspense fallback={null}>
            <CleanScannerModel mouse={mouse} zoomProgress={zoomProgress} />
            <ScannerBoreLogo opacity={logoOpacity} />
          </Suspense>

          <LoaderCameraController
            progress={progress}
            onLogoOpacityChange={setLogoOpacity}
            onZoomProgressChange={setZoomProgress}
          />
        </Canvas>
      </div>

      {/* Clean Minimal Progress Bar - anchored at bottom */}
      <div className="absolute bottom-[clamp(28px,6vh,52px)] inset-x-0 z-10 flex flex-col items-center gap-2.5 pointer-events-none">
        <div className="w-[200px] h-0.5 bg-navy/[0.08] rounded-xs overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-medical to-teal-accent transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] text-text-muted tabular-nums tracking-wide">
            {progress}%
          </span>
          {logoOpacity > 0.4 && (
            <span
              className="font-mono text-[0.5625rem] tracking-widest uppercase text-orange-accent transition-opacity duration-200"
              style={{
                opacity: Math.min(1, (logoOpacity - 0.4) * 2),
              }}
            >
              System Initialized
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
