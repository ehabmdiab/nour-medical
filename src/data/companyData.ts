export interface CompanyStats {
  value: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
}

export interface SupplierPartner {
  id: string;
  name: string;
  country: string;
  flag: string;
  role: string;
  description: string;
  specialties: string[];
  featuredProduct: string;
}

export interface ClientHospital {
  id: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  type: string;
  installations: string[];
  featured?: boolean;
}

export const COMPANY_PROFILE = {
  name: "Nour Medical Company",
  tagline: "SEEING WHAT OTHERS CAN'T.",
  subtagline: "Advanced medical imaging technology, reliable equipment and precision service — built around the moments that matter.",
  establishedYear: 2015,
  coreBusiness: "Healthcare technology, radiology devices, medical equipment, hospital furniture, consumables, spare parts, installation, and after-sales service.",
  address: "No. 30 Misr Helwan Agricultural St., Maadi, Cairo, Egypt",
  telephones: ["02 25267173", "02 25267175"],
  mobiles: ["01007361255", "01023515373"],
  email: "info@nourmedical.com",
  website: "www.nourmedical.com",
  warehouseArea: "1,000 m² Spare Parts Storage",
};

export const COMPANY_STATS: CompanyStats[] = [
  {
    value: "2015",
    number: 2015,
    suffix: "",
    label: "Established Year",
    description: "A decade of pioneering medical technology in Egypt",
  },
  {
    value: "50+",
    number: 50,
    suffix: "+",
    label: "Field Engineers & Technicians",
    description: "Certified bio-medical engineering team on 24/7 standby",
  },
  {
    value: "1,000 m²",
    number: 1000,
    suffix: " m²",
    label: "Spare Parts Storage",
    description: "Centralized inventory in Cairo for rapid response times",
  },
  {
    value: "25+",
    number: 25,
    suffix: "+",
    label: "Cath-Lab Installations",
    description: "Advanced interventional cardiology suite deployments",
  },
  {
    value: "15+",
    number: 15,
    suffix: "+",
    label: "Digital X-Ray Installations",
    description: "State-of-the-art DR flat panel system implementations",
  },
  {
    value: "10+",
    number: 10,
    suffix: "+",
    label: "CT Installations",
    description: "High-resolution computed tomography scanner setups",
  },
  {
    value: "5+",
    number: 5,
    suffix: "+",
    label: "MRI Installations",
    description: "High-field magnetic resonance imaging systems",
  },
];

export const SUPPLIER_PARTNERS: SupplierPartner[] = [
  {
    id: "radmedix",
    name: "RADMEDIX",
    country: "USA",
    flag: "🇺🇸",
    role: "Digital Radiology & Cloud PACS Leader",
    description: "Pioneering American digital X-ray detectors, flat panel systems, and cloud-based PACS image management platforms.",
    specialties: ["Digital X-Ray", "Flat Panel Detectors", "Cloud PACS", "Acquisition Software"],
    featuredProduct: "Acuity DR Wireless Flat Panel System",
  },
  {
    id: "innocare",
    name: "INNOCARE",
    country: "Taiwan",
    flag: "🇹🇼",
    role: "Precision X-Ray Sensor Technology",
    description: "World-class Taiwanese manufacturer of advanced amorphous silicon (a-Si) TFT X-ray flat panel sensors.",
    specialties: ["a-Si TFT Flat Panel Sensors", "Dynamic Detectors", "Mammography Panels"],
    featuredProduct: "InnoCare High-DQE Flat Panel Detector",
  },
  {
    id: "lonwin",
    name: "LONWIN",
    country: "China",
    flag: "🇨🇳",
    role: "Interventional & Diagnostic Imaging Systems",
    description: "Leading global developer of high-performance MRI scanners, CT systems, DR suites, and interventional therapy equipment.",
    specialties: ["MRI Systems", "Multi-Slice CT", "Interventional C-Arms", "Angiography"],
    featuredProduct: "Lonwin Multi-Slice Computed Tomography",
  },
];

