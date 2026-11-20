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
  email: 'marketing@nourmedical.com',
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
  generalManagerImage: `${BASE}images/team/eng-ahmed-hafez.jpg`,
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
      'Ensuring the availability of modern medical equipment compliant with international standards through a global supplier network from countries like the USA, China, and Taiwan.',
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
      'After-sales service and maintenance designed to support customers throughout the operational life of their systems, with the availability of all spare parts enabling immediate completion of required maintenance.',
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
    id: 'sterilization',
    number: '03',
    title: 'Central Sterilization Equipment',
    description:
      'Equipment for central sterilization departments, supporting infection control and safety standards across healthcare facilities.',
    subcategories: [],
    tag: 'Infection Control',
  },
  {
    id: 'consumables',
    number: '04',
    title: 'Consumables',
    description:
      'Essential medical consumables supporting day-to-day clinical operations and patient care continuity.',
    subcategories: [],
    tag: 'Clinical Supplies',
  },
  {
    id: 'spare-parts',
    number: '05',
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
    headline: 'Field Service Engineering & Operational Uptime',
    description:
      'Proactive diagnostic maintenance programs, rapid field response, and annual service contracts (AMC) designed to eliminate system downtime and extend equipment lifespan.',
    highlights: [
      {
        title: 'Preventive & Corrective Maintenance',
        desc: 'Scheduled diagnostic checks, X-ray tube wear analysis, high-voltage calibration, and detector mapping.',
      },
      {
        title: 'Annual Maintenance Contracts (AMC)',
        desc: 'Structured contracts offering priority response, routine audits, and local spare parts coverage.',
      },
    ],
    badge: 'Technical Field Support',
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
      'Turnkey supply of diagnostic radiology systems, central sterilization suites, and genuine OEM spare parts backed by our 1,000 m² local storage facility.',
    highlights: [
      {
        title: 'Global OEM Supplier Network',
        desc: 'Authorized partner for leading medical OEMs in countries like the USA, China, and Taiwan (Radmedix, Angel, Lonwin, Sino Vision, InnoCare).',
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
export interface SupplierDevice {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  image: string;
  shortDescription: string;
  shortDescriptionAr: string;
}

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
  deviceLayout?: 'grid' | 'carousel';
  devices?: SupplierDevice[];
}

export const SUPPLIER_PARTNERS: SupplierPartner[] = [
  {
    id: 'radmedix',
    name: 'Radmedix',
    nameAr: 'راد ميديكس (Radmedix)',
    country: 'USA',
    countryAr: 'الولايات المتحدة',
    countryFlag: '🇺🇸',
    tagline: 'Leading Provider of Digital Radiology Solutions',
    taglineAr: 'المزود الرائد لحلول الأشعة التشخيصية الرقمية',
    description:
      'Radmedix is a US-based digital radiology supplier and the leading provider of innovative products and reliable solutions in flat panel DR, digital X-ray, and cloud-based PACS.',
    descriptionAr:
      'شركة أمريكية متخصصة في توريد أنظمة الأشعة الرقمية، وتُعد المزود الرائد للمنتجات المبتكرة والحلول الموثوقة في مجال ألواح التصوير الرقمي المسطحة (Flat Panel DR)، وأجهزة الأشعة السينية الرقمية (Digital X-Ray)، وأنظمة الأرشفة السحابية للصور الطبية (Cloud-Based PACS).',
    specialties: [
      'Flat Panel DR Solutions',
      'Digital X-Ray Systems',
      'Cloud-Based PACS',
    ],
    specialtiesAr: [
      'حلول ومستشعرات اللوح الرقمي المسطح (Flat Panel DR)',
      'أجهزة الأشعة السينية الرقمية المتكاملة (Digital X-Ray)',
      'أنظمة الأرشفة وإدارة الصور السحابية (Cloud-Based PACS)',
    ],
    devices: [
      {
        id: 'radmedix-acuity-dr',
        name: 'Radmedix Acuity DR Table System',
        nameAr: 'نظام الأشعة الرقمية Radmedix Acuity DR',
        category: 'Full-Room Digital Radiography',
        categoryAr: 'غرفة أشعة رقمية متكاملة',
        image: `${BASE}images/products/radmedix-acuity-dr.png`,
        shortDescription:
          'Radmedix Acuity digital radiography table and integrated monitor column engineered for streamlined clinical X-ray positioning, rapid image preview, and dependable hospital throughput.',
        shortDescriptionAr:
          'نظام الأشعة الرقمية Radmedix Acuity المزود بطاولة فحص متكاملة وشاشة عرض مباشرة لتسهيل أوضاع التصوير وسرعة المعاينة داخل أقسام الأشعة.',
      },
      {
        id: 'radmedix-portable-xray',
        name: 'Radmedix Portable X-Ray & Folding Stand',
        nameAr: 'جهاز الأشعة المحمول مع الحامل المتنقل من راد ميديكس',
        category: 'Portable & Mobile X-Ray',
        categoryAr: 'أشعة سينية محمولة ومتنقلة',
        image: `${BASE}images/products/radmedix-portable-xray.png`,
        shortDescription:
          'Lightweight high-frequency portable X-ray generator paired with a wheeled rapid-deployment stand for emergency clinics, field care, and bedside radiography.',
        shortDescriptionAr:
          'مولد أشعة سينية محمول عالي التردد مع حامل متحرك سريع التركيب لتلبية فحوصات الطوارئ والزيارات السريرية والميدانية بكفاءة عالية.',
      },
      {
        id: 'radmedix-floor-dr-system',
        name: 'Radmedix Floor-Mounted DR & Chest Stand',
        nameAr: 'نظام الأشعة الأرضي وحامل الصدر الرأسي من راد ميديكس',
        category: 'Floor-Mounted Digital X-Ray',
        categoryAr: 'أشعة سينية رقمية ثنائية',
        image: `${BASE}images/products/radmedix-floor-dr-system.png`,
        shortDescription:
          'Dual-position digital radiography suite featuring a floor-mounted touchscreen tube stand, radiographic table, and upright chest wall bucky for comprehensive exams.',
        shortDescriptionAr:
          'منظومة أشعة رقمية متكاملة تضم عمود أنبوب بشاشة لمس وطاولة فحص وحامل صدر رأسي لتغطية فحوصات الوقوف والاستلقاء بمرونة كاملة.',
      },
      {
        id: 'radmedix-tablet-pacs',
        name: 'Radmedix Tablet Workstation & Cloud PACS',
        nameAr: 'محطة التحكم اللوحية ونظام الأرشفة السحابية Cloud PACS',
        category: 'Acquisition & Cloud PACS',
        categoryAr: 'الاستحواذ والأرشفة السحابية PACS',
        image: `${BASE}images/products/radmedix-tablet-pacs.png`,
        shortDescription:
          'Rugged handled tablet acquisition workstation running Radmedix imaging software and Cloud-Based PACS for immediate DICOM review, measurements, and multi-site sharing.',
        shortDescriptionAr:
          'وحدة تحكم لوحية طبية متينة تعمل ببرمجيات راد ميديكس ونظام الأرشفة السحابية Cloud PACS لمراجعة صور DICOM وإجراء القياسات ومشاركتها عن بُعد.',
      },
    ],
  },
  {
    id: 'lonwin',
    name: 'Suzhou Lonwin Medical Systems Co.',
    nameAr: 'سوتشو لون وين للأنظمة الطبية (Lonwin Medical)',
    country: 'China',
    countryAr: 'الصين',
    countryFlag: '🇨🇳',
    tagline: 'Integrated Medical Imaging Products for Diagnosis & Treatment',
    taglineAr: 'أنظمة التصوير الطبي المتكاملة للتشخيص والعلاج',
    description:
      'Located in China, Suzhou Lonwin Medical Systems Co., Ltd. (Lonwin Medical), with its core business in magnetic resonance imaging (MRI) and CT, is a manufacturer and service provider of integrated imaging products for medical diagnosis and treatment. Its product line covers four fields: magnetic resonance imaging (MRI), radiography (CT & DR), imaging-related products, and interventional therapy-related products.',
    descriptionAr:
      'تقع شركة سوتشو لون وين للأنظمة الطبية (Lonwin Medical) في الصين، ويرتكز نشاطها الأساسي على أنظمة الرنين المغناطيسي (MRI) والأشعة المقطعية (CT)، وهي شركة مصنعة ومزودة لمنتجات وحلول التصوير المتكاملة للتشخيص والعلاج الطبي. يغطي خط إنتاجها أربعة مجالات رئيسية تشمل: الرنين المغناطيسي (MRI)، التصوير الإشعاعي (CT & DR)، المنتجات المرتبطة بالتصوير الطبي، ومنتجات العلاج التداخلي.',
    specialties: [
      'Magnetic Resonance Imaging (MRI)',
      'Radiography Systems (CT & DR)',
      'Imaging-Related Medical Products',
      'Interventional Therapy-Related Products',
    ],
    specialtiesAr: [
      'أنظمة التصوير بالرنين المغناطيسي (MRI)',
      'أنظمة التصوير الإشعاعي والأشعة المقطعية والرقمية (CT & DR)',
      'المنتجات والتجهيزات المرتبطة بالتصوير الطبي',
      'منتجات وحلول العلاج التداخلي',
    ],
    devices: [
      {
        id: 'lonwin-supervan-15t-system',
        name: 'SuperVan 1.5T Superconducting MRI',
        nameAr: 'جهاز الرنين المغناطيسي فائق التوصيل SuperVan 1.5T',
        category: '1.5T MRI System',
        categoryAr: 'نظام رنين مغناطيسي ١.٥ تسلا',
        image: `${BASE}images/products/lonwin-supervan-15t-1.png`,
        shortDescription:
          'Flagship SuperVan 1.5T superconducting MRI built on Lonwin MUSIC technology for high clinical flexibility, precision, and scan speed across whole-spine, neuro, and body imaging.',
        shortDescriptionAr:
          'نظام الرنين المغناطيسي فائق التوصيل SuperVan 1.5T المبني على تقنية MUSIC من لون وين لتحقيق مرونة سريرية عالية ودقة وسرعة فائقة في فحوصات العمود الفقري والمخ والجسم.',
      },
      {
        id: 'lonwin-supervan-15t-workflow',
        name: 'SuperVan 1.5T — MUSIC Coils & Compressed Sensing',
        nameAr: 'SuperVan 1.5T — ملفات التصوير MUSIC والاستشعار المضغوط',
        category: 'Clinical Workflow & Coils',
        categoryAr: 'ملفات التصوير وسير العمل السريع',
        image: `${BASE}images/products/lonwin-supervan-15t-2.png`,
        shortDescription:
          'Multi-channel MUSIC phased-array coils paired with Compressed Sensing acceleration, gantry touchscreen workflow controls, and patient-friendly VR guidance for fast, sharp exams.',
        shortDescriptionAr:
          'ملفات تصوير متعددة القنوات بتقنية MUSIC مع تقنية الاستشعار المضغوط لتقليل زمن الفحص، وشاشة تحكم مدمجة على الجهاز، وتجربة مريحة للمريض بدقة تصوير فائقة.',
      },
    ],
  },
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
    deviceLayout: 'carousel',
    devices: [
      {
        id: 'angel-u-arm-dr',
        name: 'Angel U-Arm Digital Radiography System',
        nameAr: 'نظام الأشعة الرقمية U-Arm من أنجيل',
        category: 'U-Arm Digital X-Ray',
        categoryAr: 'أشعة رقمية بذراع U-Arm',
        image: `${BASE}images/products/angel-u-arm-dr.jpg`,
        shortDescription:
          'Motorized single-column U-arm digital radiography system enabling upright, seated, and mobile-table examinations inside compact radiology rooms.',
        shortDescriptionAr:
          'نظام أشعة رقمية بذراع U-Arm أحادي العمود يدعم الفحوصات في وضع الوقوف والجلوس وعلى الطاولة المتحركة بكفاءة عالية.',
      },
      {
        id: 'angel-mammography',
        name: 'Angel Digital Mammography System',
        nameAr: 'جهاز الماموجرافي الرقمي من أنجيل',
        category: 'Women’s Health Imaging',
        categoryAr: 'تصوير الثدي الرقمي (الماموجرافي)',
        image: `${BASE}images/products/angel-mammography.jpg`,
        shortDescription:
          'Full-field digital mammography platform with ergonomic soft compression, dual foot-switch controls, and high-resolution low-dose breast diagnostics.',
        shortDescriptionAr:
          'منصة ماموجرافي رقمية متكاملة مزودة بنظام ضغط مريح وتحكم مزدوج بالقدم لتقديم صور عالية الدقة بأقل جرعة إشعاعية.',
      },
      {
        id: 'angel-surgical-c-arm',
        name: 'Angel Mobile Surgical C-Arm',
        nameAr: 'جهاز الأشعة الجراحي المتنقل C-Arm من أنجيل',
        category: 'Intraoperative C-Arm',
        categoryAr: 'التصوير الجراحي C-Arm',
        image: `${BASE}images/products/angel-surgical-c-arm.jpg`,
        shortDescription:
          'Flat-panel mobile surgical C-arm paired with a dual-monitor workstation for crisp real-time orthopedic, spine, and trauma fluoroscopy.',
        shortDescriptionAr:
          'جهاز C-Arm جراحي متنقل بلوح مسطح ومحطة عمل بشاشتين لمتابعة العمليات الجراحية والعظام والعمود الفقري لحظياً بوضوح فائق.',
      },
      {
        id: 'angel-mobile-dr',
        name: 'Angel Mobile Digital Radiography (QOMO / MTP)',
        nameAr: 'جهاز الأشعة الرقمية المتنقل (QOMO / MTP)',
        category: 'Portable Bedside DR',
        categoryAr: 'أشعة رقمية متنقلة',
        image: `${BASE}images/products/angel-mobile-dr.jpg`,
        shortDescription:
          'Compact cordless-ready mobile DR cart designed for effortless bedside ICU, ward, and emergency imaging with an onboard wireless flat panel bay.',
        shortDescriptionAr:
          'جهاز أشعة رقمية متنقل مدمج ومجهز لحمل الكاشف اللاسلكي لتسهيل الفحوصات الفورية داخل غرف العناية المركزة والطوارئ.',
      },
      {
        id: 'angel-floor-dr',
        name: 'Angel Floor-Mounted Dual-Detector DR',
        nameAr: 'نظام الأشعة الرقمية الأرضي ثنائي الكاشف',
        category: 'Floor-Mounted DR',
        categoryAr: 'نظام أشعة أرضي متكامل',
        image: `${BASE}images/products/angel-floor-dr.jpg`,
        shortDescription:
          'Precision floor-mounted tube column integrated with an elevating radiographic table and upright chest wall stand for versatile daily hospital workloads.',
        shortDescriptionAr:
          'نظام أشعة رقمية أرضي يضم عمود أنبوب دقيق وطاولة فحص وحامل صدر رأسي لتغطية كافة فحوصات الأشعة اليومية بالمستشفيات.',
      },
      {
        id: 'angel-ceiling-dr',
        name: 'Angel Ceiling-Suspended DR (Lingxi / Fanghua)',
        nameAr: 'نظام الأشعة المعلق بالسقف (Lingxi / Fanghua)',
        category: 'Overhead Tube Crane DR',
        categoryAr: 'أشعة رقمية معلقة بالسقف',
        image: `${BASE}images/products/angel-ceiling-dr.jpg`,
        shortDescription:
          'Automated ceiling-suspended overhead X-ray tube crane synchronized with the floating table and vertical bucky for high-throughput emergency imaging.',
        shortDescriptionAr:
          'نظام أشعة رقمية معلق بالسقف مع تحكم آلي وتزامن كامل مع طاولة الفحص وحامل الصدر لاستيعاب معدلات الفحص المرتفعة.',
      },
      {
        id: 'angel-talent-ii',
        name: 'Angel TALENT II Multi-Functional Dynamic DR',
        nameAr: 'نظام الأشعة الديناميكية متعدد الوظائف TALENT II',
        category: 'Dynamic Fluoroscopy & DR',
        categoryAr: 'أشعة ديناميكية وفلوروسكوبي TALENT II',
        image: `${BASE}images/products/angel-talent-ii-dr.jpg`,
        shortDescription:
          'Motorized tilting dynamic DR and remote-controlled fluoroscopy table combining GI contrast studies, orthopedics, and routine DR on a single system.',
        shortDescriptionAr:
          'طاولة أشعة ديناميكية مائلة متعددة الوظائف تجمع بين فحوصات الصبغة والفلوروسكوبي وتصوير العظام والأشعة العامة في جهاز واحد.',
      },
      {
        id: 'angel-wr-3d',
        name: 'Angel WR-3D Weight-Bearing 3D Imaging',
        nameAr: 'نظام التصوير ثلاثي الأبعاد أثناء الوقوف WR-3D',
        category: '3D Orthopedic CBCT',
        categoryAr: 'تصوير ثلاثي الأبعاد للعظام والمفاصل',
        image: `${BASE}images/products/angel-wr-3d-system.jpg`,
        shortDescription:
          'Weight-bearing 3D cone-beam imaging system designed for functional spine, knee, and ankle orthopedic diagnostics under natural standing load.',
        shortDescriptionAr:
          'نظام تصوير ثلاثي الأبعاد مخصص لتشخيص العمود الفقري والركبة والكاحل أثناء الوقوف وتحمل الوزن الطبيعي لتقييم الإصابات والمفاصل بدقة متناهية.',
      },
    ],
  },
  {
    id: 'sinovision',
    name: 'Sino Vision (SinoVision Medical Technology)',
    nameAr: 'سينو فيجن (Sino Vision)',
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
    deviceLayout: 'carousel',
    devices: [
      {
        id: 'sinovision-alpha-ct-system',
        name: 'SinoVision Alpha CT 64-Slice Scanner',
        nameAr: 'جهاز الأشعة المقطعية SinoVision Alpha CT (٦٤ مقطعاً)',
        category: 'Large-Bore 64-Slice CT',
        categoryAr: 'أشعة مقطعية ٦٤ مقطعاً بفتحة واسعة',
        image: `${BASE}images/products/sinovision-alpha-ct-system.jpg`,
        shortDescription:
          'Smart 75 cm large-bore 64-slice CT scanner engineered for high-definition 21 lp/cm imaging at low radiation dose, featuring a 32-row V-Pixel detector, 0.3125 mm thin-slice acquisition, and 1024-matrix reconstruction.',
        shortDescriptionAr:
          'جهاز أشعة مقطعية ذكي ٦٤ مقطعاً بفتحة واسعة ٧٥ سم يوفر دقة تصوير عالية (21 lp/cm) بجرعة إشعاعية منخفضة، مزود بكاشف V-Pixel من ٣٢ صفاً بدقة التقاط ٠.٣١٢٥ مم وإعادة بناء بمصفوفة ١٠٢٤.',
      },
      {
        id: 'sinovision-alpha-ct-suite',
        name: 'Alpha CT Combined Diagnosis & CT Simulation Suite',
        nameAr: 'منظومة Alpha CT المتكاملة للتشخيص والمحاكاة العلاجية',
        category: 'Diagnostic & Radiotherapy CT',
        categoryAr: 'التشخيص والمحاكاة للعلاج الإشعاعي',
        image: `${BASE}images/products/sinovision-alpha-ct-suite.png`,
        shortDescription:
          'Integrated Alpha CT configuration pairing the 75 cm wide-bore gantry and overhead 3D-Vision camera with dual alignment laser pillars for whole-body diagnostics, surgical planning, and radiotherapy CT simulation.',
        shortDescriptionAr:
          'تكوين متكامل لجهاز Alpha CT يجمع بين الفتحة الواسعة ٧٥ سم والكاميرا العلوية ثلاثية الأبعاد مع أعمدة الليزر المزدوجة لإجراء الفحوصات التشخيصية وتخطيط الجراحة ومحاكاة العلاج الإشعاعي.',
      },
      {
        id: 'sinovision-alpha-ct-3d-vision',
        name: 'Alpha CT 3D-Vision HD Camera Positioning System',
        nameAr: 'نظام التوجيه الذكي بكاميرا 3D-Vision HD لجهاز Alpha CT',
        category: 'Smart Automated Positioning',
        categoryAr: 'التمركز الذكي والتصوير الآلي',
        image: `${BASE}images/products/sinovision-alpha-ct-3d-vision.png`,
        shortDescription:
          'Ceiling-mounted 3D-Vision HD camera with a 60-degree fan angle that automatically recognizes patient size and position, adjusts couch height, and enables quick remote-controlled standardized scanning.',
        shortDescriptionAr:
          'كاميرا 3D-Vision HD مثبتة بالسقف بزاوية تغطية ٦٠ درجة تتعرف تلقائياً على حجم وموضع المريض وتضبط ارتفاع الطاولة لتسريع الفحوصات القياسية والتحكم بها عن بُعد.',
      },
      {
        id: 'sinovision-alpha-ct-large-bore',
        name: 'Alpha CT 75 cm Ultra-Wide Bore Patient Experience',
        nameAr: 'تجربة الفحص المريحة بفتحة ٧٥ سم الواسعة في Alpha CT',
        category: '75 cm Wide-Bore Clinical Workflow',
        categoryAr: 'فتحة ٧٥ سم واسعة لراحة المرضى',
        image: `${BASE}images/products/sinovision-alpha-ct-large-bore.jpg`,
        shortDescription:
          'Generous 75 cm gantry aperture with integrated gantry touchscreen controls designed to comfortably accommodate obese and claustrophobic patients across daily diagnostic and interventional workflows.',
        shortDescriptionAr:
          'فتحة جانتري واسعة بقطر ٧٥ سم مع شاشة تحكم مدمجة على الجهاز لاستيعاب المرضى ذوي الأوزان الكبيرة وتقليل الشعور بالرهبة من الأماكن المغلقة خلال الفحوصات اليومية والتداخلية.',
      },
      {
        id: 'sinovision-alpha-ct-simulation',
        name: 'Alpha CT 75 cm Bore & Radiotherapy CT Simulation Table',
        nameAr: 'طاولة المحاكاة الإشعاعية والفتحة الواسعة ٧٥ سم في Alpha CT',
        category: 'CT Simulation & Oncology',
        categoryAr: 'المحاكاة الإشعاعية وتطبيقات الأورام',
        image: `${BASE}images/products/sinovision-alpha-ct-simulation.jpg`,
        shortDescription:
          'Precision flat-top carbon-fiber CT simulation accessory setup inside the 75 cm wide bore, supporting daily diagnostic scanning alongside accurate oncology CT simulation and interventional procedures.',
        shortDescriptionAr:
          'منظومة تثبيت دقيقة وطاولة مسطحة مخصصة للمحاكاة الإشعاعية داخل الفتحة الواسعة ٧٥ سم، تدعم الفحوصات التشخيصية اليومية وتطبيقات الأورام والأشعة التداخلية بكفاءة عالية.',
      },
    ],
  },
  {
    id: 'innocare',
    name: 'InnoCare Optoelectronics Corporation',
    nameAr: 'إينوكير للإلكترونيات الضوئية (InnoCare)',
    country: 'Taiwan',
    countryAr: 'تايوان',
    countryFlag: '🇹🇼',
    tagline: 'World Leader in X-Ray Flat Panel Sensor Technology',
    taglineAr: 'الرائد العالمي في تكنولوجيا مستشعرات الألواح المسطحة للأشعة',
    description:
      'Established in April 2019 in Taiwan, InnoCare Optoelectronics Corporation ("InnoCare") specializes in the design and development of X-ray flat panel sensors. Their products are among the most technically advanced and highest-quality manufactured, making InnoCare the world leader in this field.',
    descriptionAr:
      'تأسست شركة إينوكير للإلكترونيات الضوئية (InnoCare) في أبريل ٢٠١٩ في تايوان، ويتركز نشاطها الرئيسي في تصميم وتطوير مستشعرات الألواح المسطحة للأشعة السينية (X-Ray Flat Panel Sensors). تمتاز منتجاتها بكونها الأكثر تطوراً من الناحية التقنية والأعلى جودة في التصنيع، مما يجعل إينوكير الشركة الرائدة عالمياً في هذا المجال.',
    specialties: [
      'X-Ray Flat Panel Sensor Design & Development',
      'High-Precision Digital Detector Technology',
      'Advanced Optoelectronic Manufacturing',
    ],
    specialtiesAr: [
      'تصميم وتطوير مستشعرات اللوح المسطح للأشعة السينية',
      'تكنولوجيا الكواشف الرقمية فائقة الدقة والجودة',
      'تصنيع المكونات الكهروضوئية المتقدمة',
    ],
    devices: [
      {
        id: 'innocare-wireless-fpd',
        name: 'InnoCare Wireless Flat Panel Sensor',
        nameAr: 'مستشعر اللوح المسطح اللاسلكي من إينوكير',
        category: 'Wireless DR Detector',
        categoryAr: 'كاشف أشعة رقمي لاسلكي',
        image: `${BASE}images/products/dr-innocare-taiwan-1.png`,
        shortDescription:
          'Lightweight cassette-sized wireless flat panel X-ray sensor delivering high DQE sensitivity, dual-band Wi-Fi transfer, and durable IP-rated protection for mobile and stationary DR.',
        shortDescriptionAr:
          'مستشعر أشعة سينية لاسلكي خفيف الوزن بحجم الكاسيت القياسي، يتميز بحساسية عالية ونقل بيانات سريع عبر الواي فاي وحماية فائقة للاستخدام الثابت والمتنقل.',
      },
      {
        id: 'innocare-csi-detector',
        name: 'InnoCare High-Resolution CsI Flat Panel Detector',
        nameAr: 'كاشف إينوكير عالي الدقة بتقنية CsI',
        category: 'Optoelectronic X-Ray Sensor',
        categoryAr: 'مستشعر كهروضوئي عالي الدقة',
        image: `${BASE}images/products/dr-innocare-taiwan-2.png`,
        shortDescription:
          'Precision CsI scintillator flat panel detector engineered in Taiwan for superior spatial resolution and reduced patient X-ray dose across general and orthopedic radiography.',
        shortDescriptionAr:
          'كاشف لوح مسطح بتقنية CsI مصمم في تايوان لتقديم أعلى تباين مكاني ودقة تشخيصية مع تقليل الجرعة الإشعاعية للمريض في فحوصات الأشعة العامة والعظام.',
      },
      {
        id: 'innocare-slim-profile-fpd',
        name: 'InnoCare Ultra-Slim Side-Profile Flat Panel Sensor',
        nameAr: 'التصميم الجانبي فائق النحافة لكاشف إينوكير المسطح',
        category: 'Ultra-Slim Cassette Design',
        categoryAr: 'تصميم كاسيت فائق النحافة',
        image: `${BASE}images/products/dr-innocare-taiwan-3.png`,
        shortDescription:
          'ISO 4090 cassette-sized ultra-slim flat panel profile featuring a sealed magnetic charging interface, integrated LED battery and wireless status indicators, and effortless retrofit compatibility with existing bucky trays.',
        shortDescriptionAr:
          'تصميم فائق النحافة بمقاس الكاسيت القياسي ISO 4090 مزود بمنفذ شحن مغناطيسي محكم ومؤشرات LED مدمجة لحالة البطارية والاتصال اللاسلكي لسهولة التوافق والتركيب مع أدراج الأشعة القياسية.',
      },
      {
        id: 'innocare-portable-fpd-perspective',
        name: 'InnoCare Multi-Application Wireless Flat Panel Sensor',
        nameAr: 'مستشعر اللوح الرقمي اللاسلكي متعدد الاستخدامات من إينوكير',
        category: 'Portable & Specialty DR Sensor',
        categoryAr: 'كاشف رقمي لاسلكي متعدد الاستخدامات',
        image: `${BASE}images/products/dr-innocare-taiwan-4.png`,
        shortDescription:
          'Versatile wireless flat panel X-ray detector with precision carbon-fiber imaging surface, low-dose high-sensitivity scintillator, and rugged portable housing built for clinical, mobile, and veterinary digital radiography.',
        shortDescriptionAr:
          'كاشف أشعة رقمي لاسلكي متعدد الاستخدامات بسطح تصوير دقيق من ألياف الكربون ومستشعر عالي الحساسية بجرعة إشعاعية منخفضة، مصمم بهيكل متين للفحوصات الإكلينيكية والمتنقلة والبيطرية.',
      },
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
    description: 'Direct access to technology from established suppliers in countries like the USA, China, and Taiwan.',
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
