export interface GalleryItem {
  id: string;
  title: string;
  category: "equipment" | "installations" | "hospitals" | "engineering" | "projects";
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  date: string;
  specs: string;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Showcases" },
  { id: "equipment", label: "Radiology Equipment" },
  { id: "installations", label: "Suite Installations" },
  { id: "hospitals", label: "Client Hospitals" },
  { id: "engineering", label: "Engineering & Rigging" },
  { id: "projects", label: "Turnkey Projects" },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Capital Care Cath-Lab Suite Installation",
    category: "installations",
    categoryLabel: "Suite Installations",
    location: "New Cairo, Egypt",
    description: "Turnkey installation of interventional cardiology Cath-Lab suite with ceiling-mounted C-arm, lead shielding, and central monitoring station.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "30x40 cm Dynamic Flat Panel Detector | 100 kW High Frequency",
  },
  {
    id: "gal-2",
    title: "Multi-Slice CT Scanner Assembly",
    category: "equipment",
    categoryLabel: "Radiology Equipment",
    location: "South Sinai Hospital, Sharm El Sheikh",
    description: "64-Slice CT scanner deployment with AI-assisted patient positioning and ultra-low dose volumetric imaging.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "32/64 Slices | 0.24mm Spatial Resolution | AIDR Dose Shield",
  },
  {
    id: "gal-3",
    title: "RadMedix Wireless DR Detector Retrofit",
    category: "equipment",
    categoryLabel: "Radiology Equipment",
    location: "International Center for Radiology, Heliopolis",
    description: "Retrofitting existing analog X-ray rooms with RadMedix Acuity wireless CsI flat panel detectors and AccuVue cloud PACS.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
    date: "2023",
    specs: "14\"x17\" Wireless CsI Panel | AccuVue Cloud PACS Sync",
  },
  {
    id: "gal-4",
    title: "Superconducting 3.0T MRI Gantry Rigging",
    category: "engineering",
    categoryLabel: "Engineering & Rigging",
    location: "Al-Tayseer Hospitals, Zagazig",
    description: "Complex heavy-rigging maneuver transporting 6.5-ton superconducting MRI magnet through specialized wall aperture into RF cage.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    date: "2023",
    specs: "3.0T Superconducting Magnet | Zero-Boiloff Helium Cage",
  },
  {
    id: "gal-5",
    title: "Banha University Hospital Radiology Department",
    category: "hospitals",
    categoryLabel: "Client Hospitals",
    location: "Banha, Qalyubia",
    description: "State-of-the-art diagnostic imaging center equipping Banha University Hospital with digital radiology and Cath-Lab systems.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    date: "2023",
    specs: "Dual Cath-Lab Suites | Digital Radiology Department",
  },
  {
    id: "gal-6",
    title: "Central Sterilization CSSD Department",
    category: "projects",
    categoryLabel: "Turnkey Projects",
    location: "El Gouna Hospital, Red Sea",
    description: "Complete pass-through steam autoclave sterilizer facility installation with bioseal sterile barrier zones.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "600L Double-Door Pass-Through Autoclaves | Siemens PLC",
  },
  {
    id: "gal-7",
    title: "Maadi Spare Parts Warehouse & Testing Lab",
    category: "engineering",
    categoryLabel: "Engineering & Rigging",
    location: "Cairo Headquarters, Maadi",
    description: "1,000m² central inventory housing OEM X-ray tubes, high-voltage generators, circuit boards, and calibration test benches.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "10,000+ OEM SKUs | 24/7 Rapid Dispatch Facility",
  },
  {
    id: "gal-8",
    title: "Surgical Mobile C-Arm Intraoperative Testing",
    category: "equipment",
    categoryLabel: "Radiology Equipment",
    location: "Elite Heart Center, Maadi",
    description: "High-frequency surgical C-arm precision testing during orthopedic and vascular clinical trials.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "5.0 kW High Frequency | Laser Target Crosshairs",
  },
];
