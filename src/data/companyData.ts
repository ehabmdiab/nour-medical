// ================================================================
// NOUR MEDICAL — COMPLETE COMPANY DATA
// Awwwards V2 Branch — authoritative source for all page content
// ================================================================

// ── CONTACT ────────────────────────────────────────────────────
export const COMPANY_CONTACT = {
  address: 'No. 30 Misr Helwan Agricultural St., Maadi, Cairo, Egypt',
  phone: ['02 25267173', '02 25267175'],
  fax: '02 25267178',
  mobile: ['(+02) 01007361255', '(+02) 01023515373'],
  website: 'www.nourmedical.com',
  email: 'info@nourmedical.com',
};

// ── COMPANY INFO ────────────────────────────────────────────────
export const COMPANY_INFO = {
  name: 'Nour Medical Company',
  established: 2015,
  chairman: 'Dr. Eng. Sayed Awad',
  chairmanTitle: 'Chairman & CEO',
  location: 'Maadi, Cairo, Egypt',
  partsFacilityM2: 1000,
  totalPersonnel: 50,
  vision: 'To delight our customers by delivering an exceptional and elegant customer experience at the moments that matter.',
  mission: [
    {
      title: 'Sustainable Technologies',
      description: 'Provide sustainable technologies that support long-term healthcare operations.',
    },
    {
      title: 'Valuable Products & High-Quality Service',
      description: 'Deliver valuable products supported by a high standard of service.',
    },
    {
      title: 'Higher Healthcare Standards',
      description: 'Contribute to improving quality standards in the Egyptian healthcare market.',
    },
  ],
};

// ── INSTALLATION STATISTICS ─────────────────────────────────────
export const INSTALLATION_STATS = [
  { label: 'Cath-Lab Installations', value: '25+', unit: '' },
  { label: 'Digital X-Ray Installations', value: '15+', unit: '' },
  { label: 'CT Installations', value: '10+', unit: '' },
  { label: 'MRI Installations', value: '5+', unit: '' },
];

// ── MAINTENANCE CONTRACT STATISTICS ─────────────────────────────
export const MAINTENANCE_STATS = [
  { system: 'Cath-Lab', contracts: '30+' },
  { system: 'C-Arm', contracts: '20+' },
  { system: 'X-Ray', contracts: '40+' },
  { system: 'CT', contracts: '15+' },
  { system: 'MRI', contracts: '7+' },
];

// ── BUSINESS CAPACITY METRICS ────────────────────────────────────
export const CAPACITY_METRICS = [
  {
    number: '50',
    suffix: '',
    label: 'Field Service Engineers & Technical Staff',
  },
  {
    number: '1,000',
    suffix: 'm²',
    label: 'Spare Parts Storage Facility',
  },
  {
    number: '25+',
    suffix: '',
    label: 'Cath-Lab Systems Installed',
  },
  {
    number: '40+',
    suffix: '',
    label: 'X-Ray Systems Under AMC',
  },
];

// ── THREE PILLARS ────────────────────────────────────────────────
export const COMPANY_PILLARS = [
  {
    id: 'technology',
    title: 'Technology',
    description:
      'Access to advanced medical products through an international supplier network spanning the USA, Taiwan, and China.',
  },
  {
    id: 'expertise',
    title: 'Expertise',
    description:
      'Established technical experience in radiology equipment and healthcare systems, including complex imaging modalities.',
  },
  {
    id: 'reliability',
    title: 'Reliability',
    description:
      'After-sales service and maintenance designed to support customers throughout the operational life of their systems.',
  },
];

// ── PRODUCT CATEGORIES ───────────────────────────────────────────
export const PRODUCT_CATEGORIES = [
  {
    id: 'radiology',
    number: '01',
    title: 'Radiology Devices',
    description:
      'Advanced imaging technologies and radiology equipment, including MRI, CT, Digital X-Ray, C-Arm, and Cath-Lab / interventional imaging systems.',
    subcategories: ['MRI', 'CT Scanner', 'Digital X-Ray', 'C-Arm', 'Cath-Lab / Interventional Imaging'],
    tag: 'Imaging Technology',
  },
  {
    id: 'medical-equipment',
    number: '02',
    title: 'Medical Equipment',
    description:
      'A broad range of medical equipment solutions supporting modern healthcare facilities and clinical operations.',
    subcategories: [],
    tag: 'Healthcare Solutions',
  },
  {
    id: 'hospital-furniture',
    number: '03',
    title: 'Hospital Furniture',
    description:
      'Durable, purpose-designed furniture solutions for patient care environments, wards, and clinical areas.',
    subcategories: [],
    tag: 'Facility Solutions',
  },
  {
    id: 'sterilization',
    number: '04',
    title: 'Central Sterilization Equipment',
    description:
      'Equipment for central sterilization departments, supporting infection control and safety standards across healthcare facilities.',
    subcategories: [],
    tag: 'Infection Control',
  },
  {
    id: 'consumables',
    number: '05',
    title: 'Consumables',
    description:
      'Essential medical consumables supporting day-to-day clinical operations and patient care continuity.',
    subcategories: [],
    tag: 'Clinical Supplies',
  },
  {
    id: 'spare-parts',
    number: '06',
    title: 'Spare Parts',
    description:
      'Genuine spare parts for radiology and medical equipment, backed by a 1,000 m² storage facility for rapid availability.',
    subcategories: [],
    tag: 'Parts & Components',
  },
];

