import React, { useEffect, useRef, useState } from 'react';
import { ClientMarquee } from '../components/organisms/ClientMarquee';
import {
  ALL_CLIENTS,
  CATH_LAB_CLIENTS,
  C_ARM_CLIENTS,
  CT_CLIENTS,
  MRI_CLIENTS,
} from '../data/companyData';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface ClientGroupProps {
  title: string;
  count: string;
  clients: string[];
  index: number;
  visible: boolean;
}

const ClientGroup: React.FC<ClientGroupProps> = ({ title, count, clients, index, visible }) => (
  <div
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s var(--ease-smooth) ${index * 0.1}s, transform 0.6s var(--ease-smooth) ${index * 0.1}s`,
    }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingBottom: '14px',
      borderBottom: '1px solid var(--gray-light)',
      marginBottom: '20px',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.125rem',
        fontWeight: 700,
        color: 'var(--navy)',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--teal-accent)',
      }}>
        {count}
      </span>
    </div>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {clients.map((client) => (
        <li
          key={client}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--blue-medical)',
            flexShrink: 0,
          }} />
          {client}
        </li>
      ))}
    </ul>
  </div>
);

export const ClientsPage: React.FC = () => {
  const { ref: groupRef, visible: groupVisible } = useReveal();
  const { ref: listRef, visible: listVisible } = useReveal();

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--navy)', padding: '100px 0 80px' }}>
        <div className="container">
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
            Client References
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            maxWidth: '700px',
            marginBottom: '32px',
          }}>
            Trusted by Healthcare Organizations Across Egypt
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '520px',
          }}>
            Nour Medical has developed an established list of healthcare entities across Egypt, spanning hospitals, scan centers, and specialized medical facilities.
          </p>
          <div style={{
            display: 'flex',
            gap: '48px',
            marginTop: '56px',
            flexWrap: 'wrap',
          }}>
            {[
              { value: `${ALL_CLIENTS.length}+`, label: 'Reference Sites' },
              { value: '40+', label: 'X-Ray AMCs' },
              { value: '30+', label: 'Cath-Lab AMCs' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--white)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '4px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <ClientMarquee />

      {/* References by Equipment */}
      <section
        ref={groupRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: groupVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">References by Equipment Type</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Client References by System
            </h2>
          </div>

          <div className="grid-2" style={{ gap: 'clamp(32px, 5vw, 64px)' }}>
            <ClientGroup
              title="Cath-Lab References"
              count={`${CATH_LAB_CLIENTS.length} facilities`}
              clients={CATH_LAB_CLIENTS}
              index={0}
              visible={groupVisible}
            />
            <ClientGroup
              title="C-Arm References"
              count={`${C_ARM_CLIENTS.length} facilities`}
              clients={C_ARM_CLIENTS}
              index={1}
              visible={groupVisible}
            />
            <ClientGroup
              title="CT References"
              count={`${CT_CLIENTS.length} facilities`}
              clients={CT_CLIENTS}
              index={2}
              visible={groupVisible}
            />
            <ClientGroup
              title="MRI References"
              count={`${MRI_CLIENTS.length} facilities`}
              clients={MRI_CLIENTS}
              index={3}
              visible={groupVisible}
            />
          </div>
        </div>
      </section>

      {/* Full Geographic Client List */}
      <section
        ref={listRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: listVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '56px' }}>
            <div className="section-label">Full Reference List</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Healthcare Organizations We Serve
            </h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Organization</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {ALL_CLIENTS.map((client, i) => (
                  <tr
                    key={client.name}
                    style={{
                      opacity: listVisible ? 1 : 0,
                      transition: `opacity 0.4s var(--ease-smooth) ${Math.min(i * 0.02, 0.5)}s`,
                    }}
                  >
                    <td style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: 'var(--stone)',
                      letterSpacing: '0.05em',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td style={{ fontWeight: 500, color: 'var(--text-body)' }}>
                      {client.name}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {client.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
