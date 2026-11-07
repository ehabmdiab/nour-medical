import { describe, expect, it } from 'vitest';
import viewerSource from './Mri3DViewer.tsx?raw';
import indexHtml from '../../../index.html?raw';

// Lazy globs: only the keys (file paths) are inspected, the assets are never loaded.
const hdriFiles = Object.keys(import.meta.glob('../../../public/hdri/*.hdr'));
const modelFiles = Object.keys(import.meta.glob('../../../public/models/*.glb'));

describe('3D asset loading', () => {
  it('self-hosts the environment HDR instead of fetching it from a third-party CDN', () => {
    expect(hdriFiles.some((f) => f.endsWith('/potsdamer_platz_1k.hdr'))).toBe(true);

    // preset="..." makes drei download the HDR from raw.githack.com at runtime
    expect(viewerSource).not.toMatch(/<Environment[^>]*preset=/);
    expect(viewerSource).toContain('hdri/potsdamer_platz_1k.hdr');
  });

  it('starts the model and environment downloads in parallel at module load', () => {
    expect(viewerSource).toContain('useGLTF.preload(MODEL_URL)');
    expect(viewerSource).toContain('useEnvironment.preload({ files: ENV_URL })');
  });

  it('preloads the model and environment from index.html so they download alongside the JS bundle', () => {
    expect(indexHtml).toMatch(/<link rel="preload"[^>]*models\/nour-mri-scanner\.glb[^>]*as="fetch"/);
    expect(indexHtml).toMatch(/<link rel="preload"[^>]*hdri\/potsdamer_platz_1k\.hdr[^>]*as="fetch"/);
  });

  it('ships the model that index.html preloads', () => {
    expect(modelFiles.some((f) => f.endsWith('/nour-mri-scanner.glb'))).toBe(true);
  });
});
