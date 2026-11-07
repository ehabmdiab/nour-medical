export type GalleryCategoryType =
  | 'all'
  | 'team'
  | 'exhibitions';

export interface GalleryImageDetail {
  src: string;
  caption?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleAr?: string;
  category: GalleryCategoryType;
  categoryLabel: string;
  location: string;
  locationAr?: string;
  description: string;
  descriptionAr?: string;
  image: string;
  images: string[];
  imageDetails?: GalleryImageDetail[];
  videoUrl?: string;
  date: string;
  dateAr?: string;
  specs: string;
  specsAr?: string;
}

const BASE = import.meta.env.BASE_URL || '/';

export const GALLERY_CATEGORIES: { id: GalleryCategoryType; label: string; labelAr: string }[] = [
  { id: 'all', label: 'All Media', labelAr: 'كافة الصور' },
  { id: 'team', label: 'Team & Staff', labelAr: 'فريق العمل والمهندسون' },
  { id: 'exhibitions', label: 'Exhibitions & Conferences', labelAr: 'المعارض والمؤتمرات' },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-team-31",
    title: "Eng. El Sayed Awad — Chairman & CEO",
    titleAr: "م. السيد عوض — رئيس مجلس الإدارة والرئيس التنفيذي",
    locationAr: "المقر الرئيسي لنور الطبية، المعادي، القاهرة",
    descriptionAr: "قيادة استراتيجية تشرف على توريد المعدات، وتوسيع شبكة الصيانة الميدانية في مصر، وشراكات كبرى المصنعين الدوليين.",
    specsAr: "القيادة التنفيذية ورؤية التوسع",
    category: "team",
    categoryLabel: "Team & Staff",
    location: "Nour Medical Headquarters, Maadi, Cairo",
    description: "Eng. El Sayed Awad — Chairman & CEO — Professional biomedical service engineers, technicians, and executive leadership driving operational excellence across Egypt.",
    image: `${BASE}images/team/eng-sayed-awad.jpg`,
    images: [
      `${BASE}images/team/eng-sayed-awad.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/team/eng-sayed-awad.jpg`,
        caption: "Eng. El Sayed Awad — Chairman & CEO",
      },
    ],
    date: "2024-2025",
    specs: "Biomedical Engineering & 24/7 Field Response Service",
  },
  {
    id: "gal-team-33",
    title: "Nour Medical Engineering & Technical Team",
    titleAr: "فريق المهندسين والفنيين بشركة نور الطبية",
    locationAr: "مركز العمليات الفنية، المعادي، القاهرة",
    descriptionAr: "نخبة المهندسين الطبيين الميدانيين المتخصصين في تركيب ومعايرة وصيانة أجهزة الرنين المغناطيسي، المقطعية، القسطرة، والأشعة الرقمية.",
    specsAr: "فريق هندسي متخصص في الصيانة الميدانية ٢٤/٧",
    category: "team",
    categoryLabel: "Team & Staff",
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
    titleAr: "ملتقى فريق عمل نور الطبية والاجتماع الميداني",
    locationAr: "القاهرة، مصر",
    descriptionAr: "لقاء دوري يجمع الطواقم الهندسية والميدانية والإدارية لمراجعة الجودة ومؤشرات سرعة الاستجابة الميدانية.",
    specsAr: "التنسيق الميداني ومعايير الجودة",
    category: "team",
    categoryLabel: "Team & Staff",
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
    titleAr: "أ.د. محمد فوزي",
    locationAr: "الندوة السنوية لنور الطبية، القاهرة",
    descriptionAr: "استشاري ورئيس قسم الأشعة التشخيصية خلال مشاركته العلمية في ندوة التكنولوجيا الطبية المتقدمة.",
    specsAr: "المؤتمر العلمي السنوي للأشعة التشخيصية",
    category: "exhibitions",
    categoryLabel: "Exhibitions & Conferences",
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
    titleAr: "أ.د. أشرف زيتون",
    locationAr: "الندوة السنوية لنور الطبية، القاهرة",
    descriptionAr: "أستاذ واستشاري الأشعة التداخلية والتشخيصية يلقي محاضرة حول أحدث تقنيات التصوير بالرنين المغناطيسي والمقطعية.",
    specsAr: "محاضرة علمية حول أحدث تقنيات التصوير الطبي",
    category: "exhibitions",
    categoryLabel: "Exhibitions & Conferences",
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
    titleAr: "د. غالية الموهني",
    locationAr: "المؤتمر السنوي للأشعة، القاهرة",
    descriptionAr: "استشارية الأشعة التشخيصية متحدثة حول تطبيقات الذكاء الاصطناعي وجودة الصورة في التصوير الطبي المتقدم.",
    specsAr: "جلسة علمية حول تطبيقات الذكاء الاصطناعي في الأشعة",
    category: "exhibitions",
    categoryLabel: "Exhibitions & Conferences",
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
    titleAr: "ملتقى القيادات الطبية وندوة الأشعة التشخيصية",
    locationAr: "فندق إنتركونتيننتال سيتي ستارز، القاهرة",
    descriptionAr: "ندوة علمية رفيعة المستوى تجمع نخبة استشاريي وأساتذة الأشعة من مختلف الجامعات والمستشفيات المصرية.",
    specsAr: "ملتقى علمي لكبار استشاريي الأشعة",
    category: "exhibitions",
    categoryLabel: "Exhibitions & Conferences",
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
    titleAr: "الندوة العلمية السنوية لنور الطبية — ١٠ يوليو ٢٠٢٥",
    locationAr: "القاهرة، مصر",
    descriptionAr: "الحدث السنوي الأكبر لنور الطبية لاستعراض أحدث الأجهزة التشخيصية وتكريم المستشفيات والشركاء المتميزين.",
    specsAr: "الندوة العلمية السنوية وتكريم الشركاء",
    category: "exhibitions",
    categoryLabel: "Exhibitions & Conferences",
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
    id: "gal-team-gouna",
    title: "El-Gouna Hospital Technical Operations & Deployment Team",
    titleAr: "فريق العمليات الفنية والتركيب بمستشفى الجونة",
    locationAr: "الجونة، البحر الأحمر",
    descriptionAr: "طاقم المهندسين الطبيين أثناء تسليم وتشغيل وتدريب الكوادر على الأجهزة الرقمية الحديثة.",
    specsAr: "تسليم وتشغيل وتدريب الكوادر الفنية",
    category: "team",
    categoryLabel: "Team & Staff",
    location: "El-Gouna Specialized Hospital, Red Sea",
    description: "Nour Medical field service engineering squad during biomedical imaging calibration and turnkey operational commissioning at El-Gouna Hospital.",
    image: `${BASE}images/gallery/team-gouna-deployment.jpg`,
    images: [
      `${BASE}images/gallery/team-gouna-deployment.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/team-gouna-deployment.jpg`,
        caption: "Nour Medical Biomedical Engineering Team at El-Gouna Hospital",
      },
    ],
    date: "2024-2025",
    specs: "Field Service Engineers | On-site Calibration & Commissioning",
  },
  {
    id: "gal-team-tayseer",
    title: "Al-Tayseer Hospital Technical Field Service Team",
    titleAr: "فريق الصيانة الميدانية بمستشفيات التيسير",
    locationAr: "الزقازيق، الشرقية",
    descriptionAr: "مهندسو نور الطبية أثناء الفحص الدوري والمعايرة الوقائية لأنظمة القسطرة.",
    specsAr: "معايرة وقائية وفحص دوري لأنظمة القسطرة",
    category: "team",
    categoryLabel: "Team & Staff",
    location: "Al-Tayseer International Hospital, Sharkia",
    description: "Specialized radiology engineering unit conducting periodic maintenance protocols and detector calibration for clinical imaging systems.",
    image: `${BASE}images/gallery/team-hospital-support.jpg`,
    images: [
      `${BASE}images/gallery/team-hospital-support.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/team-hospital-support.jpg`,
        caption: "Nour Medical Field Technicians & Hospital Staff at Al-Tayseer",
      },
    ],
    date: "2024-2025",
    specs: "Preventive Maintenance | High-Frequency Calibration",
  },
  {
    id: "gal-team-ramadan",
    title: "Annual Corporate Ramadan Gathering & Team Celebration",
    titleAr: "ملتقى إفطار رمضان السنوي واحتفال الشركة",
    locationAr: "القاهرة، مصر",
    descriptionAr: "الاحتفال السنوي لعائلة وفريق عمل نور الطبية تعزيزاً لروح الفريق والتميز المستمر.",
    specsAr: "الاحتفال السنوي لفريق عمل نور الطبية",
    category: "team",
    categoryLabel: "Team & Staff",
    location: "Nour Medical Executive Gathering, Cairo",
    description: "Annual team celebration gathering bringing together engineering leadership, field technicians, and clinical operations staff.",
    image: `${BASE}images/gallery/team-ramadan-celebration.jpg`,
    images: [
      `${BASE}images/gallery/team-ramadan-celebration.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/team-ramadan-celebration.jpg`,
        caption: "Annual Corporate Ramadan Gathering & Team Event",
      },
    ],
    date: "2025",
    specs: "Executive & Field Engineering Leadership | Annual Celebration",
  }
];
