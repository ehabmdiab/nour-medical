import React, { Suspense, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Environment, ContactShadows, Float } from '@react-three/drei';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';

// ── 3D MRI Scanner Model ──────────────────────────────────────────
function MriScannerModel(props: { position?: [number, number, number]; scale?: [number, number, number] }) {
  const modelUrl = `${import.meta.env.BASE_URL}models/nour-mri-scanner.glb`;
  const { scene } = useGLTF(modelUrl);

  React.useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial | undefined;
        // Hide unlit plane graphics inside bore
        if (!mat?.name || mat?.map) {
          child.visible = false;
        }
        // Style bore interior to match dark navy theme
        if (mat && mat.name === 'Bore_Interior') {
          mat.color = new THREE.Color('#081326');
          mat.roughness = 0.2;
          mat.metalness = 0.5;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Preload model & logo
try {
  useGLTF.preload(`${import.meta.env.BASE_URL}models/nour-mri-scanner.glb`);
  useTexture.preload(`${import.meta.env.BASE_URL}nour-medical-logo.png`);
} catch {
  // Safe preload fallback
}

interface CameraControllerProps {
  mode: 'auto' | 'zoomed-in' | 'zoomed-out';
  isPlaying: boolean;
  resetTrigger: number;
  onOpacityChange: (opacity: number) => void;
}

// ── Animated Camera Controller ────────────────────────────────────
function CameraController({ mode, isPlaying, resetTrigger, onOpacityChange }: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const timeRef = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);
  const lastResetTrigger = useRef<number>(resetTrigger);

  // Start Position: Distant wide view showing the full scanner in perspective
  const startPos = useRef(new THREE.Vector3(0, 4.2, 14.5)).current;
  const startTarget = useRef(new THREE.Vector3(0, 2.0, 0.0)).current;

  // Zoomed Position: Centered straight-on zoom directly into the circular bore
  const zoomPos = useRef(new THREE.Vector3(0, 2.42, 2.85)).current;
  const zoomTarget = useRef(new THREE.Vector3(0, 2.42, 0.0)).current;

  // Reset time if reset button clicked
  if (resetTrigger !== lastResetTrigger.current) {
    timeRef.current = 0;
    lastResetTrigger.current = resetTrigger;
  }

  useFrame((_, delta) => {
    // Set initial wide position on first frame
    if (!isInitialized.current && controlsRef.current) {
      camera.position.copy(startPos);
      controlsRef.current.target.copy(startTarget);
      controlsRef.current.update();
      isInitialized.current = true;
    }

    let progress = 0;
    let opacity = 0;

    if (mode === 'zoomed-in') {
      progress = 1;
      opacity = 1;
    } else if (mode === 'zoomed-out') {
      progress = 0;
      opacity = 0;
    } else {
      // Automatic animation loop mode (60s cycle)
      if (isPlaying) {
        timeRef.current += delta;
      }
      const cycleTime = 60;
      const t = timeRef.current % cycleTime;

      if (t < 3.5) {
        // 0s - 3.5s: Start wide view
        progress = 0;
        opacity = 0;
      } else if (t < 9) {
        // 3.5s - 9s: Smooth cinematic zoom towards machine bore center
        const ease = (t - 3.5) / 5.5;
        progress = ease < 0.5 ? 4 * ease * ease * ease : 1 - Math.pow(-2 * ease + 2, 3) / 2;
        opacity = Math.min(1, Math.max(0, (ease - 0.15) * 1.3));
      } else if (t < 52) {
        // 9s - 52s: Hold zoomed inside view displaying logo in dead center
        progress = 1;
        opacity = 1;
      } else if (t < 57) {
        // 52s - 57s: Zoom smoothly back out to wide view
        const ease = 1 - (t - 52) / 5;
        progress = ease < 0.5 ? 4 * ease * ease * ease : 1 - Math.pow(-2 * ease + 2, 3) / 2;
        opacity = Math.min(1, Math.max(0, (ease - 0.15) * 1.3));
      } else {
        // 57s - 60s: Reset at wide start view before next cycle
        progress = 0;
        opacity = 0;
      }
    }

    onOpacityChange(opacity);

    if (controlsRef.current) {
      const currentPos = new THREE.Vector3().lerpVectors(startPos, zoomPos, progress);
      const currentTarget = new THREE.Vector3().lerpVectors(startTarget, zoomTarget, progress);

      camera.position.lerp(currentPos, 0.05);
      controlsRef.current.target.lerp(currentTarget, 0.05);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableZoom={false}
      enableRotate={true}
      minDistance={0.5}
      maxDistance={25}
      maxPolarAngle={Math.PI / 2 - 0.05}
    />
  );
}

// ── Inside Scanner Bore Logo ──────────────────────────────────────
function ScannerBoreLogo({ opacity }: { opacity: number }) {
  const logoTexture = useTexture(`${import.meta.env.BASE_URL}nour-medical-logo.png`);

  React.useMemo(() => {
    if (logoTexture) {
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
      logoTexture.magFilter = THREE.LinearFilter;
      logoTexture.generateMipmaps = true;
    }
  }, [logoTexture]);

  if (opacity <= 0.01) return null;

  // Aspect ratio is 221 / 66 (~3.348)
  const width = 1.05;
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

interface Mri3DViewerProps {
  height?: string;
}

export const Mri3DViewer: React.FC<Mri3DViewerProps> = ({ height = '100%' }) => {
  const [textOpacity, setTextOpacity] = useState<number>(0);
  const [mode, setMode] = useState<'auto' | 'zoomed-in' | 'zoomed-out'>('auto');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const handleTogglePlay = useCallback((): void => {
    if (mode !== 'auto') {
      setMode('auto');
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [mode]);

  const handleRestart = useCallback((): void => {
    setMode('auto');
    setIsPlaying(true);
    setResetTrigger((prev) => prev + 1);
  }, []);

  const handleZoomIn = useCallback((): void => {
    setMode('zoomed-in');
  }, []);

  const handleZoomOut = useCallback((): void => {
    setMode('zoomed-out');
  }, []);

  return (
    <div
      className="w-full relative overflow-hidden rounded-full select-none [mask-image:radial-gradient(circle_at_center,black_84%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_84%,transparent_100%)]"
      style={{ height }}
      role="region"
      aria-label="Interactive 3D MRI Scanner Model Viewer"
    >
      <Canvas
        shadows
        camera={{ position: [0, 4.2, 14.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow shadow-mapSize={1024} />
        <pointLight position={[0, 2.42, 0.5]} color="#00e5ff" intensity={4.5} distance={6} />

        <Suspense fallback={null}>
          <MriScannerModel position={[0, 0, 0]} scale={[1.6, 1.6, 1.6]} />
          <ScannerBoreLogo opacity={textOpacity} />
          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={12} blur={1.5} far={4} />
          <Environment preset="city" />
        </Suspense>

        <CameraController
          mode={mode}
          isPlaying={isPlaying}
          resetTrigger={resetTrigger}
          onOpacityChange={setTextOpacity}
        />
      </Canvas>

      {/* Floating Interactive 3D Viewer Controllers */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-navy/85 backdrop-blur-md border border-white/20 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Start / Pause Animation */}
        <button
          onClick={handleTogglePlay}
          title={mode === 'auto' && isPlaying ? 'Pause Animation' : 'Start Animation'}
          aria-label={mode === 'auto' && isPlaying ? 'Pause Animation' : 'Start Animation'}
          className={`flex items-center justify-center w-8 h-8 rounded-full border-0 cursor-pointer transition-all duration-200 ${
            mode === 'auto' && isPlaying ? 'bg-teal-accent/25 text-teal-accent' : 'bg-transparent text-white hover:text-teal-accent'
          }`}
        >
          {mode === 'auto' && isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Restart Animation from Start */}
        <button
          onClick={handleRestart}
          title="Restart Animation from Spaced View"
          aria-label="Restart Animation from Spaced View"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent text-white/70 hover:text-white border-0 cursor-pointer transition-all duration-200"
        >
          <RotateCcw size={14} />
        </button>

        <div className="w-px h-4 bg-white/15 mx-0.5" />

        {/* Zoom Out (Spaced View) */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out (Spaced View)"
          aria-label="Zoom Out (Spaced View)"
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
            mode === 'zoomed-out'
              ? 'bg-teal-accent/25 text-teal-accent border border-teal-accent'
              : 'bg-transparent text-white/85 hover:text-white border-0'
          }`}
        >
          <ZoomOut size={14} />
        </button>

        {/* Zoom In (Centered Bore) */}
        <button
          onClick={handleZoomIn}
          title="Zoom In (Centered Bore)"
          aria-label="Zoom In (Centered Bore)"
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
            mode === 'zoomed-in'
              ? 'bg-teal-accent/25 text-teal-accent border border-teal-accent'
              : 'bg-transparent text-white/85 hover:text-white border-0'
          }`}
        >
          <ZoomIn size={14} />
        </button>
      </div>
    </div>
  );
};
