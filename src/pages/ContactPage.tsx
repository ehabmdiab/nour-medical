import React from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { ContactForm } from '../components/organisms/ContactForm';
import { SectionHeading } from '../components/atoms/SectionHeading';

export const ContactPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="COMMUNICATION & INQUIRIES"
            title="Let's Talk About Your Next Project"
            subtitle="Connect with Nour Medical's Cairo headquarters for equipment procurement, installation proposals, or 24/7 technical service contracts."
          />

          <ContactForm />
        </div>
      </div>
    </PageTransition>
  );
};
