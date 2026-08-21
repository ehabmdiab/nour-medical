import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

function MriScannerModel(props: any) {
  const modelUrl = `${import.meta.env.BASE_URL}models/philips-mri-scanner.glb`;
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} {...props} />;
}

// Preload model
try {
  useGLTF.preload(`${import.meta.env.BASE_URL}models/philips-mri-scanner.glb`);
} catch (e) {
  // Safe preload fallback
}

interface Mri3DViewerProps {
  height?: string;
}

export const Mri3DViewer: React.FC<Mri3DViewerProps> = ({ height = '440px' }) => {
  return (
    <div style={{ width: '100%', height: height, background: '#09121f', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [3.2, 2.2, 3.6], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow shadow-mapSize={1024} />
        <pointLight position={[0, 1.5, 0]} color="#00e5ff" intensity={2.5} distance={4} />

        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#1B4FD8" wireframe />
          </mesh>
        }>
          <MriScannerModel position={[0, 0, 0]} />
          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={10} blur={1.5} far={4} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          makeDefault
          minDistance={1}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05}
          target={[0, 1.3, 0.4]}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};
