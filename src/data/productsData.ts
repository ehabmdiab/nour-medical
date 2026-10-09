export type ProductModality = 'mri' | 'ct' | 'dr' | 'cathlab' | 'carm';

export interface ProductSpec {
  label: string;
  value: string;
  labelAr?: string;
  valueAr?: string;
}

export interface ProductItem {
  id: string;
  category: string; // backwards compatibility
  categoryLabel: string;
  modality: ProductModality;
  modalityLabel: string;
  modalityLabelAr: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  overview: string; // نبذة عن الجهاز
  overviewAr: string;
  description: string;
  descriptionAr?: string;
  mainTask: string;
  mainTaskAr?: string;
  supplier: string;
  country: string;
  specs: ProductSpec[];
  features: string[];
  featuresAr?: string[];
  clinicalApplications: string[];
  clinicalApplicationsAr?: string[];
  image: string;
  featured?: boolean;
}

const BASE = import.meta.env.BASE_URL || '/';

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Modalities', labelAr: 'كافة الأجهزة' },
  { id: 'mri', label: 'MRI Systems', labelAr: 'الرنين المغناطيسي' },
  { id: 'ct', label: 'CT Scanners', labelAr: 'الأشعة المقطعية' },
  { id: 'dr', label: 'X-Ray & DR', labelAr: 'الأشعة السينية والرقمية' },
  { id: 'cathlab', label: 'Cath-Lab', labelAr: 'قسطرة القلب والأوعية' },
  { id: 'carm', label: 'C-Arm', labelAr: 'أجهزة السي آرم والعمليات' },
] as const;