// ── SERVICES ─────────────────────────────────────────────────────
export const SERVICES = [
  {
    number: '01',
    title: 'Equipment Installation',
    description:
      'Professional installation of radiology systems and medical equipment, ensuring optimal performance from day one.',
  },
  {
    number: '02',
    title: 'Preventive Maintenance',
    description:
      'Scheduled preventive maintenance programmes designed to sustain equipment reliability and extend operational lifespan.',
  },
  {
    number: '03',
    title: 'Corrective Maintenance',
    description:
      'Prompt corrective maintenance to restore equipment functionality and minimize disruption to healthcare operations.',
  },
  {
    number: '04',
    title: 'Technical Support',
    description:
      'Dedicated technical support for radiology and medical equipment, provided by experienced field service engineers.',
  },
  {
    number: '05',
    title: 'Spare Parts Supply',
    description:
      'Reliable supply of genuine spare parts from a 1,000 m² facility, supporting rapid turnaround for service requirements.',
  },
  {
    number: '06',
    title: 'Annual Maintenance Contracts',
    description:
      'Structured annual maintenance contracts providing scheduled service, priority support, and parts availability for critical systems.',
  },
];

// ── SUPPLIER PARTNERS ─────────────────────────────────────────────
export const SUPPLIER_PARTNERS = [
  {
    id: 'radmedix',
    name: 'Radmedix',
    country: 'USA',
    countryFlag: '🇺🇸',
    tagline: 'Digital Radiology Solutions',
    description:
      'A US-based digital radiology supplier specializing in flat panel DR detectors, digital X-Ray systems, and cloud-based PACS solutions.',
    specialties: [
      'Flat Panel DR Systems',
      'Digital X-Ray Equipment',
      'Cloud-Based PACS',
    ],
  },
  {
    id: 'innocare',
    name: 'InnoCare Optoelectronics Corporation',
    country: 'Taiwan',
    countryFlag: '🇹🇼',
    tagline: 'X-Ray Flat Panel Sensor Technology',
    description:
      'Established in April 2019, InnoCare Optoelectronics is a Taiwanese manufacturer specializing in X-Ray flat panel sensors, recognized as a world leader in this field.',
    specialties: [
      'X-Ray Flat Panel Sensors',
      'Digital Detector Technology',
      'Optoelectronic Components',
    ],
  },
  {
    id: 'lonwin',
    name: 'Suzhou Lonwin Medical Systems Co.',
    country: 'China',
    countryFlag: '🇨🇳',
    tagline: 'Integrated Medical Imaging Systems',
    description:
      'A Chinese medical systems manufacturer with a core business spanning MRI, CT, integrated imaging products, radiography, imaging-related products, and interventional therapy-related products.',
    specialties: [
      'MRI Systems',
      'CT Systems',
      'Integrated Imaging Products',
      'Radiography Equipment',
      'Interventional Therapy Products',
    ],
  },
];

// ── CLIENT REFERENCES — BY EQUIPMENT ─────────────────────────────
export const CATH_LAB_CLIENTS = [
  'Al-Marwa Hospital / Dr. Monir Othman',
  'Egypt Group for Import & Export — Police Hospital, Elagoza',
  'Al-Tayseer Hospitals',
  'Al-Zahra Hospital',
  'El Nokhba Hospital',
  'Elite Heart — Alaa Ezzat',
  'El Salama Hospital',
  'Aseel Hospital',
  'El Gouna Hospital',
  'South Sinai Hospital',
  'El Assema Hospital',
  'Al-Safwa Center',
  'Golden Heart Hospital',
  'Military Hospital',
];

export const C_ARM_CLIENTS = [
  'Capital Care Hospital',
  'Al-Salama Hospital',
  'Al-Zahra Hospital',
  'Al-Hayah Hospital',
  'Al-Rayan Scan Center',
  'Banha University Hospital',
  'Military Hospital',
];

export const CT_CLIENTS = [
  'Capital Care Hospital',
  'Al-Salama Hospital',
  'Aseel Hospital',
  'Al-Rayan Scan Center',
  'South Sinai Hospital',
  'International Center for Radiology and MRI',
  'Sona Center',
  'Tiba Center',
  'Nile Center',
  'Military Hospital',
];

export const MRI_CLIENTS = [
  'Al-Rayan Scan Center',
  'Tiba Scan',
  'Military Hospitals',
];

