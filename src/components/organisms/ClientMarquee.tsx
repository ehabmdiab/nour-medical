import React from 'react';
import { ALL_CLIENTS } from '../../data/companyData';

const SEPARATOR = ' · ';

export const ClientMarquee: React.FC = () => {
  // Build marquee text from all client names
  const allNames = ALL_CLIENTS.map(c => c.name);
  // Duplicate for seamless loop
  const track = [...allNames, ...allNames];

  return (
    <section style={{
      background: 'var(--navy)',
      padding: '28px 0',
      overflow: 'hidden',
    }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {track.map((name, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                whiteSpace: 'nowrap',
                paddingRight: '0',
              }}
            >
              {name}
              <span style={{ color: 'var(--teal-accent)', margin: '0 24px' }}>
                {SEPARATOR}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
