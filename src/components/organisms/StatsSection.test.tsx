import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StatsSection } from './StatsSection';

describe('StatsSection Component', () => {
  it('renders stats section with capabilities metrics', () => {
    const html = renderToString(<StatsSection />);
    expect(html).toContain('Technical Infrastructure');
    expect(html).toContain('Core Operational Strength');
    expect(html).toContain('Field Service Engineers &amp; Technical Staff');
    expect(html).toContain('Spare Parts Storage Facility');
  });
});
