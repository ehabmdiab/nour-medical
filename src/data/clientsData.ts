export interface InstalledDevice {
  name: string;
  category: 'Cath-Lab' | 'CT Scanner' | 'MRI' | 'C-Arm' | 'Digital X-Ray' | 'DR X-Ray' | 'CSSD & Sterilization';
  serviceType: 'Turnkey Supply & Installation' | 'Preventive Maintenance (AMC)' | 'Emergency Maintenance & Spare Parts' | 'Multi-Vendor Support' | 'Digital DR Retrofit';
  status: 'Active Support' | 'Full Service Contract' | 'Turnkey Installed';
  description: string;
}

export interface ClientFacility {
  id: string;
  name: string;
  location: string;
  region: 'Greater Cairo' | 'Delta' | 'Upper Egypt' | 'Red Sea & Coast' | 'Nationwide';
  facilityType: 'Hospital' | 'Scan Center' | 'University Hospital' | 'Specialized Heart Center' | 'Government & Military';
  featured: boolean;
  images: string[];
  primaryCategories: ('Cath-Lab' | 'CT' | 'MRI' | 'C-Arm' | 'DR X-Ray' | 'CSSD & Sterilization')[];
  devices: InstalledDevice[];
}

const BASE = import.meta.env.BASE_URL || '/';

