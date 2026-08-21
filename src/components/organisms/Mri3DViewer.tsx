import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Text, Float } from '@react-three/drei';
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

// ── Animated Camera Controller ────────────────────────────────────
function CameraController({ onOpacityChange }: { onOpacityChange: (opacity: number) => void }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const timeRef = useRef<number>(0);

  // Start Position: Wide view of the entire MRI scanner
  const startPos = new THREE.Vector3(0, 2.2, 4.6);
  const startTarget = new THREE.Vector3(0, 1.2, 0);

  // Zoomed Position: Centered at aperture bore level
  const zoomPos = new THREE.Vector3(0, 1.48, 2.3);
  const zoomTarget = new THREE.Vector3(0, 1.48, 0.0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const cycleTime = 60; // 60 seconds total cycle (1 minute loop)
    const t = timeRef.current % cycleTime;

    let progress = 0;
    let opacity = 0;

    if (t < 2) {
      // 0s - 2s: Start wide view
      progress = 0;
      opacity = 0;
    } else if (t < 7) {
      // 2s - 7s: Smooth zoom towards machine bore
      const ease = (t - 2) / 5;
      progress = ease < 0.5 ? 4 * ease * ease * ease : 1 - Math.pow(-2 * ease + 2, 3) / 2;
      opacity = Math.min(1, Math.max(0, (ease - 0.15) * 1.3));
    } else if (t < 52) {
      // 7s - 52s: Hold zoomed inside view for ~45 seconds displaying the text
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

    onOpacityChange(opacity);

    if (controlsRef.current) {
      const currentPos = new THREE.Vector3().lerpVectors(startPos, zoomPos, progress);
      const currentTarget = new THREE.Vector3().lerpVectors(startTarget, zoomTarget, progress);

      camera.position.lerp(currentPos, 0.04);
      controlsRef.current.target.lerp(currentTarget, 0.04);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      minDistance={0.5}
      maxDistance={12}
      maxPolarAngle={Math.PI / 2 - 0.05}
    />
  );
}

// ── Inside Scanner Bore Text ──────────────────────────────────────
function ScannerBoreText({ opacity }: { opacity: number }) {
  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 1.48, 0.1]}>
      <Float speed={1.5} rotationIntensity={0.03} floatIntensity={0.12}>
        <Text
          fontSize={0.11}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={opacity}
          letterSpacing={0.12}
        >
          NOUR MEDICAL
        </Text>
        <Text
          position={[0, -0.11, 0]}
          fontSize={0.045}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={opacity * 0.9}
          letterSpacing={0.15}
        >
          ADVANCED HEALTHCARE TECHNOLOGY
        </Text>
      </Float>
    </group>
  );
}

interface Mri3DViewerProps {
  height?: string;
}

export const Mri3DViewer: React.FC<Mri3DViewerProps> = ({ height = '650px' }) => {
  const [textOpacity, setTextOpacity] = useState(0);

  return (
    <div style={{ width: '100%', height: height, background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow shadow-mapSize={1024} />
        <pointLight position={[0, 1.48, 0.5]} color="#00e5ff" intensity={4.5} distance={6} />

        <Suspense fallback={null}>
          <MriScannerModel position={[0, 0, 0]} />
          <ScannerBoreText opacity={textOpacity} />
          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={10} blur={1.5} far={4} />
          <Environment preset="city" />
        </Suspense>

        <CameraController onOpacityChange={setTextOpacity} />
      </Canvas>
    </div>
  );
};
