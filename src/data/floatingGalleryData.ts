export type GalleryCategory =
  | "all"
  | "doctors"
  | "team";

export type AspectRatio = "16/9" | "4/3" | "3/4" | "1/1" | "2/3";
export type ItemSize = "sm" | "md" | "lg" | "xl";
export type DepthLayer = 1 | 2 | 3;

export interface FloatingGalleryItem {
  id: string;
  title: string;
  titleAr?: string;
  category: GalleryCategory;
  categoryLabel: string;
  year: string;
  location?: string;
  locationAr?: string;
  imageUrl: string;
  aspectRatio: AspectRatio;
  size: ItemSize;
  depthLayer: DepthLayer;
  supplier?: string;
  specs?: string;
  specsAr?: string;
}

export const GALLERY_CATEGORIES_FILTER: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All Showcase" },
  { id: "doctors", label: "VIP Doctors & Seminars" },
  { id: "team", label: "Nour Medical Team" },
];

const BASE = import.meta.env.BASE_URL || "/";

export const FLOATING_GALLERY_DATA: FloatingGalleryItem[] = [
  // ── VIP DOCTORS & SCIENTIFIC SEMINARS ─────────────────────────────────────
  {
    id: "doc-ashraf-zaytoun",
    title: "Prof. Dr. Ashraf Zaytoun — Diagnostic Radiology Forum",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Cairo, Egypt",
    imageUrl: `${BASE}images/doctors/dr-ashraf-zaytoun.jpg`,
    aspectRatio: "16/9",
    size: "lg",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Consultant of Diagnostic & Interventional Radiology",
  },
  {
    id: "doc-mohamed-fawzy",
    title: "Prof. Dr. Mohamed Fawzy — Interventional Radiology Forum",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Cairo, Egypt",
    imageUrl: `${BASE}images/doctors/dr-mohamed-fawzy.jpg`,
    aspectRatio: "16/9",
    size: "lg",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Consultant of Interventional Radiology & Endovascular Therapy",
  },
  {
    id: "doc-ghalia-elmohani",
    title: "Dr. Ghalia Elmohani — Medical Imaging Leadership",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Cairo, Egypt",
    imageUrl: `${BASE}images/doctors/dr-ghalia-elmohani.jpg`,
    aspectRatio: "16/9",
    size: "md",
    depthLayer: 1,
    supplier: "NOUR MEDICAL",
    specs: "Clinical Radiologist & Medical Imaging Consultant",
  },
  {
    id: "sem-keynote-2025",
    title: "Nour Medical Annual Scientific Seminar — Keynote Address",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Grand Nile Tower, Cairo",
    imageUrl: `${BASE}images/seminar/seminar-dsc00476.jpg`,
    aspectRatio: "16/9",
    size: "xl",
    depthLayer: 3,
    supplier: "NOUR MEDICAL",
    specs: "Seminar 10 July 2025 | Cutting-Edge Radiology Technologies",
  },
  {
    id: "sem-symposium-delegates",
    title: "Annual Scientific Seminar — VIP Radiologists Delegation",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Grand Nile Tower, Cairo",
    imageUrl: `${BASE}images/seminar/seminar-dsc00779.jpg`,
    aspectRatio: "16/9",
    size: "lg",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Seminar 10 July 2025 | Medical Society & Hospital Leaders",
  },
  {
    id: "sem-scientific-session",
    title: "Clinical Leadership & Radiology Scientific Session",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Cairo, Egypt",
    imageUrl: `${BASE}images/doctors/doctor-session-dsc00471.jpg`,
    aspectRatio: "16/9",
    size: "md",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Presentation on High-Definition Dynamic Fluoroscopy",
  },
  {
    id: "sem-auditorium",
    title: "Annual Scientific Seminar — Technical Discussion Panel",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Grand Nile Tower, Cairo",
    imageUrl: `${BASE}images/seminar/seminar-dsc00636.jpg`,
    aspectRatio: "16/9",
    size: "lg",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Seminar 10 July 2025 | Biomedical Engineers & Specialists",
  },
  {
    id: "sem-exhibition-show",
    title: "Nour Medical Scientific Conference & Product Exhibition",
    category: "doctors",
    categoryLabel: "VIP Doctors & Seminars",
    year: "2025",
    location: "Cairo, Egypt",
    imageUrl: `${BASE}images/seminar/seminar-dsc00737.jpg`,
    aspectRatio: "16/9",
    size: "md",
    depthLayer: 1,
    supplier: "NOUR MEDICAL",
    specs: "Live Hands-On Diagnostic Imaging Demonstration",
  },

  // ── NOUR MEDICAL TEAM & FIELD ENGINEERING ─────────────────────────────────
  {
    id: "team-chairman",
    title: "Eng. El Sayed Awad — Chairman & CEO",
    category: "team",
    categoryLabel: "Nour Medical Team",
    year: "2024",
    location: "Nour Medical Headquarters",
    imageUrl: `${BASE}images/team/eng-sayed-awad.jpg`,
    aspectRatio: "2/3",
    size: "xl",
    depthLayer: 3,
    supplier: "NOUR MEDICAL",
    specs: "Executive Leadership & Turnkey Medical Infrastructure",
  },
  {
    id: "team-general-manager",
    title: "Eng. Ahmed Hafez — General Manager",
    titleAr: "م. أحمد حافظ — المدير العام",
    category: "team",
    categoryLabel: "Nour Medical Team",
    year: "2025",
    location: "Nour Medical Headquarters",
    locationAr: "المقر الرئيسي لنور للهندسة الطبية",
    imageUrl: `${BASE}images/team/eng-ahmed-hafez.jpg`,
    aspectRatio: "3/4",
    size: "lg",
    depthLayer: 3,
    supplier: "NOUR MEDICAL",
    specs: "Executive Operations & Biomedical Engineering Management",
    specsAr: "الإدارة التنفيذية والعمليات الهندسية",
  },
  {
    id: "team-operations",
    title: "Nour Medical Operational Excellence & Engineering",
    category: "team",
    categoryLabel: "Nour Medical Team",
    year: "2024",
    location: "Nour Medical Headquarters",
    imageUrl: `${BASE}images/team/team-dsc00614.jpg`,
    aspectRatio: "4/3",
    size: "lg",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Turnkey Project Execution & Technical Service Operations",
  },
  {
    id: "team-engineers-crew",
    title: "Nour Medical Technical Field Service Engineers",
    category: "team",
    categoryLabel: "Nour Medical Team",
    year: "2024",
    location: "Cairo Headquarters",
    imageUrl: `${BASE}images/team/team-dsc00616.jpg`,
    aspectRatio: "16/9",
    size: "lg",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Certified Engineers for Cath-Lab, CT, MRI, and DR Systems",
  },
  {
    id: "team-service-biomedical",
    title: "Nour Medical Biomedical Engineering Division",
    category: "team",
    categoryLabel: "Nour Medical Team",
    year: "2024",
    location: "Cairo Headquarters",
    imageUrl: `${BASE}images/team/team-dsc00614.jpg`,
    aspectRatio: "16/9",
    size: "md",
    depthLayer: 2,
    supplier: "NOUR MEDICAL",
    specs: "Preventive Maintenance (AMC) & Emergency Response Crew",
  },
  {
    id: "team-annual-meeting",
    title: "Nour Medical Corporate Team Annual Gathering",
    category: "team",
    categoryLabel: "Nour Medical Team",
    year: "2024",
    location: "Cairo, Egypt",
    imageUrl: `${BASE}images/team/team-gathering-1.jpeg`,
    aspectRatio: "16/9",
    size: "lg",
    depthLayer: 1,
    supplier: "NOUR MEDICAL",
    specs: "Annual Corporate Strategic Meeting & Team Recognition",
  },
];
