export type GalleryCategoryType =
  | 'all'
  | 'team'
  | 'exhibitions'
  | 'events';

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
  { id: 'events', label: 'Hospital Events & Celebrations', labelAr: 'الفعاليات والتسليمات' },
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
    id: "gal-event-aseel-handover",
    title: "Aseel Hospital — Official Radiology Wing Handover",
    titleAr: "مستشفى أصيل — حفل تسليم جناح الأشعة والعمليات",
    locationAr: "الغردقة، البحر الأحمر",
    descriptionAr: "حفل تسليم وتدشين رسمي لجناح الأشعة والعمليات الجراحية بحضور قيادات المستشفى وإدارة نور ميديكال.",
    specsAr: "حفل تسليم رسمي وتدشين سريري معتمد",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Aseel Hospital, Hurghada, Red Sea",
    description: "Official department handover ceremony and clinical inauguration with hospital leadership and Nour Medical management.",
    image: `${BASE}images/gallery/event-aseel-handover.jpg`,
    images: [
      `${BASE}images/gallery/event-aseel-handover.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/event-aseel-handover.jpg`,
        caption: "Aseel Hospital Radiology Wing Official Handover",
      },
    ],
    date: "2024-2025",
    specs: "Hospital Commissioning & Handover Milestone",
  },
  {
    id: "gal-clients-98",
    title: "El Assema Hospital",
    titleAr: "مستشفى العاصمة",
    locationAr: "المهندسين، الجيزة",
    descriptionAr: "تشغيل وصيانة أنظمة الأشعة الرقمية والسي آرم لغرف العمليات الجراحية.",
    specsAr: "أجهزة أشعة رقمية وسي آرم للعمليات",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مستشفى المروة",
    locationAr: "الدقي، الجيزة",
    descriptionAr: "توريد وتركيب وحدة قسطرة قلبية كاملة وتحديث وحدة الأشعة بنظام ديجيتال DR.",
    specsAr: "قسطرة قلبية ونظام أشعة رقمية DR",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Al-Marwa Hospital, Dokki, Giza",
    description: "Comprehensive diagnostic radiology and Cath-Lab suite installation by Nour Medical engineers.",
    image: `${BASE}images/clients/al-marwah-building.jpeg`,
    images: [
      `${BASE}images/clients/al-marwah-building.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-marwah-building.jpeg`,
        caption: "Al-Marwa Hospital Building & Entrance",
      },
    ],
    date: "2024-2025",
    specs: "Interventional Cath-Lab & Wireless CsI DR Units",
  },
  {
    id: "gal-event-golden-heart-ceremony",
    title: "Golden Heart Specialized Hospital — Strategic Partnership Ceremony",
    titleAr: "مستشفى جولدن هارت — مراسم الشراكة الاستراتيجية والتكريم",
    locationAr: "المعادي، القاهرة",
    descriptionAr: "مراسم تكريم وتدشين الشراكة التكنولوجية الطبية بحضور نخبة استشاريي القلب وإدارة مستشفى جولدن هارت.",
    specsAr: "مراسم تدشين وشراكة طبية استراتيجية",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Golden Heart Specialized Hospital, Maadi, Cairo",
    description: "Technology partnership commemoration and clinical milestone celebration with senior cardiology consultants.",
    image: `${BASE}images/gallery/event-golden-heart-ceremony.jpeg`,
    images: [
      `${BASE}images/gallery/event-golden-heart-ceremony.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/event-golden-heart-ceremony.jpeg`,
        caption: "Golden Heart Hospital Strategic Partnership Ceremony",
      },
    ],
    date: "2024-2025",
    specs: "Clinical Partnership & Recognition Ceremony",
  },
  {
    id: "gal-clients-105",
    title: "Al-Safwa Hospital & Diagnostic Centers",
    titleAr: "مستشفى ومراكز الصفوة للأشعة",
    locationAr: "مدينة نصر، القاهرة",
    descriptionAr: "أنظمة أشعة رقمية وكواشف فلات بانل مسطحة عالية الكفاءة.",
    specsAr: "كواشف رقمية DR فلات بانل",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Al-Safwa Hospital (6th of October & Faqus)",
    description: "Diagnostic scan center and hospital multi-slice CT unit installations.",
    image: `${BASE}images/clients/al-safwaa-6-october-building-1.jpeg`,
    images: [
      `${BASE}images/clients/al-safwaa-6-october-building-1.jpeg`,
      `${BASE}images/clients/al-safwaa-6-october-building-2.jpeg`,
      `${BASE}images/clients/al-safwaa-faqous-building.png`,
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
    ],
    date: "2024-2025",
    specs: "Multi-Slice CT Scanner & PACS Integration",
  },
  {
    id: "gal-clients-109",
    title: "Al-Tayseer Hospitals",
    titleAr: "مستشفيات التيسير",
    locationAr: "الزقازيق، الشرقية",
    descriptionAr: "عقد صيانة شامل AMC لأنظمة القسطرة التداخلية وغرف العمليات الجراحية.",
    specsAr: "عقد صيانة شامل AMC لأنظمة القسطرة والعمليات",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مستشفى الزهراء والنخبة",
    locationAr: "القاهرة الجديدة",
    descriptionAr: "تركيب أجهزة سي آرم جراحية متنقلة وأنظمة تصوير رقمية متطورة.",
    specsAr: "أجهزة سي آرم جراحية عالية الدقة",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Al-Zahra & El Nokhba Hospital, Kafr El Sheikh",
    description: "Interventional angiography gantry and hospital radiology department setup.",
    image: `${BASE}images/clients/al-zahraa-building.jpeg`,
    images: [
      `${BASE}images/clients/al-zahraa-building.jpeg`,
      `${BASE}images/clients/el-nokhba-logo.png`,
      `${BASE}images/clients/al-zahraa-dr-mohamed-salama.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/al-zahraa-building.jpeg`,
        caption: "Al-Zahra & El Nokhba Hospital Medical Complex",
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
    titleAr: "مستشفى أصيل الغردقة",
    locationAr: "الغردقة، البحر الأحمر",
    descriptionAr: "أنظمة أشعة رقمية DR وكواشف لاسلكية متنقلة لقسم الطوارئ.",
    specsAr: "أشعة رقمية وكواشف لاسلكية للطوارئ",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Aseel Hospital, Hurghada, Red Sea",
    description: "High-frequency mobile surgical C-arm and radiology department clinical equipment.",
    image: `${BASE}images/clients/aseel-building.jpeg`,
    images: [
      `${BASE}images/clients/aseel-building.jpeg`,
      `${BASE}images/clients/aseel-staff.jpg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/aseel-building.jpeg`,
        caption: "Aseel Hospital Hurghada Exterior Facility",
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
    titleAr: "مستشفى بنها الجامعي",
    locationAr: "بنها، القليوبية",
    descriptionAr: "دعم فني استشاري وصيانة متقدمة لأنظمة التصوير الطبي والأشعة المقطعية.",
    specsAr: "دعم فني وصيانة أجهزة الأشعة المقطعية",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    id: "gal-event-cardiology-milestone",
    title: "Cardiology Clinical Handover & Commissioning Milestone",
    titleAr: "مراسم تسليم وتدشين مركز طب القلب التداخلي",
    locationAr: "القاهرة، مصر",
    descriptionAr: "مراسم اعتماد واكتمال التجهيزات الطبية لجناح القلب والقسطرة بحضور رؤساء الأقسام الطبية وفريق نور ميديكال.",
    specsAr: "اعتماد تشغيلي وتدشين طبي ميداني",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Specialized Cardiology Center, Greater Cairo",
    description: "Official commissioning and handover celebration with clinical directors and technical operations leaders.",
    image: `${BASE}images/gallery/event-cardiology-milestone.jpeg`,
    images: [
      `${BASE}images/gallery/event-cardiology-milestone.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/gallery/event-cardiology-milestone.jpeg`,
        caption: "Interventional Cardiology Center Handover Celebration",
      },
    ],
    date: "2024-2025",
    specs: "Turnkey Handover & Operational Commissioning",
  },
  {
    id: "gal-clients-123",
    title: "El Gouna Hospital",
    titleAr: "مستشفى الجونة",
    locationAr: "الجونة، البحر الأحمر",
    descriptionAr: "تحديث رقمي متكامل لأنظمة الأشعة السينية مع كواشف مسطحة وكاميرات ليزرية.",
    specsAr: "ترقية رقمية شاملة DR لنظام الأشعة",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مستشفى السلامة (د. عمر ناجي)",
    locationAr: "المهندسين، الجيزة",
    descriptionAr: "أجهزة سي آرم جراحية لجراحات العظام والعمود الفقري والمخ والأعصاب.",
    specsAr: "أجهزة سي آرم متقدمة لجراحات العظام",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مركز جولدن هارت التخصصي للقلب",
    locationAr: "المهندسين، الجيزة",
    descriptionAr: "وحدة قسطرة قلبية أحادية المستوى ودعم صيانة طوارئ ٢٤/٧.",
    specsAr: "قسطرة قلبية تداخلية متكاملة",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
    location: "Golden Heart Specialized Hospital, Maadi, Cairo",
    description: "Specialized coronary catheterization laboratory and dedicated cardiovascular imaging suites.",
    image: `${BASE}images/clients/golden-heart-building.jpeg`,
    images: [
      `${BASE}images/clients/golden-heart-building.jpeg`,
      `${BASE}images/clients/golden-heart-staff-1.jpeg`,
      `${BASE}images/clients/golden-heart-staff-2.jpeg`,
    ],
    imageDetails: [
      {
        src: `${BASE}images/clients/golden-heart-building.jpeg`,
        caption: "Golden Heart Specialized Cardiac Center Maadi",
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
    titleAr: "المركز الدولي للأشعة والرنين (IRC)",
    locationAr: "مصر الجديدة، القاهرة",
    descriptionAr: "نظام رنين مغناطيسي فائق التوصيل 1.5T ووحدة تبريد هيليوم مغلقة مع صيانة دورية.",
    specsAr: "رنين مغناطيسي 1.5T عالي التباين",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مركز النيل للأشعة",
    locationAr: "المعادي، القاهرة",
    descriptionAr: "أنظمة أشعة رقمية متنقلة وثابتة ووحدات معالجة صور رقمية متطورة.",
    specsAr: "أشعة رقمية DR ثابتة ومتحركة",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مستشفى جنوب سيناء",
    locationAr: "شرم الشيخ، جنوب سيناء",
    descriptionAr: "تجهيز قسم الأشعة بالكامل بوحدات أشعة مقطعية ورقمية تخدم السياحة العلاجية والطوارئ.",
    specsAr: "تجهيز متكامل لقسم الأشعة والطوارئ",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
    titleAr: "مركز طيبة سكان للأشعة",
    locationAr: "الجيزة، مصر",
    descriptionAr: "أنظمة تصوير رنين مغناطيسي ومقطعية عالية الدقة ودعم فني دوري متواصل.",
    specsAr: "رنين مغناطيسي وأشعة مقطعية متطورة",
    category: "events",
    categoryLabel: "Hospital Events & Celebrations",
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
