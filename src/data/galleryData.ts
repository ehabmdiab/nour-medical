export interface GalleryItem {
  id: string;
  title: string;
  category: "rsna" | "japan" | "installations" | "videos" | "equipment" | "hospitals";
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  videoUrl?: string;
  date: string;
  specs: string;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Media" },
  { id: "rsna", label: "RSNA Exhibition (USA)" },
  { id: "japan", label: "Japan Facilities" },
  { id: "installations", label: "Field Rigging & Installations" },
  { id: "videos", label: "Video Walkthroughs" },
  { id: "equipment", label: "Radiology Systems" },
  { id: "hospitals", label: "Hospital Projects" },
];

export const GALLERY_DATA: GalleryItem[] = [
  // ── RSNA EXHIBITION ────────────────────────────────────────────────────────
  {
    id: "gal-rsna-1",
    title: "RSNA Annual Meeting Delegation",
    category: "rsna",
    categoryLabel: "RSNA Exhibition (USA)",
    location: "McCormick Place, Chicago, USA",
    description: "Nour Medical leadership and engineering executive team representing Egypt at the Radiological Society of North America (RSNA) annual meeting.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    date: "Annual",
    specs: "International Radiology Technology Exchange | Chicago, IL",
  },
  {
    id: "gal-rsna-2",
    title: "Global Supplier Tech Briefings",
    category: "rsna",
    categoryLabel: "RSNA Exhibition (USA)",
    location: "Chicago, USA",
    description: "Technical alignment sessions with RadMedix (USA) and international OEM partners discussing next-generation flat panel digital detectors.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    date: "Annual",
    specs: "RadMedix USA & Global OEM Technical Summit",
  },

  // ── JAPAN FACILITIES ──────────────────────────────────────────────────────
  {
    id: "gal-japan-1",
    title: "Japan OEM Refurbishment Center",
    category: "japan",
    categoryLabel: "Japan Facilities",
    location: "Tokyo / Osaka, Japan",
    description: "Inspection and quality assurance testing of pre-owned CT and MRI systems at specialized partner refurbishment facilities in Japan.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    date: "Ongoing",
    specs: "ISO-Certified System Inspection & Cold-Magnet Testing",
  },
  {
    id: "gal-japan-2",
    title: "High-Vacuum X-Ray Tube Testing Bench",
    category: "japan",
    categoryLabel: "Japan Facilities",
    location: "Japan Technical Facility",
    description: "Precision calibration of liquid metal bearing X-ray tubes and high-voltage generators prior to shipment to Egypt.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    date: "Ongoing",
    specs: "Japanese Precision OEM Calibration & Vacuum Diagnostics",
  },

  // ── VIDEO WALKTHROUGHS ─────────────────────────────────────────────────────
  {
    id: "gal-vid-1",
    title: "Turnkey Cath-Lab System Live Demonstration",
    category: "videos",
    categoryLabel: "Video Walkthroughs",
    location: "Capital Care Hospital, New Cairo",
    description: "Full video walkthrough showcasing live gantry articulation, fluoroscopy imaging acquisition, and physician control console.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video embed URL format
    date: "2024",
    specs: "Video Walkthrough | 30x40 cm Dynamic Flat Panel Detector",
  },
  {
    id: "gal-vid-2",
    title: "3.0T MRI Superconducting Magnet Shielding & Ramp-Up",
    category: "videos",
    categoryLabel: "Video Walkthroughs",
    location: "Al-Tayseer Hospital, Zagazig",
    description: "Time-lapse video recording of 6.5-ton MRI magnet installation, helium boil-off cage sealing, and magnetic field ramp-up.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "2024",
    specs: "Video Demonstration | 3.0T Cryogenic Ramp-Up Procedure",
  },

  // ── INSTALLATIONS & FIELD RIGGING ──────────────────────────────────────────
  {
    id: "gal-1",
    title: "Capital Care Cath-Lab Suite Installation",
    category: "installations",
    categoryLabel: "Field Rigging & Installations",
    location: "New Cairo, Egypt",
    description: "Turnkey installation of interventional cardiology Cath-Lab suite with ceiling-mounted C-arm, lead shielding, and central monitoring station.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "30x40 cm Dynamic Flat Panel Detector | 100 kW High Frequency",
  },
  {
    id: "gal-4",
    title: "Superconducting 3.0T MRI Gantry Rigging",
    category: "installations",
    categoryLabel: "Field Rigging & Installations",
    location: "Al-Tayseer Hospitals, Zagazig",
    description: "Complex heavy-rigging maneuver transporting 6.5-ton superconducting MRI magnet through specialized wall aperture into RF cage.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    date: "2023",
    specs: "3.0T Superconducting Magnet | Zero-Boiloff Helium Cage",
  },

  // ── RADIOLOGY EQUIPMENT ─────────────────────────────────────────────────────
  {
    id: "gal-2",
    title: "Multi-Slice CT Scanner Assembly",
    category: "equipment",
    categoryLabel: "Radiology Systems",
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
    categoryLabel: "Radiology Systems",
    location: "International Center for Radiology, Heliopolis",
    description: "Retrofitting existing analog X-ray rooms with RadMedix Acuity wireless CsI flat panel detectors and AccuVue cloud PACS.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
    date: "2023",
    specs: "14\"x17\" Wireless CsI Panel | AccuVue Cloud PACS Sync",
  },
  {
    id: "gal-8",
    title: "Surgical Mobile C-Arm Intraoperative Testing",
    category: "equipment",
    categoryLabel: "Radiology Systems",
    location: "Elite Heart Center, Maadi",
    description: "High-frequency surgical C-arm precision testing during orthopedic and vascular clinical trials.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "5.0 kW High Frequency | Laser Target Crosshairs",
  },

  // ── HOSPITAL PROJECTS ──────────────────────────────────────────────────────
  {
    id: "gal-5",
    title: "Banha University Hospital Radiology Department",
    category: "hospitals",
    categoryLabel: "Hospital Projects",
    location: "Banha, Qalyubia",
    description: "State-of-the-art diagnostic imaging center equipping Banha University Hospital with digital radiology and Cath-Lab systems.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    date: "2023",
    specs: "Dual Cath-Lab Suites | Digital Radiology Department",
  },
  {
    id: "gal-6",
    title: "Central Sterilization CSSD Department",
    category: "hospitals",
    categoryLabel: "Hospital Projects",
    location: "El Gouna Hospital, Red Sea",
    description: "Complete pass-through steam autoclave sterilizer facility installation with bioseal sterile barrier zones.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80",
    date: "2024",
    specs: "600L Double-Door Pass-Through Autoclaves | Siemens PLC",
  },
];
