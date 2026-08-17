import React from 'react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ServiceTimelineItem } from '../molecules/ServiceTimelineItem';
import { SectionHeading } from '../atoms/SectionHeading';

export const ServicesTimeline: React.FC = () => {
  return (
    <section className="py-28 relative bg-slate-50/80 overflow-hidden border-t border-slate-200">
      <div className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="ENGINEERING WORKFLOW & SUPPORT"
          title="Turnkey Installation & Lifetime Maintenance"
          subtitle="From site preparation and radiation shielding calculation to equipment rigging, commissioning, and 24/7 hotline technical service."
        />

        {/* Timeline Items Stack */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {SERVICES_DATA.map((service, index) => (
            <ServiceTimelineItem
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