export const PRODUCTS_DATA: ProductItem[] = [
  // ── 1. MRI SYSTEMS (الرنين المغناطيسي) ──────────────────────────────────
  {
    id: "mri-system",
    category: "radiology",
    categoryLabel: "MRI Systems",
    modality: "mri",
    modalityLabel: "MRI Systems",
    modalityLabelAr: "الرنين المغناطيسي",
    name: "Superconducting 1.5T / 3.0T MRI System",
    nameAr: "نظام الرنين المغناطيسي فائق التوصيل 1.5T / 3.0T",
    tagline: "Zero-Boiloff Superconducting Clinical Magnetic Resonance Suite",
    taglineAr: "منظومة رنين مغناطيسي فائقة التوصيل بدون فقد للهيليوم",
    overview: "A premier clinical MRI solution providing exceptional soft-tissue differentiation, silent sequence technology, and comprehensive multi-channel phased array coil architectures. Engineered for high-throughput diagnostic centers and major teaching hospitals across Egypt, minimizing helium replenishment while delivering rapid neurological, musculoskeletal, abdominal, and cardiac protocols.",
    overviewAr: "نظام تصوير بالرنين المغناطيسي فائق التوصيل يقدم تمايزاً استثنائياً في الأنسجة الرخوة مع تقنيات المسح الصامت ومجموعة كاملة من ملفات الاستقبال متعددة القنوات. مصمم خصيصاً للمراكز التشخيصية والمستشفيات الكبرى في مصر، مع تكنولوجيا Zero-Boiloff لانعدام تبخر الهيليوم وسرعة فائقة في فحوصات المخ والأعصاب، العظام، والقلب.",
    description: "Premium superconducting MRI scanner delivering crisp tissue contrast, silent scanning technology, and rapid neurological and musculoskeletal acquisition sequences.",
    descriptionAr: "جهاز رنين مغناطيسي فائق التوصيل يقدم تبايناً مذهلاً للأنسجة مع تقنيات المسح الصامت وفحوصات سريعة للأعصاب والعظام.",
    mainTask: "High-contrast tissue imaging for neurological, spinal, and musculoskeletal diagnostics.",
    mainTaskAr: "التصوير التشخيصي الدقيق للأنسجة الرخوة، الأعصاب، العمود الفقري، والعظام.",
    supplier: "Lonwin / Global Imaging",
    country: "International Technology",
    specs: [
      { label: "Magnetic Field Strength", value: "1.5T / 3.0T Superconducting", labelAr: "شدة المجال المغناطيسي", valueAr: "1.5 تسلا / 3.0 تسلا فائق التوصيل" },
      { label: "Bore Diameter", value: "70 cm Ergonomic Wide Bore", labelAr: "قطر النفق الداخلي", valueAr: "70 سم متسع لراحة المريض" },
      { label: "Gradient System", value: "45 mT/m @ 200 T/m/s Slew Rate", labelAr: "قوة التدرج وسرعة التغير", valueAr: "45 ميلي تسلا/متر بمعدل 200 تسلا/متر/ثانية" },
      { label: "Helium Technology", value: "Zero-Boiloff Cryostat Architecture", labelAr: "استهلاك الهيليوم", valueAr: "تقنية Zero-Boiloff منعدمة الفقد" },
      { label: "RF Channels", value: "32 / 64 Independent RF Receive Channels", labelAr: "قنوات التردد الراديوي", valueAr: "32 / 64 قناة استقبال مستقلة" },
      { label: "Patient Table Load", value: "250 kg Motorized Precision Floating Table", labelAr: "حمولة طاولة الفحص", valueAr: "250 كجم بتحكم كهربائي دقيق" },
    ],
    features: [
      "Deep learning image reconstruction and accelerated acquisition sequences",
      "Ultra-wide 70cm patient bore dramatically reducing claustrophobia",
      "Acoustic noise reduction technology lowering sound pressure by up to 90%",
      "Whole-body multi-channel phased array coil set included",
    ],
    featuresAr: [
      "خوارزميات التعلم العميق لإعادة بناء الصور وتسريع الفحوصات",
      "نفق واسع بقطر 70 سم يقلل من رهاب الأماكن المغلقة لدى المرضى",
      "تقنية كتم الصوت المتقدمة تخفض الضوضاء بنسبة تصل إلى 90%",
      "طقم متكامل من كويلات الاستقبال متعددة القنوات للجسم بالكامل",
    ],
    clinicalApplications: [
      "Neuro: Brain perfusion, diffusion tensor imaging (DTI), functional MRI (fMRI)",
      "Musculoskeletal: High-resolution cartilage, cruciate ligaments, joint biomechanics",
      "Abdomen & Pelvis: Dynamic multiphase liver, MRCP bile duct, multiparametric prostate",
      "Cardiology: Myocardial viability, delayed enhancement, cardiac flow dynamics",
    ],
    clinicalApplicationsAr: [
      "الأعصاب والمخ: تروية الدماغ، مسارات الألياف العصبية DTI، والرنين الوظيفي",
      "العظام والمفاصل: فحص دقيق للغضاريف، الأربطة الصليبية، وإصابات الملاعب",
      "الباطنة والحوض: تصوير الكبد الديناميكي، قنوات المرارة MRCP، وأورام البروستاتا",
      "القلب: كفاءة عضلة القلب، قياس التدفقات الحجمية، والتقييم الحركي السينمائي",
    ],
    image: `${BASE}images/products/mri-system.jpeg`,
    featured: true,
  },

  // ── 2. CT SCANNERS (الأشعة المقطعية) ───────────────────────────────────
  {
    id: "diagnostic-ct-scanner",
    category: "radiology",
    categoryLabel: "CT Scanners",
    modality: "ct",
    modalityLabel: "CT Scanners",
    modalityLabelAr: "الأشعة المقطعية",
    name: "Multi-Slice Diagnostic CT Scanner (64 / 128 / 256 Slice)",
    nameAr: "جهاز الأشعة المقطعية متعدد المقاطع (64 / 128 / 256 شريحة)",
    tagline: "Ultra-Fast Volumetric Imaging with Low-Dose Iterative Reconstruction",
    taglineAr: "تصوير حجمي فائق السرعة مع بروتوكولات خفض الجرعة الإشعاعية",
    overview: "High-speed computed tomography scanner equipped with advanced ceramic scintillation detectors and dual-domain iterative reconstruction algorithms. Engineered for ultra-fast trauma triage, comprehensive coronary CT angiography, and pediatric protocols at dramatically minimized X-ray dose levels across healthcare institutions in Egypt.",
    overviewAr: "جهاز أشعة مقطعية فائق السرعة مزود بكواشف خزفية متطورة وتقنيات إعادة البناء التكراري لخفض الجرعة. صُمم لإجراء فحوصات الطوارئ والحوادث في أجزاء من الثانية، وقسطرة الشرايين التاجية غير التداخلية، وتصوير الأطفال بأقل جرعة إشعاعية ممكنة في المستشفيات المصرية.",
    description: "Multi-slice diagnostic CT scanner delivering sub-millimeter isotropic resolution, low radiation dose protocols, and ultra-fast volumetric acquisition.",
    descriptionAr: "جهاز مقطعية تشخيصي عالي السرعة يوفر دقة متناهية وبروتوكولات متطورة لخفض الجرعة الإشعاعية ومسح حجمي فوري.",
    mainTask: "Cardiovascular angiography, acute trauma evaluation, oncology, and whole-body CT.",
    mainTaskAr: "تصوير الشرايين والقلب، تقييم الطوارئ والحوادث، الأورام، والمسح الحجمي الكامل للجسم.",
    supplier: "Global Imaging Partners",
    country: "International Technology",
    specs: [
      { label: "Slice Acquisition", value: "64 / 128 / 256 Slices per Gantry Rotation", labelAr: "عدد المقاطع", valueAr: "64 / 128 / 256 شريحة في الدورة الواحدة" },
      { label: "Rotation Speed", value: "0.28 to 0.35 Seconds 360° Full Rotation", labelAr: "سرعة الدوران", valueAr: "0.28 إلى 0.35 ثانية لدورة كاملة 360 درجة" },
      { label: "Gantry Aperture", value: "75 to 80 cm Ultra-Large Bore", labelAr: "فتحة الجانتري", valueAr: "75 إلى 80 سم متسعة لحالات الطوارئ والتداخلات" },
      { label: "X-Ray Generator", value: "80 kW to 100 kW High Frequency", labelAr: "مولد الأشعة", valueAr: "80 إلى 100 كيلوواط عالي التردد" },
      { label: "Tube Heat Capacity", value: "8.0 MHU Heavy Duty Anode", labelAr: "السعة الحرارية للأنبوبة", valueAr: "8.0 مليون وحدة حرارية لتحمل ضغط العمل الشاق" },
      { label: "Dose Reduction", value: "AI Iterative Reconstruction (up to 80% reduction)", labelAr: "خفض الجرعة", valueAr: "ذكاء اصطناعي لخفض الإشعاع بنسبة تصل إلى 80%" },
    ],
    features: [
      "Sub-millimeter 0.31mm spatial resolution for crystal-clear fine anatomical detail",
      "Automated coronary artery motion freezing and plaque analysis algorithms",
      "Dual-energy spectral CT capabilities for tissue characterization and gout evaluation",
      "Instant 3D multi-planar reconstruction (MPR) and volume rendering at acquisition console",
    ],
    featuresAr: [
      "دقة مكانية تحت مليمترية (0.31 مم) لإظهار أدق التفاصيل التشريحية للأنسجة",
      "تثبيت آلي لحركة شرايين القلب وتحليل تكلسات وانسدادات الأوعية الدموية",
      "تقنية الطاقة المزدوجة (Dual Energy) لتمييز الأنسجة وتحليل النقرس والحصوات",
      "إعادة بناء فورية ثلاثية الأبعاد (3D MPR & VR) مباشرة على وحدة التحكم",
    ],
    clinicalApplications: [
      "Cardiology: Coronary CTA, calcium scoring, bypass graft patency",
      "Trauma & ER: Whole-body rapid polytrauma and intracranial hemorrhage triage",
      "Chest & Oncology: Low-dose lung screening, pulmonary embolism angiography",
      "Abdomen: Triphasic liver and renal vascular anatomical mapping",
    ],
    clinicalApplicationsAr: [
      "القلب والأوعية: قسطرة الشرايين التاجية المقطعية، نقاط الكالسيوم، ومسارات الوصلات",
      "الطوارئ والحوادث: مسح فوري شامل لإصابات الحوادث ونزيف المخ في ثوانٍ معدودة",
      "الصدر والأورام: مسح الرئة منخفض الجرعة وتصوير الجلطات الرئوية السريعة",
      "الباطنة: تصوير ثلاثي المراحل للكبد والكلى والتروية الدموية الدقيقة",
    ],
    image: `${BASE}images/products/diagnostic-ct-scanner.jpg`,
    featured: true,
  },

  // ── 3. X-RAY & DR (أجهزة الأشعة السينية والرقمية) ─────────────────────
  {
    id: "digital-radiography-dr",
    category: "radiology",
    categoryLabel: "X-Ray & DR Systems",
    modality: "dr",
    modalityLabel: "X-Ray & DR",
    modalityLabelAr: "الأشعة السينية والرقمية",
    name: "Ceiling-Suspended & Floor-Mounted Digital Radiography (DR) Suites",
    nameAr: "منظومة الأشعة السينية الرقمية المتكاملة (DR)",
    tagline: "Automated Motorized Auto-Tracking Suite with Dual Wireless CsI Detectors",
    taglineAr: "منظومة أشعة رقمية آلية الحركة بكواشف لاسلكية عالية الحساسية",
    overview: "Fully motorized digital radiography system with robotic auto-positioning, synchronized tube-detector tracking, and high-sensitivity Cesium Iodide (CsI) wireless flat panel detectors. Engineered to handle continuous patient traffic in hospital emergency departments, outpatient clinics, and orthopedic facilities throughout Egypt.",
    overviewAr: "منظومة تصوير إشعاعي رقمية متكاملة مدعومة بالتتبع الآلي المتزامن بين الأنبوبة والكاشف، وكواشف فوسفات السيزيوم (CsI) اللاسلكية فائقة الحساسية. مصممة لتحمل ضغط العمل المكثف في مستشفيات الطوارئ، العيادات الخارجية، ومراكز جراحة العظام في مصر.",
    description: "Fully automated high-frequency digital radiography suite featuring wireless CsI flat panel detectors, motorized synchronized positioning, and rapid PACS integration.",
    descriptionAr: "منظومة أشعة سينية رقمية عالية التردد مؤتمتة بالكامل، مزودة بكواشف رقمية لاسلكية وتحريك آلي متزامن.",
    mainTask: "General skeletal, chest, abdominal, and emergency orthopedic radiography.",
    mainTaskAr: "تصوير العظام، الصدر، البطن، وطوارئ الكسور والإصابات بدقة رقمية فورية.",
    supplier: "Angel / InnoCare / Global Imaging",
    country: "International Technology",
    specs: [
      { label: "Detector Technology", value: "Wireless Cesium Iodide (CsI) Flat Panel Detector", labelAr: "تقنية الكاشف", valueAr: "كاشف مسطح لاسلكي من يوديد السيزيوم (CsI)" },
      { label: "Active Detector Area", value: "43 x 43 cm (17 x 17 in) Large Field of View", labelAr: "مساحة الكاشف", valueAr: "43 × 43 سم (17 × 17 بوصة) تغطية كاملة" },
      { label: "High-Frequency Generator", value: "50 kW to 80 kW / 150 kV Output", labelAr: "مولد الأشعة", valueAr: "50 إلى 80 كيلوواط عالي التردد حتى 150 ك.ف" },
      { label: "Positioning System", value: "Robotic Auto-Tracking with Motorized Travel", labelAr: "نظام الحركة", valueAr: "تتبع آلي متزامن وتحريك كهربائي ذكي بالكامل" },
      { label: "Image Preview Time", value: "< 2.5 Seconds from Exposure to Display", labelAr: "سرعة ظهور الصورة", valueAr: "أقل من 2.5 ثانية من وقت التعريض للشاشة" },
      { label: "Tabletop Weight Capacity", value: "250 kg Heavy-Duty Carbon Fiber Table", labelAr: "حمولة الطاولة", valueAr: "250 كجم كربون فايبر منخفض التوهين" },
    ],
    features: [
      "Automated single-touch exam protocol selection adjusting tube angle and SID",
      "Dose Area Product (DAP) meter built into collimator for exact radiation auditing",
      "Full spine and long leg automated digital image stitching software",
      "Grid suppression algorithms allowing grid-free low-dose pediatric exposures",
    ],
    featuresAr: [
      "اختيار الوضعيات بلمسة واحدة مع ضبط آلي لزاوية الأنبوبة والمسافة SID",
      "مقياس DAP مدمج لحساب ومراقبة الجرعة الإشعاعية بدقة طبية معتمدة",
      "برمجيات التجميع الرقمي الآلي (Stitching) للعمود الفقري والأطراف الطويلة",
      "خوارزميات تصوير بدون شبكة تمنح الأطفال أدنى جرعة إشعاعية ممكنة",
    ],
    clinicalApplications: [
      "Chest: Routine lung screening and occupational health checks",
      "Orthopedics: Standing weight-bearing joints, spine stitching, fractures",
      "Abdomen: KUB diagnostics, acute abdomen evaluations",
      "Pediatrics: Tailored ultra-low mAs infant imaging",
    ],
    clinicalApplicationsAr: [
      "الصدر: الفحص الدوري للرئتين والشهادات الطبية المهنية",
      "العظام: تصوير المفاصل تحت الحمل الحركي، قياس استقامة العمود الفقري، والكسور",
      "المسالك والبطن: فحص الكلى والمسالك KUB وحالات البطن الحادة",
      "الأطفال: بروتوكولات مخصصة بجرعات إشعاعية متناهية الصغر لحماية الصغار",
    ],
    image: `${BASE}images/products/digital-radiography-dr.jpg`,
    featured: true,
  },

  // ── 4. CATH-LAB (قسطرة القلب والأوعية الدموية) ─────────────────────────
  {
    id: "cath-lab-angiography",
    category: "radiology",
    categoryLabel: "Cath-Lab Systems",
    modality: "cathlab",
    modalityLabel: "Cath-Lab",
    modalityLabelAr: "قسطرة القلب والأوعية",
    name: "Interventional Cardiovascular & Angiography Cath-Lab Suite",
    nameAr: "منظومة قسطرة القلب والأوعية الدموية التداخلية (Cath-Lab)",
    tagline: "High-Precision Single-Plane Cardiovascular Angiography Suite",
    taglineAr: "منظومة قسطرة قلبية أحادية المستوى فائقة الدقة للجراحات التداخلية",
    overview: "Turnkey interventional cardiovascular angiography laboratory designed for precision coronary intervention, structural heart procedures, and peripheral endovascular surgery. Equipped with high-DQE dynamic flat panel detector, liquid-metal bearing tube, and live stent enhancement tools ensuring zero-downtime reliability in Egyptian cardiac centers.",
    overviewAr: "وحدة قسطرة قلبية وأوعية دموية تداخلية متكاملة مخصصة لعمليات الشرايين التاجية، أمراض صمامات القلب الهيكلية، وجراحات الأوعية الدموية الطرفية. مزودة بكاشف ديناميكي عالي الكفاءة، أنبوبة أشعة ذات تبريد مستمر، وتقنيات إظهار الدعامات الحية لضمان استمرارية العمل على مدار الساعة في مراكز القلب المصرية.",
    description: "Dedicated single-plane cardiovascular catheterization laboratory providing crystal-clear fluoroscopic imaging, real-time stent visualization, and high heat capacity tubes.",
    descriptionAr: "وحدة قسطرة قلبية وأوعية دموية متطورة، توفر تصويرًا فلوروسكوبيًا فائق الوضوح وتقنيات إظهار الدعامات اللحظية.",
    mainTask: "Coronary angioplasty, stenting, pacemaker implantation, and peripheral vascular interventions.",
    mainTaskAr: "توسيع وتركيب دعامات الشرايين التاجية، زراعة منظمات ضربات القلب، وقسطرة الأوعية الطرفية.",
    supplier: "Global Interventional Partners",
    country: "International Technology",
    specs: [
      { label: "Flat Panel Detector", value: "30 x 30 cm / 20 x 20 cm Solid-State Dynamic Panel", labelAr: "الكاشف الديناميكي", valueAr: "30 × 30 سم / 20 × 20 سم كاشف ديناميكي فائق الوضوح" },
      { label: "High-Power Generator", value: "100 kW Constant Potential High-Frequency", labelAr: "مولد الطاقة", valueAr: "100 كيلوواط عالي التردد بجهد مستمر فائق الاستقرار" },
      { label: "Liquid Metal Tube", value: "High Continuous Dissipation Liquid-Metal Bearing Tube", labelAr: "تقنية أنبوبة الأشعة", valueAr: "أنبوبة بمحامل معدنية سائلة لتبريد لحظي مستمر" },
      { label: "Fluoroscopy Modes", value: "Pulsed Fluoroscopy from 7.5 to 30 pulses/sec", labelAr: "أنماط الفلوروسكوبي", valueAr: "نبضات متغيرة من 7.5 إلى 30 نبضة/ثانية لتوفير الإشعاع" },
      { label: "C-Arm Gantry Motion", value: "Floor-Mounted or Ceiling-Suspended Isocentric Gantry", labelAr: "حركة القوس C", valueAr: "قوس متساوي المركز بحركة محورية سريعة" },
      { label: "Catheterization Table", value: "Floating Carbon-Fiber Table with 4-Way Power Float", labelAr: "طاولة القسطرة", valueAr: "طاولة كربون فايبر طافية في 4 اتجاهات بحمولة 250 كجم" },
    ],
    features: [
      "Live StentBoost / ClearStent visualization during coronary deployment",
      "Real-time roadmapping and vessel overlay for navigation through complex tortuous arteries",
      "Sub-second emergency gantry park and CPR table quick-release safety mechanisms",
      "Comprehensive radiation protection shielding package including ceiling and under-table lead aprons",
    ],
    featuresAr: [
      "تقنية StentBoost لتوضيح وتأكيد فتح الدعامات في الشرايين التاجية لحظياً",
      "رسم خرائط الأوعية الحية (Roadmapping) لتسهيل توجيه القساطر في الشرايين الصعبة",
      "وضع الطوارئ السريع للإخلاء ونظام تحرير الطاولة الفوري للإنعاش القلبي CPR",
      "حزمة متكاملة للحماية من الإشعاع تشمل الستائر الرصاصية العلوية والسفلية",
    ],
    clinicalApplications: [
      "Interventional Cardiology: Primary PCI, bifurcation lesions, CTO interventions",
      "Electrophysiology: Diagnostic EP studies, pacemaker & ICD implantation",
      "Peripheral Vascular: Carotid stenting, iliac & femoral angioplasty, EVAR",
      "Interventional Radiology: Transarterial chemoembolization (TACE), uterine fibroid embolization",
    ],
    clinicalApplicationsAr: [
      "قسطرة القلب التداخلية: علاج الجلطات الحادة PCI، وانسدادات الشرايين المزمنة CTO",
      "كهرباء القلب: دراسات كهروفسيولوجية، زراعة منظمات وصدمات القلب ICD",
      "الأوعية الدموية الطرفية: دعامات الشريان السباتي، توسيع شرايين الساقين، وإصلاح تمدد الأبهر",
      "الأشعة التداخلية: الحقن الكيماوي لشرايين الأورام TACE وقسطرة ألياف الرحم",
    ],
    image: `${BASE}images/products/cath-lab-angiography.jpeg`,
    featured: true,
  },

  // ── 5. C-ARM SYSTEMS (أجهزة الأشعة التداخلية والعمليات) ──────────────────
  {
    id: "surgical-c-arm",
    category: "radiology",
    categoryLabel: "C-Arm Systems",
    modality: "carm",
    modalityLabel: "C-Arm",
    modalityLabelAr: "أجهزة السي آرم والعمليات",
    name: "High-Definition Mobile Surgical C-Arm System",
    nameAr: "جهاز الأشعة التداخلية والعمليات المتنقل (C-Arm)",
    tagline: "Agile Intraoperative Fluoroscopy with High-DQE Flat Panel Technology",
    taglineAr: "تصوير فلوروسكوبي جراحي عالي الدقة داخل غرف العمليات",
    overview: "High-definition mobile surgical C-arm system engineered for demanding intraoperative visualization in orthopedic trauma, spine instrumentation, pain management, and vascular surgery. Features ultra-smooth orbital rotation, low radiation pulse fluoroscopy, and a dual-monitor medical workstation easily sanitized for sterile theatre environments.",
    overviewAr: "جهاز سي-آرم جراحي متنقل عالي الوضوح مصمم خصيصاً للرؤية الإشعاعية الدقيقة داخل غرف العمليات لجراحات العظام، تثبيت فقرات العمود الفقري، علاج الألم، وجراحات الأوعية الدموية. يتميز بدوران قوسي سلس للغاية، فلوروسكوبي نبضي منخفض الإشعاع، وعربة شاشات طبية مزدوجة معقمة وسهلة التنقل.",
    description: "Agile high-definition mobile surgical C-arm with high dynamic range flat panel detector, orbital rotation, and pulsed fluoroscopy designed for operating theatres.",
    descriptionAr: "جهاز سي-آرم جراحي متنقل عالي الدقة مزود بكاشف مسطح ودوران محوري سلس لتوفير رؤية إشعاعية دقيقة داخل العمليات.",
    mainTask: "Intraoperative fluoroscopy for orthopedics, spine surgery, pain therapy, and vascular procedures.",
    mainTaskAr: "التصوير الإشعاعي المباشر أثناء العمليات لجراحات العظام، العمود الفقري، وعلاج الألم.",
    supplier: "Global Surgical Imaging",
    country: "International Technology",
    specs: [
      { label: "Detector Type", value: "CMOS / Amorphous Silicon Flat Panel Detector", labelAr: "نوع الكاشف", valueAr: "كاشف رقمي مسطح CMOS / a-Si عالي الحساسية" },
      { label: "Orbital Rotation", value: "135° to 165° Extended Orbital Arc Travel", labelAr: "حركة القوس", valueAr: "دوران قوسي واسع من 135° إلى 165° لسهولة التوجيه" },
      { label: "High-Frequency Generator", value: "5 kW to 15 kW Monoblock Generator", labelAr: "مولد الأشعة", valueAr: "مولد مدمج 5 إلى 15 كيلوواط عالي التردد" },
      { label: "Display Cart", value: "Dual 19 in / 27 in Medical Grade Anti-Glare Monitors", labelAr: "شاشات العرض", valueAr: "شاشتان طبيتان عالية الدقة مقاومة للانعكاس" },
      { label: "Pulsed Fluoroscopy", value: "1 to 30 pulses/sec Low-Dose Modes", labelAr: "الفلوروسكوبي النبضي", valueAr: "نبضات منخفضة من 1 إلى 30 نبضة/ثانية لحماية الجراح والمريض" },
      { label: "Cooling System", value: "Active Thermal Circulation for Long Surgical Cases", labelAr: "نظام التبريد", valueAr: "تبريد حراري نشط للعمليات الجراحية الطويلة" },
    ],
    features: [
      "Laser aiming lights on both tube and detector for radiation-free positioning",
      "Smart automatic brightness and contrast optimization (Auto-Exposure Control)",
      "Digital subtraction angiography (DSA) and roadmapping capabilities for vascular work",
      "Compact chassis with effortless steering and electromagnetic parking brakes",
    ],
    featuresAr: [
      "مؤشرات ليزر على الأنبوبة والكاشف لضبط زاوية التصوير دون إشعاع",
      "تحسين آلي ذكي لدرجة السطوع والتباين (AEC) حسب كثافة عظام المريض",
      "إمكانية تصوير الأوعية بالطرح الرقمي (DSA) للعمليات الوعائية التداخلية",
      "شاسيه مدمج سهل التوجيه والحركة مع فرامل كهرومغناطيسية لتثبيت فوري",
    ],
    clinicalApplications: [
      "Orthopedics: Fracture fixation, intramedullary nailing, joint arthroplasty",
      "Spine Surgery: Pedicle screw placement, kyphoplasty, vertebroplasty",
      "Pain Management: Nerve blocks, epidural injections, facet joint denervation",
      "Urology & Vascular: Percutaneous nephrolithotomy (PCNL), balloon angioplasty",
    ],
    clinicalApplicationsAr: [
      "جراحة العظام: تثبيت الكسور المعقدة، المسامير النخاعية، وتغيير المفاصل",
      "جراحة العمود الفقري: تثبيت المسامير الحرقفية وعلاج كسور الفقرات بالحقن الاسمنتي",
      "علاج الألم: حقن الأعصاب الموضعي، حقن الإبيديورال، والتردد الحراري",
      "المسالك والأوعية: تفتيت حصوات الكلى PCNL وقساطر الأوعية الطرفية الطارئة",
    ],
    image: `${BASE}images/products/surgical-c-arm.jpeg`,
    featured: true,
  },
];