// ── FULL CLIENT REFERENCE LIST ────────────────────────────────────
export const ALL_CLIENTS = [
  { name: 'Capital Care Hospital', location: '6th of October, Giza' },
  { name: 'South Sinai Hospital', location: 'Sharm El Sheikh' },
  { name: 'El Gouna Hospital', location: 'El Gouna, Red Sea' },
  { name: 'Al-Marwa Hospital / Dr. Monir Othman', location: 'Dokki, Giza' },
  { name: 'El Assema Hospital', location: 'Minya El Qamh, Sharqia' },
  { name: 'Al-Tayseer Hospitals', location: 'Zagazig, Sharqia' },
  { name: 'International Center for Radiology and MRI', location: 'Helwan, Cairo' },
  { name: 'Al-Zahra Hospital', location: 'Kafr El Sheikh' },
  { name: 'Al-Safwa Hospital', location: '6th of October, Giza' },
  { name: 'El Nokhba Hospital', location: 'Kafr El Sheikh' },
  { name: 'El-Hayah Hospital', location: 'Assiut' },
  { name: 'Elite Heart Center', location: 'Maadi, Cairo' },
  { name: 'Al-Safwa Center', location: 'Faqus, Sharqia' },
  { name: 'Al-Fouad Center', location: 'Shebin El Kom, Monufia' },
  { name: 'Al-Delta Hospital', location: 'Mansoura, Dakahlia' },
  { name: 'El-Salama Hospital', location: 'Minya' },
  { name: 'Sona Center', location: 'Sharqia' },
  { name: 'Al-Rayyan Scan Center', location: 'Minya' },
  { name: 'Egypt Heart Center', location: 'Dokki, Giza' },
  { name: 'Academi Hospital', location: 'New Cairo' },
  { name: 'Glory Hospital', location: 'Damietta' },
  { name: 'Thuraya Hospital', location: 'Mohandessin, Giza' },
  { name: 'Al-Nahar Hospital', location: 'Nasr City, Cairo' },
  { name: 'Aman Elhayah Medical Hospital', location: 'Beni Suef' },
  { name: 'Aman Hospital', location: 'Helwan, Cairo' },
  { name: 'Teba Center', location: 'Malawi, Minya' },
  { name: 'Dar Al-Teb Hospital', location: 'Dokki, Giza' },
  { name: 'Al-Taqwa Hospital', location: 'Helwan, Cairo' },
  { name: 'Banha University Hospital', location: 'Banha, Qalyubia' },
  { name: 'Egyptian Railway Hospital', location: 'Cairo' },
  { name: 'Heia Scan', location: 'Minya' },
  { name: 'Golden Heart Hospital', location: 'Maadi, Cairo' },
  { name: 'Dr. Ahmed Safaan', location: 'Tanta, Gharbia' },
  { name: 'Jana Hospital', location: 'Haram, Giza' },
  { name: 'Nile Center', location: 'Cairo & Giza' },
  { name: 'Military Hospital', location: 'All Egypt' },
];

// ── WHY NOUR MEDICAL POINTS ───────────────────────────────────────
export const WHY_NOUR_MEDICAL = [
  {
    title: 'Experienced Technical Team',
    description: '50 field service engineers, technicians, and administrative personnel dedicated to healthcare technology support.',
  },
  {
    title: 'Reliable After-Sales Service',
    description: 'Our value extends beyond supply — we support healthcare organizations throughout the operational life of their systems.',
  },
  {
    title: 'Large Parts Inventory',
    description: 'A 1,000 m² parts storage facility enabling swift technical response and reduced system downtime.',
  },
  {
    title: 'Global Supplier Network',
    description: 'Direct access to technology from established suppliers in the USA, Taiwan, and China.',
  },
  {
    title: 'Radiology Specialization',
    description: 'One of the pioneering companies in Egypt for maintenance of imported radiology devices, with proven Cath-Lab and CT/MRI expertise.',
  },
  {
    title: 'Nationwide Client References',
    description: 'An established network of hospitals, scan centers, and medical facilities across Egypt.',
  },
];

// ── CAPABILITY HIGHLIGHTS ─────────────────────────────────────────
export const KEY_CAPABILITIES = [
  {
    id: 'radiology',
    title: 'Radiology Devices',
    description: 'Advanced imaging technologies and radiology equipment.',
  },
  {
    id: 'equipment',
    title: 'Medical Equipment',
    description: 'Solutions supporting modern healthcare facilities.',
  },
  {
    id: 'furniture',
    title: 'Hospital Furniture',
    description: 'Durable furniture solutions for healthcare environments.',
  },
  {
    id: 'consumables',
    title: 'Consumables & Spare Parts',
    description: 'Essential components and supplies supporting operational continuity.',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Professional technical support and maintenance for radiology equipment.',
  },
];
