import React from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { OrbitGallery3D } from '../components/organisms/OrbitGallery3D';
import { SectionHeading } from '../components/atoms/SectionHeading';

export const GalleryPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-16 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="VISUAL ENGINEERING LOG"
            title="3D Showcases & Installation Gallery"
            subtitle="Explore high-resolution visual records of heavy CT/MRI gantry rigging, Cath-Lab deployments, and hospital radiology facilities."
          />
        </div>
        <OrbitGallery3D />
      </div>
    </PageTransition>
  );
};
