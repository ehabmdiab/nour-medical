export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  details: string[];
  workflowSteps: { step: string; title: string; desc: string }[];
  badge: string;
  iconName: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "installation",
    title: "Precision Equipment Installation",
    subtitle: "Turnkey imaging suite assembly & architectural shielding",
    tag: "INSTALLATION & RIGGING",
    description: "From heavy CT/MRI gantry rigging to lead-shielded room construction, electrical grounding, and calibration, our certified engineers execute complete turnkey installations to international standards.",
    details: [
      "Site planning, floor loading calculation & 3D CAD layout design",
      "Lead radiation shielding installation & RF cage construction",
      "Heavy equipment rigging, uncrating & precision gantry levelling",
      "Power line conditioning, isolation transformers & grounding checks",
      "Factory-standard system calibration & image quality phantom validation",
    ],
    workflowSteps: [
      { step: "01", title: "Site Survey & CAD", desc: "Radiation shielding & load bearing structural verification" },
      { step: "02", title: "Heavy Rigging", desc: "Precision placement of multi-ton CT / MRI gantries" },
      { step: "03", title: "Calibration", desc: "Phantom alignment & high-DQE image optimization" },
      { step: "04", title: "Certification", desc: "Atomic Energy Authority compliance sign-off" },
    ],
    badge: "Turnkey Precision",
    iconName: "Wrench",
  },
  {
    id: "preventive-maintenance",
    title: "Preventive Maintenance Contracts",
    subtitle: "Proactive diagnostic health checks & calibration",
    tag: "PREVENTIVE CARE",
    description: "Systematic scheduled inspection contracts designed to minimize unplanned equipment downtime, extend tube life, maintain image sharpness, and safeguard hospital revenue.",
    details: [
      "Scheduled quarterly optical, mechanical, and electrical inspections",
      "X-ray tube heat-dissipation and anode wear diagnostics",
      "High-voltage generator calibration & KV/mA accuracy checks",
      "Detector calibration, pixel defect mapping & gain correction",
      "Software updates, PACS backup verification & system log auditing",
    ],
    workflowSteps: [
      { step: "01", title: "Log Audit", desc: "Diagnostic error log evaluation & telemetry scan" },
      { step: "02", title: "Hardware Check", desc: "HV cables, oil pressure, vacuum & cooling checks" },
      { step: "03", title: "Pixel Recalibration", desc: "Gain mapping & image phantom uniformity test" },
      { step: "04", title: "Health Report", desc: "Comprehensive engineering report delivered to hospital" },
    ],
    badge: "Zero-Downtime Goal",
    iconName: "ShieldCheck",
  },
  {
    id: "corrective-maintenance",
    title: "Corrective Emergency Maintenance",
    subtitle: "Rapid-response emergency repair for critical hospital units",
    tag: "24/7 EMERGENCY REPAIR",
    description: "When a Cath-Lab, CT, or X-ray system experiences failure, our mobile field engineering squad dispatches immediately with genuine spare parts from our Maadi Cairo warehouse.",
    details: [
      "Dedicated 24/7 technical hotline with direct senior engineer access",
      "Average response time under 2 hours in Greater Cairo, 4 hours nationwide",
      "Immediate access to 1,000m² Cairo spare parts storage warehouse",
      "Advanced oscilloscope, HV divider & tube diagnostic toolkits",
      "Loaner flat panel detectors provided during extended sensor repairs",
    ],
    workflowSteps: [
      { step: "01", title: "Hotline Triage", desc: "Immediate telephone diagnostic assessment within 15 mins" },
      { step: "02", title: "Rapid Dispatch", desc: "Field engineer dispatched with replacement board / tube" },
      { step: "03", title: "On-Site Repair", desc: "Component replacement, high-voltage test & phantom scan" },
      { step: "04", title: "Clinical Handoff", desc: "Radiologist verification & system status restoration" },
    ],
    badge: "2-Hour Hotline Response",
    iconName: "Zap",
  },
  {
    id: "spare-parts",
    title: "Centralized Spare Parts Warehouse",
    subtitle: "1,000 m² stocked inventory in Maadi, Cairo",
    tag: "PARTS & INVENTORY",
    description: "Eliminating long shipping delays, Nour Medical maintains Egypt's largest specialized inventory of OEM X-ray tubes, high-voltage generators, flat panel detectors, power supplies, and ICU components.",
    details: [
      "1,000 m² temperature and humidity-controlled warehouse in Maadi",
      "Genuine replacement parts for RadMedix, Innocare, Lonwin & major OEMs",
      "High-vacuum X-ray tube inserts, colimators & HV cables ready to ship",
      "Flat panel detector replacement modules with warranty",
      "Nationwide expedited courier dispatch within 4 hours",
    ],
    workflowSteps: [
      { step: "01", title: "Inventory Query", desc: "Instant part number lookup across 10,000+ SKUs" },
      { step: "02", title: "Pre-Shipment QC", desc: "Voltage bench-test and visual sensor inspection" },
      { step: "03", title: "Express Dispatch", desc: "Climate-controlled delivery vehicle to hospital site" },
      { step: "04", title: "Warranty Guarantee", desc: "Full manufacturer-backed replacement warranty" },
    ],
    badge: "1,000 m² Storage",
    iconName: "Box",
  },
  {
    id: "technical-support",
    title: "Remote Tele-Support & PACS Integration",
    subtitle: "Cloud remote diagnostic & digital image workflow setup",
    tag: "DIGITAL TELE-SUPPORT",
    description: "Connecting hospital radiology departments with secure remote diagnostic tools, DICOM PACS integration, cloud backups, and live engineer desktop assistance.",
    details: [
      "AccuVue Cloud PACS installation & hospital HIS/RIS system integration",
      "Encrypted VPN remote diagnostic connection for instant error logging",
      "Radiologist workstation DICOM calibration & monitor QA testing",
      "Staff training on acquisition software & radiation safety protocols",
      "Continuous software telemetry monitoring for early fault warning",
    ],
    workflowSteps: [
      { step: "01", title: "DICOM Connect", desc: "PACS & RIS system integration setup" },
      { step: "02", title: "Cloud Setup", desc: "AccuVue secure off-site archive sync" },
      { step: "03", title: "Staff Training", desc: "Hands-on application specialist instruction" },
      { step: "04", title: "Live Monitoring", desc: "Automated alert tracking & proactive patches" },
    ],
    badge: "24/7 Cloud PACS",
    iconName: "Cpu",
  },
  {
    id: "after-sales",
    title: "Complete After-Sales Hospital Solutions",
    subtitle: "Long-term partnership & lifetime clinical support",
    tag: "PARTNERSHIP CARE",
    description: "We don't just sell medical equipment — we become long-term technological partners, ensuring maximum return on investment, continuous staff education, and smooth equipment upgrades.",
    details: [
      "Dedicated account engineer assigned to every client hospital",
      "Annual radiation safety inspections & calibration recertification",
      "Trade-in program for upgrading legacy X-ray to digital flat panel DR",
      "Customized financial and lease payment structures for healthcare centers",
      "Priority access to new technology rollouts and software releases",
    ],
    workflowSteps: [
      { step: "01", title: "Account Manager", desc: "Dedicated senior biomedical engineer contact" },
      { step: "02", title: "Quarterly Review", desc: "Equipment uptime review & clinical feedback session" },
      { step: "03", title: "DR Retrofit", desc: "Seamless digital upgrades for legacy units" },
      { step: "04", title: "Lifetime Care", desc: "Continuous support throughout system lifespan" },
    ],
    badge: "Lifetime Care",
    iconName: "HeartPulse",
  },
];
