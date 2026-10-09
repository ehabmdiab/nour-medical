import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FloatingUniverseGallery } from './FloatingUniverseGallery';

describe('FloatingUniverseGallery Component', () => {
  it('renders floating universe gallery container and category filters', () => {
    const html = renderToString(<FloatingUniverseGallery />);
    expect(html).toContain('floating-universe-section');
    expect(html).toContain('Medical Imaging Universe');
  });
});
