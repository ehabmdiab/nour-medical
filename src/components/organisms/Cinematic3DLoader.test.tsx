import { renderToString } from 'react-dom/server';
import { describe, expect, it, beforeAll, vi } from 'vitest';
import { Cinematic3DLoader } from './Cinematic3DLoader';

// Mock @react-three/fiber Canvas and drei to allow SSR render testing
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children?: React.ReactNode }) => <div data-testid="canvas-mock">{children}</div>,
  useFrame: () => {},
  useThree: () => ({
    camera: { position: { set: () => {}, lerp: () => {} }, lookAt: () => {} },
    size: { width: 1200, height: 800 },
  }),
}));

vi.mock('@react-three/drei', () => ({
  useGLTF: () => ({
    scene: {
      traverse: () => {},
    },
  }),
  useTexture: () => ({
    colorSpace: '',
  }),
  Float: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

describe('Cinematic3DLoader', () => {
  beforeAll(() => {
    if (typeof globalThis.window === 'undefined') {
      globalThis.window = {
        location: {
          search: '',
        },
        addEventListener: () => {},
        removeEventListener: () => {},
        innerWidth: 1920,
        innerHeight: 1080,
      } as unknown as Window & typeof globalThis;
    }

    if (typeof globalThis.document === 'undefined') {
      globalThis.document = {
        body: { style: { overflow: '' } },
        documentElement: { style: { overflow: '' } },
      } as unknown as Document;
    }
  });

  it('renders with accessibility dialog role and old dark background', () => {
    const html = renderToString(<Cinematic3DLoader />);
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-label="Loading Nour Medical"');
    expect(html).toContain('bg-[#07111e]');
    expect(html).toContain('Healthcare Technology · Est. 2015');
  });
});
