export type GalleryCategoryType =
  | 'all'
  | 'machines'
  | 'hospitals'
  | 'doctors'
  | 'team'
  | 'seminar';

export interface GalleryImageDetail {
  src: string;
  caption?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategoryType;
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  images: string[];
  imageDetails?: GalleryImageDetail[];
  videoUrl?: string;
  date: string;
  specs: string;
}

const BASE = import.meta.env.BASE_URL || '/';

export const GALLERY_CATEGORIES: { id: GalleryCategoryType; label: string }[] = [
  { id: 'all', label: 'All Media' },
  { id: 'machines', label: 'Radiology Systems & Machines' },
  { id: 'hospitals', label: 'Hospital Installations' },
  { id: 'doctors', label: 'VIP Doctors & Medical Leaders' },
  { id: 'team', label: 'Nour Medical Team' },
  { id: 'seminar', label: 'Annual Scientific Seminar' },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-machines-1",
    title: "Angel DTP580 Dynamic Flat Panel Fluoroscopy System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel DTP580 Dynamic Flat Panel Fluoroscopy System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-dtp580-series.jpeg`,
    images: [
      `${BASE}images/products/angel-dtp580-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-dtp580-series.jpeg`,
        caption: "Angel DTP580 Dynamic Flat Panel Fluoroscopy System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-2",
    title: "Angel Fanghua Ceiling Digital Radiography System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel Fanghua Ceiling Digital Radiography System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-fanghua-series.jpeg`,
    images: [
      `${BASE}images/products/angel-fanghua-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-fanghua-series.jpeg`,
        caption: "Angel Fanghua Ceiling Digital Radiography System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-3",
    title: "Angel HUA II Floor-Mounted Digital Radiography System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel HUA II Floor-Mounted Digital Radiography System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-hua-ii-series.jpeg`,
    images: [
      `${BASE}images/products/angel-hua-ii-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-hua-ii-series.jpeg`,
        caption: "Angel HUA II Floor-Mounted Digital Radiography System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-4",
    title: "Angel Lingxi Premium Ceiling Suspension Digital X-Ray",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel Lingxi Premium Ceiling Suspension Digital X-Ray — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-lingxi-series.jpeg`,
    images: [
      `${BASE}images/products/angel-lingxi-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-lingxi-series.jpeg`,
        caption: "Angel Lingxi Premium Ceiling Suspension Digital X-Ray",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-5",
    title: "Angel MTP Series Mobile Digital Radiography System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel MTP Series Mobile Digital Radiography System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-mtp-series.jpeg`,
    images: [
      `${BASE}images/products/angel-mtp-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-mtp-series.jpeg`,
        caption: "Angel MTP Series Mobile Digital Radiography System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-6",
    title: "Angel QOMO Series Compact Mobile DR System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel QOMO Series Compact Mobile DR System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-qomo-series.jpeg`,
    images: [
      `${BASE}images/products/angel-qomo-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-qomo-series.jpeg`,
        caption: "Angel QOMO Series Compact Mobile DR System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-7",
    title: "Angel Talent II Multi-Functional Dynamic DR System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel Talent II Multi-Functional Dynamic DR System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-talent-ii-series.jpeg`,
    images: [
      `${BASE}images/products/angel-talent-ii-series.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-talent-ii-series.jpeg`,
        caption: "Angel Talent II Multi-Functional Dynamic DR System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-8",
    title: "Angel WR-3D Weight-Bearing 3D Imaging DR System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "Angel WR-3D Weight-Bearing 3D Imaging DR System — High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/products/angel-wr-3d.jpeg`,
    images: [
      `${BASE}images/products/angel-wr-3d.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/angel-wr-3d.jpeg`,
        caption: "Angel WR-3D Weight-Bearing 3D Imaging DR System",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-9",
    title: "Angel Radiology Technology Presentation",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Angel Medical Imaging / Nour Medical",
    description: "High-performance digital radiography modality delivering crisp diagnostic contrast, automated organ positioning, and ultra-low radiation dosage.",
    image: `${BASE}images/gallery/angel/angel-dsc00373.jpg`,
    images: [
      `${BASE}images/gallery/angel/angel-dsc00373.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00374.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00760.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00762.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00765.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00766.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00772.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00779.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00781.jpg`,
      `${BASE}images/gallery/angel/angel-dsc00784.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/angel/angel-dsc00373.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00373)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00374.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00374)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00760.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00760)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00762.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00762)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00765.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00765)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00766.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00766)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00772.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00772)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00779.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00779)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00781.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00781)",
      },
      {
        src: `${BASE}images/gallery/angel/angel-dsc00784.jpg`,
        caption: "Angel Radiology Technology Presentation (DSC00784)",
      },
    ],
    date: "2024-2025",
    specs: "CsI Flat Panel Technology | DICOM 3.0 Real-time Cloud Sync",
  },
  {
    id: "gal-machines-19",
    title: "Lonwin Superconducting 3.0T MRI System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Lonwin Medical Systems / Nour Medical",
    description: "Lonwin Superconducting 3.0T MRI System — Diagnostic imaging and sterilization technology engineered for maximum clinical uptime and patient safety.",
    image: `${BASE}images/products/lonwin-mri-system.jpeg`,
    images: [
      `${BASE}images/products/lonwin-mri-system.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/lonwin-mri-system.jpeg`,
        caption: "Lonwin Superconducting 3.0T MRI System",
      },
    ],
    date: "2024-2025",
    specs: "Cryogenic / High Frequency Architecture | ISO 13485 Certified",
  },
  {
    id: "gal-machines-20",
    title: "Lonwin Automated Medical Equipment Disinfection System",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Lonwin Medical Systems / Nour Medical",
    description: "Lonwin Automated Medical Equipment Disinfection System — Diagnostic imaging and sterilization technology engineered for maximum clinical uptime and patient safety.",
    image: `${BASE}images/products/lonwin-disinfection-system.jpeg`,
    images: [
      `${BASE}images/products/lonwin-disinfection-system.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/products/lonwin-disinfection-system.jpeg`,
        caption: "Lonwin Automated Medical Equipment Disinfection System",
      },
    ],
    date: "2024-2025",
    specs: "Cryogenic / High Frequency Architecture | ISO 13485 Certified",
  },
  {
    id: "gal-machines-21",
    title: "Lonwin Medical Diagnostic Imaging Demonstration",
    category: "machines",
    categoryLabel: "Radiology Systems & Machines",
    location: "Lonwin Medical Systems / Nour Medical",
    description: "Diagnostic imaging and sterilization technology engineered for maximum clinical uptime and patient safety.",
    image: `${BASE}images/gallery/lonwin/lonwin-dsc00726.jpg`,
    images: [
      `${BASE}images/gallery/lonwin/lonwin-dsc00726.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00728.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00730.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00731.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00736.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00737.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00739.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00740.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00749.jpg`,
      `${BASE}images/gallery/lonwin/lonwin-dsc00751.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00726.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00726)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00728.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00728)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00730.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00730)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00731.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00731)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00736.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00736)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00737.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00737)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00739.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00739)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00740.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00740)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00749.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00749)",
      },
      {
        src: `${BASE}images/gallery/lonwin/lonwin-dsc00751.jpg`,
        caption: "Lonwin Medical Diagnostic Imaging Demonstration (DSC00751)",
      },
    ],
    date: "2024-2025",
    specs: "Cryogenic / High Frequency Architecture | ISO 13485 Certified",
  },
  {
    id: "gal-team-31",
    title: "Eng. Sayed Awad — Chairman & CEO",
    category: "team",
    categoryLabel: "Nour Medical Team",
    location: "Nour Medical Headquarters, Maadi, Cairo",
    description: "Eng. Sayed Awad — Chairman & CEO — Professional biomedical service engineers, technicians, and executive leadership driving operational excellence across Egypt.",
    image: `${BASE}images/team/eng-sayed-awad.jpg`,
    images: [
      `${BASE}images/team/eng-sayed-awad.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/team/eng-sayed-awad.jpg`,
        caption: "Eng. Sayed Awad — Chairman & CEO",
      },
    ],
    date: "2024-2025",
    specs: "Biomedical Engineering & 24/7 Field Response Service",
  },
  {
    id: "gal-team-32",
    title: "Dr. Gehan — Medical Director",
    category: "team",
    categoryLabel: "Nour Medical Team",
    location: "Nour Medical Headquarters, Maadi, Cairo",
    description: "Dr. Gehan — Medical Director — Professional biomedical service engineers, technicians, and executive leadership driving operational excellence across Egypt.",
    image: `${BASE}images/team/dr-gehan.jpg`,
    images: [
      `${BASE}images/team/dr-gehan.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/team/dr-gehan.jpg`,
        caption: "Dr. Gehan — Medical Director",
      },
    ],
    date: "2024-2025",
    specs: "Biomedical Engineering & 24/7 Field Response Service",
  },
  {
    id: "gal-team-33",
    title: "Nour Medical Engineering & Technical Team",
    category: "team",
    categoryLabel: "Nour Medical Team",
    location: "Nour Medical Headquarters, Maadi, Cairo",
    description: "Professional biomedical service engineers, technicians, and executive leadership driving operational excellence across Egypt.",
    image: `${BASE}images/team/team-dsc00614.jpg`,
    images: [
      `${BASE}images/team/team-dsc00614.jpg`,
      `${BASE}images/team/team-dsc00616.jpg`,
      `${BASE}images/team/team-dsc00634.jpg`,
      `${BASE}images/team/team-dsc00636.jpg`,
      `${BASE}images/team/team-dsc00642.jpg`,
      `${BASE}images/team/team-dsc00645.jpg`,
      `${BASE}images/team/team-dsc00652.jpg`,
      `${BASE}images/team/team-dsc00659.jpg`,
      `${BASE}images/team/team-dsc00669.jpg`,
      `${BASE}images/team/team-dsc00708.jpg`,
      `${BASE}images/team/team-dsc00709.jpg`,
      `${BASE}images/team/team-dsc00712.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/team/team-dsc00614.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00614)",
      },
      {
        src: `${BASE}images/team/team-dsc00616.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00616)",
      },
      {
        src: `${BASE}images/team/team-dsc00634.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00634)",
      },
      {
        src: `${BASE}images/team/team-dsc00636.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00636)",
      },
      {
        src: `${BASE}images/team/team-dsc00642.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00642)",
      },
      {
        src: `${BASE}images/team/team-dsc00645.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00645)",
      },
      {
        src: `${BASE}images/team/team-dsc00652.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00652)",
      },
      {
        src: `${BASE}images/team/team-dsc00659.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00659)",
      },
      {
        src: `${BASE}images/team/team-dsc00669.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00669)",
      },
      {
        src: `${BASE}images/team/team-dsc00708.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00708)",
      },
      {
        src: `${BASE}images/team/team-dsc00709.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00709)",
      },
      {
        src: `${BASE}images/team/team-dsc00712.jpg`,
        caption: "Nour Medical Engineering & Technical Team (DSC00712)",
      },
    ],
    date: "2024-2025",
    specs: "Biomedical Engineering & 24/7 Field Response Service",
  },
  {
    id: "gal-team-45",
    title: "Nour Medical Team Gathering & Field Assembly",
    category: "team",
    categoryLabel: "Nour Medical Team",
    location: "Nour Medical Headquarters, Maadi, Cairo",
    description: "Nour Medical Team Gathering & Field Assembly #1 — Professional biomedical service engineers, technicians, and executive leadership driving operational excellence across Egypt.",
    image: `${BASE}images/team/team-gathering-1.jpeg`,
    images: [
      `${BASE}images/team/team-gathering-1.jpeg`,
      `${BASE}images/team/team-gathering-2.jpeg`,
      `${BASE}images/team/team-gathering-3.jpeg`,
      `${BASE}images/team/team-gathering-4.jpeg`,
      `${BASE}images/team/team-gathering-5.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/team/team-gathering-1.jpeg`,
        caption: "Nour Medical Team Gathering & Field Assembly #1",
      },
      {
        src: `${BASE}images/team/team-gathering-2.jpeg`,
        caption: "Nour Medical Team Gathering & Field Assembly #2",
      },
      {
        src: `${BASE}images/team/team-gathering-3.jpeg`,
        caption: "Nour Medical Team Gathering & Field Assembly #3",
      },
      {
        src: `${BASE}images/team/team-gathering-4.jpeg`,
        caption: "Nour Medical Team Gathering & Field Assembly #4",
      },
      {
        src: `${BASE}images/team/team-gathering-5.jpeg`,
        caption: "Nour Medical Team Gathering & Field Assembly #5",
      },
    ],
    date: "2024-2025",
    specs: "Biomedical Engineering & 24/7 Field Response Service",
  },
  {
    id: "gal-doctors-50",
    title: "Prof. Dr. Mohamed Fawzy",
    category: "doctors",
    categoryLabel: "VIP Doctors & Medical Leaders",
    location: "Cairo, Egypt",
    description: "Prof. Dr. Mohamed Fawzy — Clinical consultations, scientific symposia, and diagnostic case discussions with top radiologists across Egypt.",
    image: `${BASE}images/doctors/dr-mohamed-fawzy.jpg`,
    images: [
      `${BASE}images/doctors/dr-mohamed-fawzy.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/doctors/dr-mohamed-fawzy.jpg`,
        caption: "Prof. Dr. Mohamed Fawzy",
      },
    ],
    date: "2024-2025",
    specs: "Academic Medical Consultation & Clinical Governance",
  },
  {
    id: "gal-doctors-51",
    title: "Prof. Dr. Ashraf Zaytoun",
    category: "doctors",
    categoryLabel: "VIP Doctors & Medical Leaders",
    location: "Cairo, Egypt",
    description: "Prof. Dr. Ashraf Zaytoun — Senior Clinical Radiology Consultant and Interventional Radiology Specialist. Clinical consultations, scientific symposia, and diagnostic case discussions with top radiologists across Egypt.",
    image: `${BASE}images/doctors/dr-ashraf-zaytoun.jpg`,
    images: [
      `${BASE}images/doctors/dr-ashraf-zaytoun.jpg`,
      `${BASE}images/doctors/dr-clinical-consultant-2.jpg`,
      `${BASE}images/doctors/dr-clinical-consultant-3.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/doctors/dr-ashraf-zaytoun.jpg`,
        caption: "Prof. Dr. Ashraf Zaytoun",
      },
      {
        src: `${BASE}images/doctors/dr-clinical-consultant-2.jpg`,
        caption: "Prof. Dr. Ashraf Zaytoun — Senior Clinical Radiology Consultant",
      },
      {
        src: `${BASE}images/doctors/dr-clinical-consultant-3.jpg`,
        caption: "Prof. Dr. Ashraf Zaytoun — Interventional Radiology Specialist",
      },
    ],
    date: "2024-2025",
    specs: "Academic Medical Consultation & Clinical Governance",
  },
  {
    id: "gal-doctors-52",
    title: "Dr. Ghalia Elmohani",
    category: "doctors",
    categoryLabel: "VIP Doctors & Medical Leaders",
    location: "Cairo, Egypt",
    description: "Dr. Ghalia Elmohani — Clinical consultations, scientific symposia, and diagnostic case discussions with top radiologists across Egypt.",
    image: `${BASE}images/doctors/dr-ghalia-elmohani.jpg`,
    images: [
      `${BASE}images/doctors/dr-ghalia-elmohani.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/doctors/dr-ghalia-elmohani.jpg`,
        caption: "Dr. Ghalia Elmohani",
      },
    ],
    date: "2024-2025",
    specs: "Academic Medical Consultation & Clinical Governance",
  },
  {
    id: "gal-doctors-55",
    title: "VIP Clinical Leadership & Radiology Symposium",
    category: "doctors",
    categoryLabel: "VIP Doctors & Medical Leaders",
    location: "Cairo, Egypt",
    description: "Clinical consultations, scientific symposia, and diagnostic case discussions with top radiologists across Egypt.",
    image: `${BASE}images/doctors/doctor-session-dsc00442.jpg`,
    images: [
      `${BASE}images/doctors/doctor-session-dsc00442.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00443.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00447.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00470.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00471.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00472.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00476.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00485.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00487.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00501.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00505.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00513.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00515.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00524.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00527.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00532.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00586.jpg`,
      `${BASE}images/doctors/doctor-session-dsc00590.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/doctors/doctor-session-dsc00442.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00442)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00443.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00443)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00447.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00447)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00470.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00470)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00471.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00471)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00472.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00472)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00476.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00476)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00485.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00485)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00487.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00487)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00501.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00501)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00505.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00505)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00513.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00513)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00515.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00515)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00524.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00524)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00527.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00527)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00532.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00532)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00586.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00586)",
      },
      {
        src: `${BASE}images/doctors/doctor-session-dsc00590.jpg`,
        caption: "VIP Clinical Leadership & Radiology Symposium (DSC00590)",
      },
    ],
    date: "2024-2025",
    specs: "Academic Medical Consultation & Clinical Governance",
  },
  {
    id: "gal-seminar-73",
    title: "Nour Medical Annual Scientific Seminar — 10 July 2025",
    category: "seminar",
    categoryLabel: "Annual Scientific Seminar",
    location: "Grand Nile Tower / Cairo Conference Center",
    description: "Nour Medical Annual Scientific Seminar bringing together over 300 radiologists, hospital directors, and international medical OEM partners.",
    image: `${BASE}images/seminar/seminar-dsc00346.jpg`,
    images: [
      `${BASE}images/seminar/seminar-dsc00346.jpg`,
      `${BASE}images/seminar/seminar-dsc00370.jpg`,
      `${BASE}images/seminar/seminar-dsc00435.jpg`,
      `${BASE}images/seminar/seminar-dsc00476.jpg`,
      `${BASE}images/seminar/seminar-dsc00532.jpg`,
      `${BASE}images/seminar/seminar-dsc00611.jpg`,
      `${BASE}images/seminar/seminar-dsc00636.jpg`,
      `${BASE}images/seminar/seminar-dsc00659.jpg`,
      `${BASE}images/seminar/seminar-dsc00684.jpg`,
      `${BASE}images/seminar/seminar-dsc00737.jpg`,
      `${BASE}images/seminar/seminar-dsc00740.jpg`,
      `${BASE}images/seminar/seminar-dsc00749.jpg`,
      `${BASE}images/seminar/seminar-dsc00751.jpg`,
      `${BASE}images/seminar/seminar-dsc00754.jpg`,
      `${BASE}images/seminar/seminar-dsc00760.jpg`,
      `${BASE}images/seminar/seminar-dsc00766.jpg`,
      `${BASE}images/seminar/seminar-dsc00779.jpg`,
      `${BASE}images/seminar/seminar-dsc00781.jpg`,
      `${BASE}images/seminar/seminar-dsc00784.jpg`,
      `${BASE}images/seminar/seminar-dsc00786.jpg`,
      `${BASE}images/seminar/seminar-dsc00790.jpg`,
      `${BASE}images/seminar/seminar-dsc00791.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/seminar/seminar-dsc00346.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00346)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00370.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00370)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00435.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00435)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00476.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00476)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00532.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00532)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00611.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00611)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00636.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00636)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00659.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00659)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00684.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00684)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00737.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00737)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00740.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00740)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00749.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00749)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00751.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00751)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00754.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00754)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00760.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00760)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00766.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00766)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00779.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00779)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00781.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00781)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00784.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00784)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00786.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00786)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00790.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00790)",
      },
      {
        src: `${BASE}images/seminar/seminar-dsc00791.jpg`,
        caption: "Nour Medical Annual Scientific Seminar — 10 July 2025 (DSC00791)",
      },
    ],
    date: "10 July 2025",
    specs: "Keynote Addresses, Live Modality Showcases & Academic Panels",
  },
  {
    id: "gal-clients-95",
    title: "Elite Heart Center — Cath-Lab & Cardiology Facilities",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Elite Heart Center, Maadi, Cairo",
    description: "Interventional cardiology catheterization suite and specialized cardiac imaging deployment.",
    image: `${BASE}images/clients/elite-heart-cathlab.jpg`,
    images: [
      `${BASE}images/clients/elite-heart-cathlab.jpg`,
      `${BASE}images/clients/elite-heart-logo-alaa-ezat.png`,
      `${BASE}images/clients/elite-heart-logo.png`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/elite-heart-cathlab.jpg`,
        caption: "Elite Heart Center — Cath-Lab Angiography Suite",
      },
      {
        src: `${BASE}images/clients/elite-heart-logo-alaa-ezat.png`,
        caption: "Elite Heart — Dr. Alaa Ezat Identity",
      },
      {
        src: `${BASE}images/clients/elite-heart-logo.png`,
        caption: "Elite Heart Center Logo",
      },
    ],
    date: "2024-2025",
    specs: "Single-Plane Cardiac Cath-Lab | Low Dose Protocol",
  },
  {
    id: "gal-clients-98",
    title: "El Assema Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "El Assema Hospital, Minya El Qamh, Sharqia",
    description: "Turnkey Cath-Lab fluoroscopy and lead shielding installation.",
    image: `${BASE}images/clients/el-assema-logo.jpeg`,
    images: [
      `${BASE}images/clients/el-assema-logo.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/el-assema-logo.jpeg`,
        caption: "El Assema Hospital Logo",
      },
    ],
    date: "2024-2025",
    specs: "Single-Plane Interventional Cath-Lab Suite",
  },
  {
    id: "gal-clients-99",
    title: "Al-Marwa Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Al-Marwa Hospital, Dokki, Giza",
    description: "Comprehensive diagnostic radiology and Cath-Lab suite installation by Nour Medical engineers.",
    image: `${BASE}images/clients/al-marwah-building.jpeg`,
    images: [
      `${BASE}images/clients/al-marwah-building.jpeg`,
      `${BASE}images/clients/al-marwah-cathlab.jpeg`,
      `${BASE}images/clients/al-marwah-dr-1.jpg`,
      `${BASE}images/clients/al-marwah-dr-2.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-marwah-building.jpeg`,
        caption: "Al-Marwa Hospital Building & Entrance",
      },
      {
        src: `${BASE}images/clients/al-marwah-cathlab.jpeg`,
        caption: "Al-Marwa Hospital Cath-Lab Angiography Suite",
      },
      {
        src: `${BASE}images/clients/al-marwah-dr-1.jpg`,
        caption: "Al-Marwa Hospital Digital DR Diagnostic Suite 1",
      },
      {
        src: `${BASE}images/clients/al-marwah-dr-2.jpg`,
        caption: "Al-Marwa Hospital Digital DR Diagnostic Suite 2",
      },
    ],
    date: "2024-2025",
    specs: "Interventional Cath-Lab & Wireless CsI DR Units",
  },
  {
    id: "gal-clients-103",
    title: "Al-Rayyan Scan Center",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Al-Rayyan Scan Center, Minya, Upper Egypt",
    description: "Multi-slice helical CT scanner and volumetric diagnostic imaging unit.",
    image: `${BASE}images/clients/al-rayan-ct.jpg`,
    images: [
      `${BASE}images/clients/al-rayan-ct.jpg`,
      `${BASE}images/clients/al-rayan-vct.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-rayan-ct.jpg`,
        caption: "Al-Rayyan Scan Center Multi-Slice CT Scanner",
      },
      {
        src: `${BASE}images/clients/al-rayan-vct.jpeg`,
        caption: "Al-Rayyan Scan Center Volumetric CT Suite",
      },
    ],
    date: "2024-2025",
    specs: "Helical CT System | Ultra-High Spatial Resolution",
  },
  {
    id: "gal-clients-105",
    title: "Al-Safwa Hospital & Diagnostic Centers",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Al-Safwa Hospital (6th of October & Faqus)",
    description: "Diagnostic scan center and hospital multi-slice CT unit installations.",
    image: `${BASE}images/clients/al-safwaa-6-october-building-1.jpeg`,
    images: [
      `${BASE}images/clients/al-safwaa-6-october-building-1.jpeg`,
      `${BASE}images/clients/al-safwaa-6-october-building-2.jpeg`,
      `${BASE}images/clients/al-safwaa-faqous-building.png`,
      `${BASE}images/clients/al-safwaa-faqous-ct.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-safwaa-6-october-building-1.jpeg`,
        caption: "Al-Safwa Hospital 6th of October Facility",
      },
      {
        src: `${BASE}images/clients/al-safwaa-6-october-building-2.jpeg`,
        caption: "Al-Safwa Hospital 6th of October Diagnostic Wing",
      },
      {
        src: `${BASE}images/clients/al-safwaa-faqous-building.png`,
        caption: "Al-Safwa Center Faqus Facility",
      },
      {
        src: `${BASE}images/clients/al-safwaa-faqous-ct.jpeg`,
        caption: "Al-Safwa Center Faqus CT Scanner Unit",
      },
    ],
    date: "2024-2025",
    specs: "Multi-Slice CT Scanner & PACS Integration",
  },
  {
    id: "gal-clients-109",
    title: "Al-Tayseer Hospitals",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Al-Tayseer Hospitals, Zagazig, Sharqia",
    description: "Long-term healthcare technology partnership covering 3.0T MRI, Cath-Lab, and surgical C-arms.",
    image: `${BASE}images/clients/al-tayseer-building.jpeg`,
    images: [
      `${BASE}images/clients/al-tayseer-building.jpeg`,
      `${BASE}images/clients/al-tayseer-main-doctors.jpg`,
      `${BASE}images/clients/al-tayseer-team-work.jpg`,
      `${BASE}images/clients/al-tayseer-ramadan-event.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-tayseer-building.jpeg`,
        caption: "Al-Tayseer Hospitals Zagazig Main Medical Complex",
      },
      {
        src: `${BASE}images/clients/al-tayseer-main-doctors.jpg`,
        caption: "Al-Tayseer Hospitals Senior Medical Faculty",
      },
      {
        src: `${BASE}images/clients/al-tayseer-team-work.jpg`,
        caption: "Al-Tayseer Hospitals & Nour Medical Technical Service Team",
      },
      {
        src: `${BASE}images/clients/al-tayseer-ramadan-event.jpg`,
        caption: "Al-Tayseer Hospitals Ramadan Annual Gathering",
      },
    ],
    date: "2024-2025",
    specs: "Turnkey Modality Integration & 24/7 Field Maintenance",
  },
  {
    id: "gal-clients-113",
    title: "Al-Zahra & El Nokhba Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Al-Zahra & El Nokhba Hospital, Kafr El Sheikh",
    description: "Interventional angiography gantry and hospital radiology department setup.",
    image: `${BASE}images/clients/al-zahraa-building.jpeg`,
    images: [
      `${BASE}images/clients/al-zahraa-building.jpeg`,
      `${BASE}images/clients/al-zahraa-cathlab.jpeg`,
      `${BASE}images/clients/el-nokhba-logo.png`,
      `${BASE}images/clients/al-zahraa-dr-mohamed-salama.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-zahraa-building.jpeg`,
        caption: "Al-Zahra & El Nokhba Hospital Medical Complex",
      },
      {
        src: `${BASE}images/clients/al-zahraa-cathlab.jpeg`,
        caption: "Al-Zahra & El Nokhba Cath-Lab Suite",
      },
      {
        src: `${BASE}images/clients/el-nokhba-logo.png`,
        caption: "El Nokhba Hospital Official Brand Mark",
      },
      {
        src: `${BASE}images/clients/al-zahraa-dr-mohamed-salama.jpg`,
        caption: "Dr. Mohamed Salama — Al-Zahra & El Nokhba",
      },
    ],
    date: "2024-2025",
    specs: "Angiography Cath-Lab | Lead Shielded Control Suite",
  },
  {
    id: "gal-clients-117",
    title: "Aseel Hospital Hurghada",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Aseel Hospital, Hurghada, Red Sea",
    description: "High-frequency mobile surgical C-arm and radiology department clinical equipment.",
    image: `${BASE}images/clients/aseel-building.jpeg`,
    images: [
      `${BASE}images/clients/aseel-building.jpeg`,
      `${BASE}images/clients/aseel-c-arm.jpeg`,
      `${BASE}images/clients/aseel-staff.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/aseel-building.jpeg`,
        caption: "Aseel Hospital Hurghada Exterior Facility",
      },
      {
        src: `${BASE}images/clients/aseel-c-arm.jpeg`,
        caption: "Aseel Hospital High-Frequency Surgical C-Arm Suite",
      },
      {
        src: `${BASE}images/clients/aseel-staff.jpg`,
        caption: "Aseel Hospital Medical Staff & Surgical Department",
      },
    ],
    date: "2024-2025",
    specs: "Intraoperative C-Arm Fluoroscopy",
  },
  {
    id: "gal-clients-120",
    title: "Banha University Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Banha University Hospital, Qalyubia",
    description: "University hospital radiology department equipped with dual Cath-Lab suites and surgical C-arms.",
    image: `${BASE}images/clients/banha-hospital-building.jpeg`,
    images: [
      `${BASE}images/clients/banha-hospital-building.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/banha-hospital-building.jpeg`,
        caption: "Banha University Hospital Radiology Department Building",
      },
    ],
    date: "2024-2025",
    specs: "Academic Teaching Hospital Radiology Infrastructure",
  },
  {
    id: "gal-clients-121",
    title: "Capital Care Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Capital Care Hospital, 6th of October",
    description: "64-Slice volumetric CT scanner installation and diagnostic wing equipment.",
    image: `${BASE}images/clients/capital-care-ct.jpg`,
    images: [
      `${BASE}images/clients/capital-care-ct.jpg`,
      `${BASE}images/clients/capital-care-logo.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/capital-care-ct.jpg`,
        caption: "Capital Care Hospital 64-Slice Volumetric CT Suite",
      },
      {
        src: `${BASE}images/clients/capital-care-logo.jpeg`,
        caption: "Capital Care Hospital Brand Emblem",
      },
    ],
    date: "2024-2025",
    specs: "64-Slice Volumetric CT | Turnkey Lead Shielding",
  },
  {
    id: "gal-clients-123",
    title: "El Gouna Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "El Gouna Hospital, Red Sea",
    description: "Biomedical engineering support and turnkey radiology & central sterilization departments.",
    image: `${BASE}images/clients/el-gouna-logo.png`,
    images: [
      `${BASE}images/clients/el-gouna-logo.png`,
      `${BASE}images/clients/el-gouna-team-work.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/el-gouna-logo.png`,
        caption: "El Gouna Hospital Official Logo",
      },
      {
        src: `${BASE}images/clients/el-gouna-team-work.jpg`,
        caption: "El Gouna Hospital Biomedical & Support Team",
      },
    ],
    date: "2024-2025",
    specs: "Cath-Lab Angiography & Bioseal CSSD Autoclaves",
  },
  {
    id: "gal-clients-125",
    title: "El-Salama Hospital (Dr. Omar Nagy)",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "El-Salama Hospital (Dr. Omar Nagy), Minya",
    description: "Regional diagnostic imaging center and hospital Cath-Lab support.",
    image: `${BASE}images/clients/el-salama-building.jpeg`,
    images: [
      `${BASE}images/clients/el-salama-building.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/el-salama-building.jpeg`,
        caption: "El-Salama Hospital Minya (Omar Nagy)",
      },
    ],
    date: "2024-2025",
    specs: "Cath-Lab & Helical CT Diagnostic Wing",
  },
  {
    id: "gal-clients-126",
    title: "Golden Heart Specialized Cardiac Center",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Golden Heart Specialized Hospital, Maadi, Cairo",
    description: "Specialized coronary catheterization laboratory and dedicated cardiovascular imaging suites.",
    image: `${BASE}images/clients/golden-heart-building.jpeg`,
    images: [
      `${BASE}images/clients/golden-heart-building.jpeg`,
      `${BASE}images/clients/golden-heart-cathlab.jpeg`,
      `${BASE}images/clients/golden-heart-staff-1.jpeg`,
      `${BASE}images/clients/golden-heart-staff-2.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/golden-heart-building.jpeg`,
        caption: "Golden Heart Specialized Cardiac Center Maadi",
      },
      {
        src: `${BASE}images/clients/golden-heart-cathlab.jpeg`,
        caption: "Golden Heart Center Interventional Angiography Cath-Lab",
      },
      {
        src: `${BASE}images/clients/golden-heart-staff-1.jpeg`,
        caption: "Golden Heart Hospital Clinical Nursing & Tech Staff",
      },
      {
        src: `${BASE}images/clients/golden-heart-staff-2.jpeg`,
        caption: "Golden Heart Hospital Senior Cardiology Team",
      },
    ],
    date: "2024-2025",
    specs: "Cardiac Fluoroscopy & Hemodynamic Monitoring",
  },
  {
    id: "gal-clients-130",
    title: "International Center for Radiology and MRI (IRC)",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "International Center for Radiology and MRI (IRC), Helwan",
    description: "Full diagnostic radiology facility supported by Nour Medical field engineers.",
    image: `${BASE}images/clients/irc-building.png`,
    images: [
      `${BASE}images/clients/irc-building.png`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/irc-building.png`,
        caption: "International Center for Radiology and MRI (IRC)",
      },
    ],
    date: "2024-2025",
    specs: "Wireless DR Flat Panel Retrofit & CT Imaging",
  },
  {
    id: "gal-clients-131",
    title: "Nile Center for Radiology",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Nile Center for Radiology, Cairo & Giza",
    description: "Regional diagnostic radiology and medical imaging network support.",
    image: `${BASE}images/clients/nile-centre-building.jpeg`,
    images: [
      `${BASE}images/clients/nile-centre-building.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/nile-centre-building.jpeg`,
        caption: "Nile Center for Radiology Diagnostic Center",
      },
    ],
    date: "2024-2025",
    specs: "Helical Multi-Detector CT System",
  },
  {
    id: "gal-clients-132",
    title: "South Sinai Hospital",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "South Sinai Hospital, Sharm El Sheikh",
    description: "Red Sea coastal trauma center and hospital radiology gantry maintenance.",
    image: `${BASE}images/clients/south-sinai-logo.png`,
    images: [
      `${BASE}images/clients/south-sinai-logo.png`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/south-sinai-logo.png`,
        caption: "South Sinai Hospital Sharm El Sheikh Logo",
      },
    ],
    date: "2024-2025",
    specs: "Cath-Lab Fluoroscopy & 32-Slice CT Scanner",
  },
  {
    id: "gal-clients-133",
    title: "Tiba Scan & Diagnostic Center",
    category: "hospitals",
    categoryLabel: "Hospital Installations",
    location: "Tiba Scan & Diagnostic Center, Minya",
    description: "Advanced MRI and CT diagnostic scanning center.",
    image: `${BASE}images/clients/tiba-scan-logo.jpeg`,
    images: [
      `${BASE}images/clients/tiba-scan-logo.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/tiba-scan-logo.jpeg`,
        caption: "Tiba Scan & Diagnostic Center Logo",
      },
    ],
    date: "2024-2025",
    specs: "High-Field MRI & Helical CT Scanner",
  },
];
