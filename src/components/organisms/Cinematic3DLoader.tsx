import React, { Suspense, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── ROTATING LOGO INSIDE BORE (VISIBLE AT CLOSE ZOOM) ──────────────
function ScannerBoreLogo({ opacity }: { opacity: number }) {
  const logoTexture = useTexture(`${import.meta.env.BASE_URL}nour-medical-logo.png`);

  useMemo(() => {
    if (logoTexture) {
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.wrapS = THREE.ClampToEdgeWrapping;
      logoTexture.wrapT = THREE.ClampToEdgeWrapping;
      logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
      logoTexture.magFilter = THREE.LinearFilter;
      logoTexture.generateMipmaps = true;
      logoTexture.anisotropy = 16;
      logoTexture.needsUpdate = true;
    }
  }, [logoTexture]);

  if (opacity <= 0.01) return null;

  // Aspect ratio is 221 / 66 (~3.348).
  // Bore inner diameter is ~1.40. Width of 1.26 fits cleanly inside the bore opening
  // with ample breathing room, ensuring zero clipping of text or emblem.
  const width = 1.26;
  const height = width / (221 / 66);

  return (
    <group position={[0, 2.45, -0.3]}>
      <Float speed={1.2} rotationIntensity={0.015} floatIntensity={0.04}>
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
  const zoomZ = isPortrait ? 4.1 / Math.min(1, aspect * 1.25) : 3.8;

  const currentTarget = useRef(new THREE.Vector3(0, 2.25, 0));

  const startPos = useMemo(() => new THREE.Vector3(0, 2.45, startZ), [startZ]);
  const startTarget = useMemo(() => new THREE.Vector3(0, 2.25, 0.0), []);

  const zoomPos = useMemo(() => new THREE.Vector3(0, 2.48, zoomZ), [zoomZ]);
  const zoomTarget = useMemo(() => new THREE.Vector3(0, 2.48, 0.0), []);

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
  logoOpacity,
  onModelReady,
}: {
  mouse: { x: number; y: number };
  zoomProgress: number;
  logoOpacity: number;
  onModelReady: () => void;
}) {
  const modelUrl = `${import.meta.env.BASE_URL}models/nour-mri-scanner.glb`;
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    onModelReady();
  }, [onModelReady]);

  // Style materials to clean clinical finish matching Hero section
  const clonedScene = useMemo(() => {
    const root = typeof scene.clone === 'function' ? scene.clone(true) : scene;
    root.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        // Hide unlit plane graphics inside bore
        if (!mat?.name || mat?.map) {
          child.visible = false;
        }
        // Hide head coil shell & bracket from blocking clean view into the scanner bore
        if (mat && (mat.name === 'Head_Coil_Shell' || child.name.includes('mesh_27') || child.name.includes('mesh_28') || child.name.includes('mesh_29'))) {
          child.visible = false;
        }
        if (mat && mat.name === 'Bore_Interior') {
          mat.color = new THREE.Color('#ffffff');
          mat.roughness = 0.25;
          mat.metalness = 0.05;
        }
      }
    });
    return root;
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
      <primitive object={clonedScene} scale={[1.6, 1.6, 1.6]} />
      {/* Clinical white interior back plate ensuring solid white depth inside bore as in home page */}
      <mesh position={[0, 2.42, -1.52]}>
        <circleGeometry args={[0.78, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* Centered Bore Logo that moves synchronously with gantry parallax tilt */}
      <ScannerBoreLogo opacity={logoOpacity} />
      {/* Floor Contact Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 48]} />
        <meshBasicMaterial
          color="#0A1628"
          transparent
          opacity={0.1}
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
  minDurationMs = 1600,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [logoOpacity, setLogoOpacity] = useState<number>(0);
  const [zoomProgress, setZoomProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isModelReadyRef = useRef<boolean>(false);

  const handleModelReady = useCallback((): void => {
    isModelReadyRef.current = true;
  }, []);

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

  // Smooth loading progression that waits until the 3D model is loaded
  useEffect(() => {
    if (freezeParam !== null) {
      setProgress(parseInt(freezeParam, 10));
      return;
    }
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const rawRatio = elapsed / effectiveDuration;

      if (!isModelReadyRef.current) {
        // Hold up to 92% while waiting for the 3D model & textures to finish loading
        const waitingProgress = Math.min(92, Math.floor(rawRatio * 92));
        setProgress(waitingProgress);
        frameId = requestAnimationFrame(tick);
        return;
      }

      const raw = Math.min(100, rawRatio * 100);
      setProgress(Math.floor(raw));

      if (raw < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(handleFinish, 200);
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
      className={`fixed inset-0 z-[99999] bg-gradient-to-b from-white via-warm-white to-[#EEF4FB] bg-[image:var(--bg-hero-light)] text-navy overflow-hidden transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Ambient Medical Light Grid & Upper-Right Orange Glow matching Bright Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute -right-[8%] -top-[12%] w-[720px] h-[720px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.035)_0%,rgba(251,146,60,0.015)_42%,transparent_72%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(27,79,216,0.08)_0%,rgba(0,168,181,0.04)_45%,transparent_75%)] pointer-events-none" />

      {/* Brand Header - floats at top with subtle fade during bore zoom */}
      <div
        className="absolute top-[clamp(24px,5vh,44px)] inset-x-0 z-10 flex flex-col items-center gap-2.5 pointer-events-none transition-all duration-300"
        style={{
          opacity: Math.max(0, 1 - (progress > 20 ? (progress - 20) / 45 : 0)),
          transform: `translateY(${progress > 20 ? -((progress - 20) * 0.3) : 0}px)`,
        }}
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-gray-light backdrop-blur-md shadow-[0_4px_20px_rgba(10,22,40,0.06)]">
          <img
            src={`${import.meta.env.BASE_URL}nour-medical-logo.png`}
            alt="Nour Medical"
            className="h-7 w-auto object-contain"
          />
        </div>
        <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-text-muted">
          Healthcare Technology · Est. 2015
        </span>
      </div>

      {/* Fullscreen 3D MRI Scanner Stage */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 2.5, 12.0], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[6, 9, 6]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-6, 4, -4]} intensity={0.9} color="#e2e8f0" />
          {/* Clinical white and gentle cyan halo lighting inside bore matching home page */}
          <pointLight
            position={[0, 2.42, 0.5]}
            color="#ffffff"
            intensity={2.2 + logoOpacity * 1.5}
            distance={6}
          />
          <pointLight
            position={[0, 2.42, 1.2]}
            color="#00e5ff"
            intensity={1.5 + logoOpacity * 1.5}
            distance={4}
          />

          <Suspense fallback={null}>
            <CleanScannerModel
              mouse={mouse}
              zoomProgress={zoomProgress}
              logoOpacity={logoOpacity}
              onModelReady={handleModelReady}
            />
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
        <div className="w-[220px] h-1 bg-gray-light rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-medical to-teal-accent transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] font-semibold text-navy tabular-nums tracking-wide">
            {progress}%
          </span>
          {logoOpacity > 0.4 && (
            <span
              className="font-mono text-[0.5625rem] font-semibold tracking-widest uppercase text-orange-accent transition-opacity duration-200"
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
