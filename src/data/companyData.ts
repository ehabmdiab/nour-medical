import type { TranslationKey } from "../i18n/types";
const BASE = import.meta.env.BASE_URL || '/';

// ================================================================
// NOUR MEDICAL — COMPLETE COMPANY DATA
// Awwwards V2 Branch — authoritative source for all page content
// ================================================================

// ── CONTACT ────────────────────────────────────────────────────
export const COMPANY_CONTACT = {
  headOffice: 'Head Office',
  address: 'No. 30 Misr Helwan Agricultural St., Maadi, Cairo, Egypt',
  phone: ['02 25267173', '02 25267175'],
  fax: '02 25267178',
  mobile: ['01023515373', '01007361255'],
  website: 'www.nourmedical.com',
  email: 'info@nourmedical.com',
};

// ── COMPANY INFO ────────────────────────────────────────────────
export const COMPANY_INFO = {
  name: 'Nour Medical Company',
  established: 2015,
  chairman: 'Eng. El Sayed Awad',
  chairmanTitle: 'Chairman & CEO',
  chairmanImage: `${BASE}images/team/eng-sayed-awad.jpg`,
  financeDirector: 'Dr. Gehan Awad',
  financeDirectorTitle: 'Director of Fin. & Admin',
  generalManager: 'Eng. Ahmed Hafez',
  generalManagerTitle: 'General Manager',
  medicalDirector: 'Dr. Gehan Awad',
  medicalDirectorImage: '',
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
      'Genuine spare parts for radiology and medical equipment, backed by a dedicated local storage facility for rapid availability.',
    subcategories: [],
    tag: 'Parts & Components',
  },
];

// ── SERVICES ─────────────────────────────────────────────────────
export interface ServicePillar {
  number: string;
  id: string;
  title: string;
  tag: string;
  headline: string;
  description: string;
  highlights: { title: string; desc: string }[];
  badge: string;
  link: string;
  linkText: string;
}

export const SERVICES: ServicePillar[] = [
  {
    number: '01',
    id: 'maintenance-support',
    title: 'Maintenance & Technical Support',
    tag: 'Preventive & Corrective Engineering',
    headline: '24/7 Field Service Engineering & Operational Uptime',
    description:
      'Proactive diagnostic maintenance programs, 24/7 emergency response, and annual service contracts (AMC) designed to eliminate system downtime and extend equipment lifespan.',
    highlights: [
      {
        title: '24/7 Emergency Hotline',
        desc: 'Direct line to biomedical engineers with under 2-hour response in Cairo and rapid nationwide dispatch.',
      },
      {
        title: 'Preventive & Corrective Maintenance',
        desc: 'Scheduled diagnostic checks, X-ray tube wear analysis, high-voltage calibration, and detector mapping.',
      },
      {
        title: 'Annual Maintenance Contracts (AMC)',
        desc: 'Structured contracts offering priority response, routine audits, and local spare parts coverage.',
      },
    ],
    badge: '24/7 Hotline Support',
    link: '/services#maintenance',
    linkText: 'Explore Maintenance Services',
  },
  {
    number: '02',
    id: 'device-parts-supplier',
    title: 'Device and Spare Parts Supplier',
    tag: 'Turnkey Supply & Inventory',
    headline: 'Advanced Modalities & Stocked Central Warehouse',
    description:
      'Turnkey supply of diagnostic radiology systems, central sterilization suites, hospital furniture, and genuine OEM spare parts backed by our 1,000 m² local storage facility.',
    highlights: [
      {
        title: 'Global OEM Supplier Network',
        desc: 'Authorized partner for leading medical OEMs across USA, Taiwan, and China (Radmedix, InnoCare, Lonwin, Senno Vision).',
      },
      {
        title: '1,000 m² Central Warehouse',
        desc: 'Stocked local storage in Maadi, Cairo featuring OEM X-ray tubes, generators, detectors, and ICU components.',
      },
      {
        title: 'Turnkey Rigging & Installation',
        desc: 'Comprehensive site planning, lead shielding construction, precision gantry levelling, and AEA certification.',
      },
    ],
    badge: 'Maadi Central Warehouse',
    link: '/products',
    linkText: 'Explore Equipment Portfolio',
  },
];