export const DETAILED_CLIENTS: ClientFacility[] = [
  {
    id: 'capital-care',
    name: 'Capital Care Hospital',
    location: '6th of October, Giza',
    region: 'Greater Cairo',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/capital-care-ct.jpg`,
      `${BASE}images/clients/capital-care-logo.jpeg`,
    ],
    primaryCategories: ['CT'],
    devices: [
      {
        name: '64-Slice Volumetric CT Scanner',
        category: 'CT Scanner',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Complete helical CT suite installation with radiation lead shielding construction and PACS workstation setup.',
      },
    ],
  },
  {
    id: 'elite-heart',
    name: 'Elite Heart Center (Dr. Alaa Ezat)',
    location: 'Maadi, Cairo',
    region: 'Greater Cairo',
    facilityType: 'Specialized Heart Center',
    featured: true,
    images: [
      `${BASE}images/clients/elite-heart-cathlab.jpg`,
      `${BASE}images/clients/elite-heart-logo-alaa-ezat.png`,
      `${BASE}images/clients/elite-heart-logo.png`,
    ],
    primaryCategories: ['Cath-Lab'],
    devices: [
      {
        name: 'High-Precision Coronary Cath-Lab Gantry',
        category: 'Cath-Lab',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Specialized cardiac center Cath-Lab system featuring low-dose fluoroscopy protocol and dedicated senior engineer account manager.',
      },
    ],
  },
  {
    id: 'al-marwa',
    name: 'Al-Marwa Hospital / Dr. Monir Othman',
    location: 'Dokki, Giza',
    region: 'Greater Cairo',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/al-marwah-building.jpeg`,
      `${BASE}images/clients/al-marwah-cathlab.jpeg`,
      `${BASE}images/clients/al-marwah-dr-1.jpg`,
      `${BASE}images/clients/al-marwah-dr-2.jpg`,
    ],
    primaryCategories: ['Cath-Lab', 'DR X-Ray'],
    devices: [
      {
        name: 'Single-Plane Cardiac Cath-Lab',
        category: 'Cath-Lab',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Full Service Contract',
        description: 'High-utilization cardiac catheterization laboratory maintaining zero-downtime SLA through proactive generator and anode wear checks.',
      },
      {
        name: 'Digital Radiography (DR) Suites',
        category: 'DR X-Ray',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Dual digital X-ray rooms equipped with high-resolution wireless flat panel detectors and PACS workstation connectivity.',
      },
    ],
  },
  {
    id: 'al-tayseer',
    name: 'Al-Tayseer Hospitals',
    location: 'Zagazig, Sharqia',
    region: 'Delta',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/al-tayseer-building.jpeg`,
      `${BASE}images/clients/al-tayseer-main-doctors.jpg`,
      `${BASE}images/clients/al-tayseer-team-work.jpg`,
      `${BASE}images/clients/al-tayseer-ramadan-event.jpg`,
    ],
    primaryCategories: ['Cath-Lab', 'MRI', 'DR X-Ray'],
    devices: [
      {
        name: 'Hospital Radiology Complex & Cath-Lab Fleet',
        category: 'Cath-Lab',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Full Service Contract',
        description: 'Comprehensive hospital radiology and angiography maintenance contract backed by dedicated resident engineering response.',
      },
    ],
  },
  {
    id: 'golden-heart',
    name: 'Golden Heart Specialized Hospital',
    location: 'Maadi, Cairo',
    region: 'Greater Cairo',
    facilityType: 'Specialized Heart Center',
    featured: true,
    images: [
      `${BASE}images/clients/golden-heart-building.jpeg`,
      `${BASE}images/clients/golden-heart-cathlab.jpeg`,
      `${BASE}images/clients/golden-heart-staff-1.jpeg`,
      `${BASE}images/clients/golden-heart-staff-2.jpeg`,
    ],
    primaryCategories: ['Cath-Lab'],
    devices: [
      {
        name: 'Coronary Angiography Cath-Lab Suite',
        category: 'Cath-Lab',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Full Service Contract',
        description: 'Dedicated cardiac catheterization room support with 2-hour emergency response and routine preventive health checks.',
      },
    ],
  },
  {
    id: 'al-rayan',
    name: 'Al-Rayyan Scan Center',
    location: 'Minya',
    region: 'Upper Egypt',
    facilityType: 'Scan Center',
    featured: true,
    images: [
      `${BASE}images/clients/al-rayan-ct.jpg`,
      `${BASE}images/clients/al-rayan-vct.jpeg`,
    ],
    primaryCategories: ['CT'],
    devices: [
      {
        name: 'Multi-Slice CT & Volumetric CT Suites',
        category: 'CT Scanner',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Full Service Contract',
        description: 'Multi-slice helical CT and volumetric imaging scanner calibration, radiation protocol guard, and tube maintenance.',
      },
    ],
  },
  {
    id: 'aseel-hospital',
    name: 'Aseel Hospital',
    location: 'Hurghada, Red Sea',
    region: 'Red Sea & Coast',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/aseel-building.jpeg`,
      `${BASE}images/clients/aseel-c-arm.jpeg`,
      `${BASE}images/clients/aseel-staff.jpg`,
    ],
    primaryCategories: ['C-Arm'],
    devices: [
      {
        name: 'High-Frequency Surgical Mobile C-Arm',
        category: 'C-Arm',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Intraoperative fluoroscopy C-arm unit supporting orthopedic and trauma surgery with laser positioning guides.',
      },
    ],
  },
  {
    id: 'al-zahra-el-nokhba',
    name: 'Al-Zahra & El Nokhba Hospital',
    location: 'Kafr El Sheikh',
    region: 'Delta',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/al-zahraa-building.jpeg`,
      `${BASE}images/clients/al-zahraa-cathlab.jpeg`,
      `${BASE}images/clients/el-nokhba-logo.png`,
      `${BASE}images/clients/al-zahraa-dr-mohamed-salama.jpg`,
    ],
    primaryCategories: ['Cath-Lab'],
    devices: [
      {
        name: 'Interventional Cath-Lab & Diagnostic Suite',
        category: 'Cath-Lab',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Cardiovascular angiography suite installed with DICOM PACS workstation integration and preventive maintenance.',
      },
    ],
  },
  {
    id: 'banha-university',
    name: 'Banha University Hospital',
    location: 'Banha, Qalyubia',
    region: 'Delta',
    facilityType: 'University Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/banha-hospital-building.jpeg`,
    ],
    primaryCategories: ['Cath-Lab', 'DR X-Ray'],
    devices: [
      {
        name: 'Radiology Department Diagnostic Systems',
        category: 'DR X-Ray',
        serviceType: 'Multi-Vendor Support',
        status: 'Active Support',
        description: 'University hospital radiology department technical support and safety sign-off.',
      },
    ],
  },
  {
    id: 'el-gouna',
    name: 'El Gouna Hospital',
    location: 'El Gouna, Red Sea',
    region: 'Red Sea & Coast',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/el-gouna-team-work.jpg`,
      `${BASE}images/clients/el-gouna-logo.png`,
    ],
    primaryCategories: ['Cath-Lab', 'CSSD & Sterilization'],
    devices: [
      {
        name: 'Radiology & Biomedical Technical Support',
        category: 'Cath-Lab',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Full Service Contract',
        description: 'Comprehensive biomedical equipment support and preventive maintenance agreements.',
      },
    ],
  },
  {
    id: 'el-salama',
    name: 'El-Salama Hospital (Dr. Omar Nagy)',
    location: 'Minya',
    region: 'Upper Egypt',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/el-salama-building.jpeg`,
    ],
    primaryCategories: ['Cath-Lab', 'CT'],
    devices: [
      {
        name: 'Cath-Lab & CT Radiology Systems',
        category: 'Cath-Lab',
        serviceType: 'Multi-Vendor Support',
        status: 'Active Support',
        description: 'Multi-vendor emergency maintenance and flat panel detector calibration.',
      },
    ],
  },
  {
    id: 'al-safwa-faqous',
    name: 'Al-Safwa Center',
    location: 'Faqus, Sharqia',
    region: 'Delta',
    facilityType: 'Scan Center',
    featured: true,
    images: [
      `${BASE}images/clients/al-safwaa-faqous-building.png`,
      `${BASE}images/clients/al-safwaa-faqous-ct.jpeg`,
    ],
    primaryCategories: ['CT'],
    devices: [
      {
        name: 'Diagnostic Multi-Slice CT Scanner',
        category: 'CT Scanner',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Multi-detector CT scanning suite installed with lead shielding and PACS gateway.',
      },
    ],
  },
  {
    id: 'al-safwa-6-october',
    name: 'Al-Safwa Hospital',
    location: '6th of October, Giza',
    region: 'Greater Cairo',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/al-safwaa-6-october-building-1.jpeg`,
      `${BASE}images/clients/al-safwaa-6-october-building-2.jpeg`,
    ],
    primaryCategories: ['Cath-Lab', 'DR X-Ray'],
    devices: [
      {
        name: 'Hospital Diagnostic Wing Infrastructure',
        category: 'DR X-Ray',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Active Support',
        description: 'Scheduled preventive maintenance and radiographic equipment inspections.',
      },
    ],
  },
  {
    id: 'intl-rad-mri',
    name: 'International Center for Radiology and MRI (IRC)',
    location: 'Helwan, Cairo',
    region: 'Greater Cairo',
    facilityType: 'Scan Center',
    featured: true,
    images: [
      `${BASE}images/clients/irc-building.png`,
    ],
    primaryCategories: ['CT', 'DR X-Ray'],
    devices: [
      {
        name: 'Radiology & Imaging Department',
        category: 'DR X-Ray',
        serviceType: 'Digital DR Retrofit',
        status: 'Turnkey Installed',
        description: 'Digital X-ray imaging retrofit and diagnostic equipment servicing.',
      },
    ],
  },
  {
    id: 'nile-center',
    name: 'Nile Center for Radiology',
    location: 'Cairo & Giza',
    region: 'Greater Cairo',
    facilityType: 'Scan Center',
    featured: true,
    images: [
      `${BASE}images/clients/nile-centre-building.jpeg`,
    ],
    primaryCategories: ['CT'],
    devices: [
      {
        name: 'Diagnostic Radiology Imaging Suite',
        category: 'CT Scanner',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Active Support',
        description: 'Helical CT unit support and detector maintenance.',
      },
    ],
  },
  {
    id: 'south-sinai',
    name: 'South Sinai Hospital',
    location: 'Sharm El Sheikh',
    region: 'Red Sea & Coast',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/south-sinai-logo.png`,
    ],
    primaryCategories: ['Cath-Lab'],
    devices: [
      {
        name: 'Cath-Lab Diagnostic System',
        category: 'Cath-Lab',
        serviceType: 'Preventive Maintenance (AMC)',
        status: 'Full Service Contract',
        description: 'Cardiac fluoroscopy and angiography gantry supported with annual maintenance contract.',
      },
    ],
  },
  {
    id: 'tiba-center',
    name: 'Tiba Scan & Diagnostic Center',
    location: 'Minya',
    region: 'Upper Egypt',
    facilityType: 'Scan Center',
    featured: true,
    images: [
      `${BASE}images/clients/tiba-scan-logo.jpeg`,
    ],
    primaryCategories: ['MRI', 'CT'],
    devices: [
      {
        name: 'High-Field MRI & CT Diagnostic Center',
        category: 'MRI',
        serviceType: 'Multi-Vendor Support',
        status: 'Active Support',
        description: 'Comprehensive diagnostic imaging center support.',
      },
    ],
  },
  {
    id: 'el-assema',
    name: 'El Assema Hospital',
    location: 'Minya El Qamh, Sharqia',
    region: 'Delta',
    facilityType: 'Hospital',
    featured: true,
    images: [
      `${BASE}images/clients/el-assema-logo.jpeg`,
    ],
    primaryCategories: ['Cath-Lab'],
    devices: [
      {
        name: 'Cath-Lab Fluoroscopy Unit',
        category: 'Cath-Lab',
        serviceType: 'Turnkey Supply & Installation',
        status: 'Turnkey Installed',
        description: 'Full room lead shielding, power conditioning, and Cath-Lab gantry calibration.',
      },
    ],
  },
];
