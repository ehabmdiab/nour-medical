import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Text, Float } from '@react-three/drei';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';

function MriScannerModel(props: any) {
  const modelUrl = `${import.meta.env.BASE_URL}models/philips-mri-scanner.glb`;
  const { scene } = useGLTF(modelUrl);

  React.useMemo(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Hide unlit plane graphics inside bore
        if (!child.material?.name || child.material?.map) {
          child.visible = false;
        }
        // Style bore interior to match dark navy theme
        if (child.material && child.material.name === 'Bore_Interior') {
          child.material.color = new THREE.Color('#081326');
          child.material.roughness = 0.2;
          child.material.metalness = 0.5;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Preload model
try {
  useGLTF.preload(`${import.meta.env.BASE_URL}models/philips-mri-scanner.glb`);
} catch (e) {
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
  const controlsRef = useRef<any>(null);
  const timeRef = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);
  const lastResetTrigger = useRef<number>(resetTrigger);

  // Start Position: Distant, spaced wide view showing the full scanner in expansive surrounding perspective
  const startPos = new THREE.Vector3(0, 4.2, 14.5);
  const startTarget = new THREE.Vector3(0, 2.0, 0.0);

  // Zoomed Position: Centered straight-on zoom directly into the machine's circular bore center
  const zoomPos = new THREE.Vector3(0, 2.32, 2.85);
  const zoomTarget = new THREE.Vector3(0, 2.32, 0.0);

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
      // Automatic animation loop mode
      if (isPlaying) {
        timeRef.current += delta;
      }
      const cycleTime = 60; // 60 seconds total cycle (1 minute loop)
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
        // 9s - 52s: Hold zoomed inside view displaying text in dead center
        progress = 1;
        opacity = 1;
      } else if (t < 57) {
        // 52s - 57s: Zoom smoothly back out to wide view
        const ease = 1 - (t - 52) / 5;
        progress = ease < 0.5 ? 4 * ease * ease * ease : 1 - Math.pow(-2 * ease + 2, 3) / 2;
        opacity = Math.min(1, Math.max(0, (ease - 0.15) * 1.3));
      } else {
        // 57s - 60s: Reset at wide start view before next 1-minute cycle
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

// ── Inside Scanner Bore Text ──────────────────────────────────────
function ScannerBoreText({ opacity }: { opacity: number }) {
  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2.32, -0.15]}>
      <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.08}>
        <Text
          fontSize={0.062}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={opacity}
          letterSpacing={0.16}
        >
          NOUR MEDICAL
        </Text>
      </Float>
    </group>
  );
}

interface Mri3DViewerProps {
  height?: string;
}

export const Mri3DViewer: React.FC<Mri3DViewerProps> = ({ height = '100%' }) => {
  const [textOpacity, setTextOpacity] = useState(0);
  const [mode, setMode] = useState<'auto' | 'zoomed-in' | 'zoomed-out'>('auto');
  const [isPlaying, setIsPlaying] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleTogglePlay = () => {
    if (mode !== 'auto') {
      setMode('auto');
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    setMode('auto');
    setIsPlaying(true);
    setResetTrigger(prev => prev + 1);
  };

  const handleZoomIn = () => {
    setMode('zoomed-in');
  };

  const handleZoomOut = () => {
    setMode('zoomed-out');
  };

  return (
    <div style={{
      width: '100%',
      height: height,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '50%',
      maskImage: 'radial-gradient(circle at center, black 84%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 84%, transparent 100%)',
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 4.2, 14.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow shadow-mapSize={1024} />
        <pointLight position={[0, 2.32, 0.5]} color="#00e5ff" intensity={4.5} distance={6} />

        <Suspense fallback={null}>
          <MriScannerModel position={[0, 0, 0]} scale={[1.6, 1.6, 1.6]} />
          <ScannerBoreText opacity={textOpacity} />
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
      <div style={{
        position: 'absolute',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: 'rgba(10, 22, 40, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Start / Pause Animation */}
        <button
          onClick={handleTogglePlay}
          title={mode === 'auto' && isPlaying ? 'Pause Animation' : 'Start Animation'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: mode === 'auto' && isPlaying ? 'rgba(0, 168, 181, 0.25)' : 'transparent',
            color: mode === 'auto' && isPlaying ? 'var(--teal-accent)' : '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {mode === 'auto' && isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Restart Animation from Start */}
        <button
          onClick={handleRestart}
          title="Restart Animation from Spaced View"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'transparent',
            color: 'rgba(255,255,255,0.7)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
        >
          <RotateCcw size={14} />
        </button>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.15)', margin: '0 2px' }} />

        {/* Zoom Out (Spaced View) */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out (Spaced View)"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: mode === 'zoomed-out' ? 'rgba(0, 168, 181, 0.25)' : 'transparent',
            color: mode === 'zoomed-out' ? 'var(--teal-accent)' : 'rgba(255, 255, 255, 0.85)',
            border: mode === 'zoomed-out' ? '1px solid var(--teal-accent)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            if (mode !== 'zoomed-out') e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            if (mode !== 'zoomed-out') e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
          }}
        >
          <ZoomOut size={14} />
        </button>

        {/* Zoom In (Centered Bore) */}
        <button
          onClick={handleZoomIn}
          title="Zoom In (Centered Bore)"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: mode === 'zoomed-in' ? 'rgba(0, 168, 181, 0.25)' : 'transparent',
            color: mode === 'zoomed-in' ? 'var(--teal-accent)' : 'rgba(255, 255, 255, 0.85)',
            border: mode === 'zoomed-in' ? '1px solid var(--teal-accent)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            if (mode !== 'zoomed-in') e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            if (mode !== 'zoomed-in') e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
          }}
        >
          <ZoomIn size={14} />
        </button>
      </div>
    </div>
  );
};