export const CLIENT_HOSPITALS: ClientHospital[] = [
  {
    id: "capital-care",
    name: "Capital Care Hospital",
    city: "Cairo",
    region: "New Cairo",
    lat: 30.0275,
    lng: 31.4914,
    type: "Private Healthcare Center",
    installations: ["Cath-Lab Suite", "Digital X-Ray System", "Preventive Maintenance"],
    featured: true,
  },
  {
    id: "south-sinai",
    name: "South Sinai Hospital",
    city: "Sharm El Sheikh",
    region: "South Sinai",
    lat: 27.9158,
    lng: 34.3299,
    type: "General Hospital",
    installations: ["Multi-Slice CT Scanner", "Emergency DR Unit", "24/7 Technical Support"],
    featured: true,
  },
  {
    id: "el-gouna",
    name: "El Gouna Hospital",
    city: "El Gouna",
    region: "Red Sea",
    lat: 27.3949,
    lng: 33.6775,
    type: "International Hospital",
    installations: ["MRI System", "Digital Mammography", "Central Sterilization"],
    featured: true,
  },
  {
    id: "al-marwa",
    name: "Al-Marwa Hospital",
    city: "Cairo",
    region: "Dokki / Giza",
    lat: 30.0384,
    lng: 31.2125,
    type: "Specialized Medical Center",
    installations: ["Cath-Lab Unit", "Mobile C-Arm", "Spare Parts Contract"],
    featured: true,
  },
  {
    id: "al-tayseer",
    name: "Al-Tayseer Hospitals",
    city: "Zagazig",
    region: "Sharqia",
    lat: 30.5877,
    lng: 31.5020,
    type: "Medical Complex",
    installations: ["High-Field MRI", "Multi-Slice CT", "Digital X-Ray Suite"],
    featured: true,
  },
  {
    id: "al-zahra",
    name: "Al-Zahra Hospital",
    city: "Cairo",
    region: "Abbassia",
    lat: 30.0667,
    lng: 31.2833,
    type: "University Teaching Hospital",
    installations: ["Cath-Lab Suite", "Radiology Workstations"],
  },
  {
    id: "el-nokhba",
    name: "El Nokhba Hospital",
    city: "Giza",
    region: "Mohandessin",
    lat: 30.0520,
    lng: 31.2010,
    type: "Private Medical Center",
    installations: ["Digital Radiology Suite", "Hospital Furniture Setup"],
  },
  {
    id: "elite-heart",
    name: "Elite Heart Center",
    city: "Cairo",
    region: "Maadi",
    lat: 29.9602,
    lng: 31.2569,
    type: "Cardiovascular Institute",
    installations: ["Interventional Cath-Lab", "Cardiac C-Arm"],
    featured: true,
  },
  {
    id: "el-salama",
    name: "El Salama Hospital",
    city: "Alexandria",
    region: "Shatby",
    lat: 31.2001,
    lng: 29.9187,
    type: "General Hospital",
    installations: ["Digital X-Ray System", "CT Maintenance Service"],
    featured: true,
  },
  {
    id: "intl-center-rad",
    name: "International Center for Radiology and MRI",
    city: "Cairo",
    region: "Heliopolis",
    lat: 30.0900,
    lng: 31.3200,
    type: "Diagnostic Imaging Center",
    installations: ["3.0T MRI System", "64-Slice CT Scanner", "PACS Integration"],
    featured: true,
  },
  {
    id: "military-hospitals",
    name: "Military Hospitals Complex",
    city: "Cairo",
    region: "Koubbah",
    lat: 30.0950,
    lng: 31.2950,
    type: "Military Medical Armed Forces",
    installations: ["Multiple CT & MRI Scanners", "Central Sterilization Systems"],
    featured: true,
  },
  {
    id: "banha-univ",
    name: "Banha University Hospital",
    city: "Banha",
    region: "Qalyubia",
    lat: 30.4667,
    lng: 31.1833,
    type: "University Hospital",
    installations: ["Cath-Lab Installation", "Digital Radiology Suites"],
    featured: true,
  },
  {
    id: "egyptian-railway",
    name: "Egyptian Railway Hospital",
    city: "Cairo",
    region: "Ramses",
    lat: 30.0630,
    lng: 31.2470,
    type: "Government Healthcare Center",
    installations: ["Digital X-Ray Detectors", "Preventive Service Contract"],
  },
  {
    id: "golden-heart",
    name: "Golden Heart Hospital",
    city: "6th of October",
    region: "Giza",
    lat: 29.9667,
    lng: 30.9333,
    type: "Specialized Cardiac Center",
    installations: ["Cath-Lab Suite", "Hemodynamic Monitoring System"],
  },
  {
    id: "nile-center",
    name: "Nile Center for Radiology",
    city: "Mansoura",
    region: "Dakahlia",
    lat: 31.0379,
    lng: 31.3815,
    type: "Scan & Diagnostic Center",
    installations: ["Digital X-Ray Detector Retrofits", "Spare Parts Supply"],
  },
  {
    id: "assuit-center",
    name: "Assiut Diagnostic Scan Center",
    city: "Assiut",
    region: "Upper Egypt",
    lat: 27.1809,
    lng: 31.1837,
    type: "Regional Imaging Facility",
    installations: ["Multi-Slice CT Scanner", "Mobile DR Detector"],
  },
  {
    id: "minia-hospital",
    name: "Minia Specialized Hospital",
    city: "Minia",
    region: "Upper Egypt",
    lat: 28.1099,
    lng: 30.7503,
    type: "Regional Medical Center",
    installations: ["Digital X-Ray System", "Preventive Maintenance"],
  },
];