// ── SUPPLIER PARTNERS ─────────────────────────────────────────────
export interface SupplierPartner {
  id: string;
  name: string;
  nameAr?: string;
  country: string;
  countryAr?: string;
  countryFlag: string;
  tagline: string;
  taglineAr?: string;
  description: string;
  descriptionAr?: string;
  specialties: string[];
  specialtiesAr?: string[];
}

export const SUPPLIER_PARTNERS: SupplierPartner[] = [
  {
    id: 'angel',
    name: 'Angel (Anjian Technology)',
    nameAr: 'أنجيل (Anjian Technology)',
    country: 'China',
    countryAr: 'الصين',
    countryFlag: '🇨🇳',
    tagline: 'Dynamic Digital Radiography & Advanced DR Systems',
    taglineAr: 'أنظمة الأشعة الرقمية الديناميكية والحلول المتقدمة',
    description:
      'A leading manufacturer of digital radiography systems, specializing in dynamic fluoroscopy DR (DTP580), mobile DR (QOMO & MTP), ceiling suspension systems (Lingxi & Fanghua), and weight-bearing 3D imaging (WR-3D).',
    descriptionAr:
      'شركة رائدة في تصنيع أنظمة الأشعة الرقمية، متخصصة في أجهزة الفلوروسكوبي الديناميكية (DTP580)، وأجهزة الأشعة الرقمية المتنقلة (QOMO & MTP)، وأنظمة التعليق السقفي (Lingxi & Fanghua)، والتصوير ثلاثي الأبعاد أثناء الوقوف وتحمل الوزن (WR-3D).',
    specialties: [
      'Dynamic Flat Panel Fluoroscopy (DTP580)',
      'Ceiling Suspension DR Systems (Lingxi & Fanghua)',
      'Mobile Digital Radiography (QOMO & MTP Series)',
      'Weight-Bearing 3D Imaging Systems (WR-3D)',
      'Multi-Functional Dynamic DR (Talent II & HUA II)',
    ],
    specialtiesAr: [
      'الفلوروسكوبي الرقمي باللوح المسطح (DTP580)',
      'أنظمة الأشعة المعلقة بالسقف (Lingxi & Fanghua)',
      'أجهزة الأشعة الرقمية المتنقلة (سلسلة QOMO & MTP)',
      'أنظمة التصوير ثلاثي الأبعاد مع تحميل الوزن (WR-3D)',
      'أنظمة الأشعة الرقمية متعددة الوظائف (Talent II & HUA II)',
    ],
  },
  {
    id: 'radmedix',
    name: 'Radmedix',
    nameAr: 'راد ميديكس (Radmedix)',
    country: 'USA',
    countryAr: 'الولايات المتحدة',
    countryFlag: '🇺🇸',
    tagline: 'Digital Radiology Solutions',
    taglineAr: 'حلول الأشعة التشخيصية الرقمية',
    description:
      'A US-based digital radiology supplier specializing in flat panel DR detectors, digital X-Ray systems, and cloud-based PACS solutions.',
    descriptionAr:
      'مورد أمريكي رائد لحلول الأشعة الرقمية متخصص في مستشعرات اللوح المسطح (DR)، وأجهزة الأشعة السينية الرقمية، وحلول أرشفة ومشاركة الصور الطبية السحابية (PACS).',
    specialties: [
      'Flat Panel DR Systems',
      'Digital X-Ray Equipment',
      'Cloud-Based PACS',
    ],
    specialtiesAr: [
      'أنظمة ومستشعرات اللوح المسطح (DR)',
      'أجهزة الأشعة السينية الرقمية المتكاملة',
      'أنظمة الأرشفة وإدارة الصور السحابية (PACS)',
    ],
  },
  {
    id: 'innocare',
    name: 'InnoCare Optoelectronics Corporation',
    nameAr: 'إينوكير (InnoCare Optoelectronics)',
    country: 'Taiwan',
    countryAr: 'تايوان',
    countryFlag: '🇹🇼',
    tagline: 'X-Ray Flat Panel Sensor Technology',
    taglineAr: 'تكنولوجيا مستشعرات الألواح المسطحة للأشعة',
    description:
      'Established in April 2019, InnoCare Optoelectronics is a Taiwanese manufacturer specializing in X-Ray flat panel sensors, recognized as a world leader in this field.',
    descriptionAr:
      'تأسست في أبريل ٢٠١٩، وتعد الشركة التايوانية إينوكير رائدة عالمياً في تصنيع مستشعرات اللوح الرقمي المسطح للأشعة السينية بأعلى معايير الدقة الضوئية والإلكترونية.',
    specialties: [
      'X-Ray Flat Panel Sensors',
      'Digital Detector Technology',
      'Optoelectronic Components',
    ],
    specialtiesAr: [
      'مستشعرات اللوح المسطح للأشعة السينية',
      'تكنولوجيا الكواشف والمستشعرات الرقمية',
      'المكونات الكهروضوئية الدقيقة',
    ],
  },
  {
    id: 'lonwin',
    name: 'Suzhou Lonwin Medical Systems Co.',
    nameAr: 'سوتشو لون وين للأنظمة الطبية (Lonwin)',
    country: 'China',
    countryAr: 'الصين',
    countryFlag: '🇨🇳',
    tagline: 'Integrated Medical Imaging Systems',
    taglineAr: 'أنظمة التصوير الطبي المتكاملة',
    description:
      'A Chinese medical systems manufacturer with a core business spanning MRI, CT, integrated imaging products, radiography, imaging-related products, and interventional therapy-related products.',
    descriptionAr:
      'شركة صينية متخصصة في الأنظمة الطبية المتطورة تغطي أعمالها الرئيسية الرنين المغناطيسي (MRI)، والأشعة المقطعية (CT)، وأجهزة الأشعة التشخيصية، ومنتجات العلاج التداخلي.',
    specialties: [
      'MRI Systems',
      'CT Systems',
      'Integrated Imaging Products',
      'Radiography Equipment',
      'Interventional Therapy Products',
    ],
    specialtiesAr: [
      'أنظمة الرنين المغناطيسي (MRI)',
      'أنظمة الأشعة المقطعية (CT)',
      'منتجات وحلول التصوير المتكاملة',
      'أجهزة الأشعة التشخيصية والتصويرية',
      'منتجات العلاج والقسطرة التداخلية',
    ],
  },
  {
    id: 'sennovision',
    name: 'Senno Vision (SennoVision Medical Technology)',
    nameAr: 'سينو فيجن (Senno Vision)',
    country: 'China',
    countryAr: 'الصين',
    countryFlag: '🇨🇳',
    tagline: 'Advanced Medical Imaging & Vision Systems',
    taglineAr: 'أنظمة التصوير الطبي المتقدمة والرؤية الجراحية',
    description:
      'A medical systems manufacturer specializing in surgical C-arms, digital radiography (DR) solutions, medical vision systems, and specialized diagnostic imaging technology.',
    descriptionAr:
      'شركة تصنيع أنظمة طبية متخصصة في أجهزة C-arm الجراحية، وحلول الأشعة الرقمية (DR)، وأنظمة الرؤية الطبية أثناء العمليات، وتقنيات التصوير التشخيصي المتخصصة.',
    specialties: [
      'Surgical C-Arm Systems',
      'Digital Radiography (DR)',
      'Intraoperative Medical Vision',
      'Specialized Diagnostic Systems',
    ],
    specialtiesAr: [
      'أجهزة C-Arm الجراحية المتطورة',
      'حلول وتطبيقات الأشعة الرقمية (DR)',
      'أنظمة الرؤية الطبية أثناء العمليات الجراحية',
      'أنظمة التصوير التشخيصي التخصصية',
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
export interface ClientReference {
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
}

export const ALL_CLIENTS: ClientReference[] = [
  { name: "Capital Care Hospital", nameAr: "مستشفى كابيتال كير", location: "6th of October, Giza", locationAr: "٦ أكتوبر، الجيزة" },
  { name: "South Sinai Hospital", nameAr: "مستشفى جنوب سيناء", location: "Sharm El Sheikh", locationAr: "شرم الشيخ" },
  { name: "El Gouna Hospital", nameAr: "مستشفى الجونة", location: "El Gouna, Red Sea", locationAr: "الجونة، البحر الأحمر" },
  { name: "Al-Marwa Hospital / Dr. Monir Othman", nameAr: "مستشفى المروة / د. منير عثمان", location: "Dokki, Giza", locationAr: "الدقي، الجيزة" },
  { name: "El Assema Hospital", nameAr: "مستشفى العاصمة", location: "Minya El Qamh, Sharqia", locationAr: "منيا القمح، الشرقية" },
  { name: "Al-Tayseer Hospitals", nameAr: "مستشفيات التيسير", location: "Zagazig, Sharqia", locationAr: "الزقازيق، الشرقية" },
  { name: "International Center for Radiology and MRI", nameAr: "المركز الدولي للأشعة والرنين المغناطيسي", location: "Helwan, Cairo", locationAr: "حلوان، القاهرة" },
  { name: "Al-Zahra Hospital", nameAr: "مستشفى الزهراء", location: "Kafr El Sheikh", locationAr: "كفر الشيخ" },
  { name: "Al-Safwa Hospital", nameAr: "مستشفى الصفوة", location: "6th of October, Giza", locationAr: "٦ أكتوبر، الجيزة" },
  { name: "El Nokhba Hospital", nameAr: "مستشفى النخبة", location: "Kafr El Sheikh", locationAr: "كفر الشيخ" },
  { name: "El-Hayah Hospital", nameAr: "مستشفى الحياة", location: "Assiut", locationAr: "أسيوط" },
  { name: "Elite Heart Center", nameAr: "مركز إيليت للقلب", location: "Maadi, Cairo", locationAr: "المعادي، القاهرة" },
  { name: "Al-Safwa Center", nameAr: "مركز الصفوة", location: "Faqus, Sharqia", locationAr: "فاقوس، الشرقية" },
  { name: "Al-Fouad Center", nameAr: "مركز الفؤاد", location: "Shebin El Kom, Monufia", locationAr: "شبين الكوم، المنوفية" },
  { name: "Al-Delta Hospital", nameAr: "مستشفى الدلتا", location: "Mansoura, Dakahlia", locationAr: "المنصورة، الدقهلية" },
  { name: "El-Salama Hospital", nameAr: "مستشفى السلامة", location: "Minya", locationAr: "المنيا" },
  { name: "Sona Center", nameAr: "مركز سونا للأشعة", location: "Sharqia", locationAr: "الشرقية" },
  { name: "Al-Rayyan Scan Center", nameAr: "مركز الريان سكان", location: "Minya", locationAr: "المنيا" },
  { name: "Egypt Heart Center", nameAr: "مركز مصر للقلب", location: "Dokki, Giza", locationAr: "الدقي، الجيزة" },
  { name: "Academi Hospital", nameAr: "مستشفى أكاديمي", location: "New Cairo", locationAr: "القاهرة الجديدة" },
  { name: "Glory Hospital", nameAr: "مستشفى جلوري", location: "Damietta", locationAr: "دمياط" },
  { name: "Thuraya Hospital", nameAr: "مستشفى الثريا", location: "Mohandessin, Giza", locationAr: "المهندسين، الجيزة" },
  { name: "Al-Nahar Hospital", nameAr: "مستشفى النهار", location: "Nasr City, Cairo", locationAr: "مدينة نصر، القاهرة" },
  { name: "Aman Elhayah Medical Hospital", nameAr: "مستشفى أمان الحياة الطبي", location: "Beni Suef", locationAr: "بني سويف" },
  { name: "Aman Hospital", nameAr: "مستشفى أمان", location: "Helwan, Cairo", locationAr: "حلوان، القاهرة" },
  { name: "Teba Center", nameAr: "مركز طيبة", location: "Malawi, Minya", locationAr: "ملوي، المنيا" },
  { name: "Dar Al-Teb Hospital", nameAr: "مستشفى دار الطب", location: "Dokki, Giza", locationAr: "الدقي، الجيزة" },
  { name: "Al-Taqwa Hospital", nameAr: "مستشفى التقوى", location: "Helwan, Cairo", locationAr: "حلوان، القاهرة" },
  { name: "Banha University Hospital", nameAr: "مستشفى بنها الجامعي", location: "Banha, Qalyubia", locationAr: "بنها، القليوبية" },
  { name: "Egyptian Railway Hospital", nameAr: "مستشفى هيئة السكة الحديد", location: "Cairo", locationAr: "القاهرة" },
  { name: "Heia Scan", nameAr: "مركز هيّا سكان", location: "Minya", locationAr: "المنيا" },
  { name: "Golden Heart Hospital", nameAr: "مستشفى جولدن هارت", location: "Maadi, Cairo", locationAr: "المعادي، القاهرة" },
  { name: "Dr. Ahmed Safaan", nameAr: "مركز د. أحمد صفوان", location: "Tanta, Gharbia", locationAr: "طنطا، الغربية" },
  { name: "Jana Hospital", nameAr: "مستشفى جنى", location: "Haram, Giza", locationAr: "الهرم، الجيزة" },
  { name: "Nile Center", nameAr: "مركز النيل للأشعة", location: "Cairo & Giza", locationAr: "القاهرة والجيزة" },
  { name: "Military Hospital", nameAr: "المستشفيات العسكرية", location: "All Egypt", locationAr: "مختلف محافظات مصر" },
];

// ── WHY NOUR MEDICAL POINTS ───────────────────────────────────────
export const WHY_NOUR_MEDICAL = [
  {
    title: 'Experienced Technical Team',
    description: 'Field service engineers, technicians, and administrative personnel dedicated to healthcare technology support.',
  },
  {
    title: 'Reliable After-Sales Service',
    description: 'Our value extends beyond supply — we support healthcare organizations throughout the operational life of their systems.',
  },
  {
    title: 'Large Parts Inventory',
    description: 'A dedicated parts storage facility enabling swift technical response and reduced system downtime.',
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
export interface KeyCapability {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  title: string;
  description: string;
}

export const KEY_CAPABILITIES: KeyCapability[] = [
  {
    id: "radiology",
    titleKey: "home.cap1Title",
    descKey: "home.cap1Desc",
    title: "Radiology Devices",
    description: "Advanced imaging technologies and radiology equipment.",
  },
  {
    id: "equipment",
    titleKey: "home.cap2Title",
    descKey: "home.cap2Desc",
    title: "Medical Equipment",
    description: "Solutions supporting modern healthcare facilities.",
  },
  {
    id: "furniture",
    titleKey: "home.cap3Title",
    descKey: "home.cap3Desc",
    title: "Hospital Furniture",
    description: "Durable furniture solutions for healthcare environments.",
  },
  {
    id: "consumables",
    titleKey: "home.cap4Title",
    descKey: "home.cap4Desc",
    title: "Consumables & Spare Parts",
    description: "Essential components and supplies supporting operational continuity.",
  },
  {
    id: "maintenance",
    titleKey: "home.cap5Title",
    descKey: "home.cap5Desc",
    title: "Maintenance",
    description: "Professional technical support and maintenance for radiology equipment.",
  },
];
