import React from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { ProductShowcase } from '../components/organisms/ProductShowcase';
import { SectionHeading } from '../components/atoms/SectionHeading';

export const ProductsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-16 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="MEDICAL EQUIPMENT ECOSYSTEM"
            title="Radiology & Diagnostic Systems"
            subtitle="Explore high-field MRI scanners, multi-slice CT units, digital X-ray detectors, hospital furniture, central sterilization, and spare parts."
          />
        </div>
        <ProductShowcase />
      </div>
    </PageTransition>
  );
};
