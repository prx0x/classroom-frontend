export interface SchoolContact {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  admissionsEmail: string;
  officeHours: string;
  mapEmbedUrl?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  platform: 'Facebook' | 'Instagram' | 'Twitter' | 'LinkedIn' | 'YouTube' | string;
  url: string;
}

export interface EducationalPillar {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  href: string;
}

export interface AcademicPathwayPreview {
  id: string;
  title: string;
  gradeLevel: string;
  overview: string;
  focusAreas: string[];
  href: string;
}

export interface CampusSpacePreview {
  id: string;
  title: string;
  category: string;
  description: string;
  photographyStatus: string;
  features: string[];
}

export interface StudentLifeFocus {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface CoreValue {
  name: string;
  latinMotto?: string;
  description: string;
}

export interface AdmissionsStep {
  step: string;
  title: string;
  description: string;
  timingNote: string;
}

// Secondary Page Data Interfaces
export interface AboutPageConfig {
  hero: {
    badge: string;
    title: string;
    description: string;
    disclaimer: string;
  };
  mission: {
    overline: string;
    heading: string;
    statement: string;
    vision: string;
    ethosSummary: string;
  };
  leadership: {
    overline: string;
    heading: string;
    description: string;
    verificationNote: string;
    commitments: Array<{ title: string; description: string }>;
  };
  heritage: {
    overline: string;
    heading: string;
    description: string;
    milestones: Array<{
      period: string;
      title: string;
      detail: string;
      status: string;
    }>;
  };
  governance: {
    overline: string;
    heading: string;
    description: string;
    affiliationStatus: string;
    accountabilityNotice: string;
  };
}

export interface GradeDivision {
  id: string;
  division: string;
  grades: string;
  ageSpan: string;
  summary: string;
  keyCompetencies: string[];
}

export interface AcademicDepartment {
  id: string;
  name: string;
  category: string;
  overview: string;
  focusDisciplines: string[];
  pedagogy: string;
}

export interface AcademicsPageConfig {
  hero: {
    badge: string;
    title: string;
    description: string;
    disclaimer: string;
  };
  philosophy: {
    overline: string;
    heading: string;
    lead: string;
    principles: Array<{ title: string; description: string }>;
  };
  divisions: GradeDivision[];
  departments: AcademicDepartment[];
  academicSupport: {
    overline: string;
    heading: string;
    description: string;
    programs: Array<{ title: string; description: string }>;
  };
  calendarNotice: {
    overline: string;
    heading: string;
    note: string;
  };
}

export interface CampusFacility {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  photoStatus: string;
}

export interface CampusPageConfig {
  hero: {
    badge: string;
    title: string;
    description: string;
    disclaimer: string;
  };
  overview: {
    overline: string;
    heading: string;
    description: string;
    principles: Array<{ title: string; description: string }>;
  };
  facilities: CampusFacility[];
  accessibilityAndSafety: {
    overline: string;
    heading: string;
    description: string;
    policies: Array<{ title: string; description: string }>;
  };
  visiting: {
    overline: string;
    heading: string;
    description: string;
    hours: string;
    guidelines: string[];
  };
}

export interface CoCurricularActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  activities: string[];
}

export interface SchoolTradition {
  season: string;
  name: string;
  description: string;
  status: string;
}

export interface StudentLifePageConfig {
  hero: {
    badge: string;
    title: string;
    description: string;
    disclaimer: string;
  };
  ethos: {
    overline: string;
    heading: string;
    description: string;
    pillars: Array<{ title: string; description: string }>;
  };
  coCurricular: CoCurricularActivity[];
  traditions: SchoolTradition[];
  studentSupport: {
    overline: string;
    heading: string;
    description: string;
    services: Array<{ title: string; description: string }>;
  };
}

export interface AdmissionsStepDetail {
  step: string;
  stage: string;
  title: string;
  description: string;
  checklist: string[];
  timing: string;
}

export interface AdmissionsFaq {
  question: string;
  answer: string;
}

export interface AdmissionsPageConfig {
  hero: {
    badge: string;
    title: string;
    description: string;
    disclaimer: string;
  };
  philosophy: {
    overline: string;
    heading: string;
    description: string;
  };
  journey: AdmissionsStepDetail[];
  documentation: {
    overline: string;
    heading: string;
    description: string;
    categories: Array<{ category: string; items: string[] }>;
    statusNotice: string;
  };
  datesAndFeesNotice: {
    overline: string;
    heading: string;
    datesNotice: string;
    feeNotice: string;
  };
  faqs: AdmissionsFaq[];
}

export interface ContactDepartment {
  department: string;
  purpose: string;
  email: string;
  phone: string;
  hours: string;
}

export interface ContactPageConfig {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  departments: ContactDepartment[];
  visitInfo: {
    overline: string;
    heading: string;
    description: string;
    address: string;
    parkingTransit: string;
    toursNotice: string;
  };
  inquiryNotice: {
    overline: string;
    heading: string;
    description: string;
    status: string;
    alternativeInstructions: string;
  };
}

export interface SchoolConfig {
  name: string;
  shortName: string;
  tagline: string;
  positioningStatement: string;
  establishedYear: number | null;
  boardAffiliation: string;
  gradesOffered: string;
  contact: SchoolContact;
  navigation: NavigationItem[];
  portalNavigation: {
    label: string;
    href: string;
  };
  socialLinks: SocialLink[];
  meta: {
    titleTemplate: string;
    defaultDescription: string;
  };
  // Homepage Narrative Content
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    portalCta: { label: string; href: string };
    compositionCaption: string;
    verifiedStatus: string;
  };
  intro: {
    overline: string;
    heading: string;
    paragraphs: string[];
    quoteAuthor?: string;
    quoteTitle?: string;
  };
  pillars: EducationalPillar[];
  academicsPreview: {
    overline: string;
    heading: string;
    description: string;
    pathways: AcademicPathwayPreview[];
    cta: { label: string; href: string };
  };
  campusPreview: {
    overline: string;
    heading: string;
    description: string;
    spaces: CampusSpacePreview[];
    cta: { label: string; href: string };
  };
  studentLifePreview: {
    overline: string;
    heading: string;
    description: string;
    areas: StudentLifeFocus[];
    cta: { label: string; href: string };
  };
  values: {
    overline: string;
    heading: string;
    subheading: string;
    items: CoreValue[];
  };
  admissionsCta: {
    overline: string;
    heading: string;
    description: string;
    steps: AdmissionsStep[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  portalBanner: {
    overline: string;
    heading: string;
    description: string;
    cta: { label: string; href: string };
  };

  // Secondary Pages Complete Config
  about: AboutPageConfig;
  academics: AcademicsPageConfig;
  campus: CampusPageConfig;
  studentLife: StudentLifePageConfig;
  admissions: AdmissionsPageConfig;
  contactPage: ContactPageConfig;
}

/**
 * Official, verified configuration for the Indian Institute of Information Technology, Kota (IIIT Kota).
 * Sourced directly from https://iiitkota.ac.in
 */
export const schoolConfig: SchoolConfig = {
  name: "Indian Institute of Information Technology, Kota",
  shortName: "IIIT Kota",
  tagline: "Work is Worship",
  positioningStatement:
    "An Institute of National Importance under an Act of Parliament, established on a Public-Private Partnership (PPP) model by the Ministry of Education (Govt. of India), Govt. of Rajasthan, and Industry Partners.",
  establishedYear: 2013,
  boardAffiliation: "Institute of National Importance (Ministry of Education, Government of India)",
  gradesOffered: "B.Tech, M.Tech, and Ph.D. in CSE, AI & Data Engineering, and ECE",
  contact: {
    address: "Permanent Campus, Ranpur, Kota",
    city: "Kota",
    state: "Rajasthan",
    postalCode: "325003",
    country: "India",
    phone: "+91-0744-2667000 / 2667010",
    email: "office@iiitkota.ac.in",
    admissionsEmail: "admissions@iiitkota.ac.in",
    officeHours: "Monday – Friday: 9:00 AM – 5:30 PM IST",
    mapEmbedUrl: "https://maps.google.com/?q=IIIT+Kota+Ranpur",
  },
  navigation: [
    {
      label: "About",
      href: "/about",
      description: "Institute heritage, mission, governance, and national importance",
    },
    {
      label: "Academics",
      href: "/academics",
      description: "B.Tech, M.Tech, Ph.D. programs and curriculum frameworks",
    },
    {
      label: "Campus",
      href: "/campus",
      description: "100-acre permanent campus at Ranpur, computing labs, and facilities",
    },
    {
      label: "Student Life",
      href: "/student-life",
      description: "Eigen fest, coding clubs, robotics, cultural guilds, and athletics",
    },
    {
      label: "Admissions",
      href: "/admissions",
      description: "JEE (Main) JoSAA / CSAB counseling and CCMT admission guidelines",
    },
    {
      label: "Contact",
      href: "/contact",
      description: "Campus location at Ranpur, directory, and administrative inquiries",
    },
  ],
  portalNavigation: {
    label: "Classroom Portal",
    href: "/portal",
  },
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com/iiitkota" },
    { platform: "LinkedIn", url: "https://linkedin.com/school/iiitkota" },
  ],
  meta: {
    titleTemplate: "%s | IIIT Kota",
    defaultDescription:
      "Indian Institute of Information Technology, Kota (IIIT Kota) — An Institute of National Importance offering undergraduate, postgraduate, and doctoral studies in engineering.",
  },

  // Section 1: Hero
  hero: {
    badge: "Institute of National Importance • Ministry of Education, Govt. of India",
    headline: "Pioneering technical excellence, intelligent systems, and impactful research.",
    subheadline:
      "IIIT Kota prepares engineers and researchers to lead in Computer Science, Artificial Intelligence, and Communication Engineering from its 100-acre permanent campus at Ranpur, Kota.",
    primaryCta: { label: "JoSAA / CSAB Admissions", href: "/admissions" },
    secondaryCta: { label: "Academic Departments", href: "/academics" },
    portalCta: { label: "Classroom Portal", href: "/portal" },
    compositionCaption: "Main Academic Complex & Quadrangle, Ranpur Permanent Campus",
    verifiedStatus: "Official Campus Photography Verified",
  },

  // Section 2: Introduction
  intro: {
    overline: "The Institute Ethos",
    heading: "Technological education as an active journey of inquiry, innovation, and national impact.",
    paragraphs: [
      "Established in 2013 under the Public-Private Partnership (PPP) model by the Ministry of Education (Government of India), the Government of Rajasthan, and prominent industry partners, IIIT Kota is designated as an Institute of National Importance under an Act of Parliament.",
      "Operating from its expansive 100-acre permanent campus in Ranpur, Kota, the institute combines world-class computing facilities, advanced VLSI and robotics research laboratories, and rigorous pedagogical mentorship to shape technologists for a rapidly evolving global society.",
    ],
  },

  // Section 3: Educational Pillars
  pillars: [
    {
      id: "computer-science",
      number: "01",
      title: "Core Computer Science & Systems",
      category: "CSE Department",
      summary: "Foundational algorithms, distributed architectures, and cybersecurity.",
      description:
        "Developing computational thinking, scalable systems architecture, software engineering paradigms, and rigorous discrete mathematics.",
      href: "/academics",
    },
    {
      id: "artificial-intelligence",
      number: "02",
      title: "AI & Data Engineering",
      category: "AI & DE Department",
      summary: "Machine learning, neural networks, and massive-scale data analytics.",
      description:
        "Interdisciplinary training in deep learning, computer vision, natural language processing, predictive modeling, and intelligent agent design.",
      href: "/academics",
    },
    {
      id: "electronics-communication",
      number: "03",
      title: "Electronics & Next-Gen Hardware",
      category: "ECE Department",
      summary: "VLSI chip design, embedded microcontrollers, and wireless communications.",
      description:
        "Hands-on investigation of semiconductor devices, IoT networks, digital signal processing, RF engineering, and real-time embedded systems.",
      href: "/academics",
    },
    {
      id: "research-incubation",
      number: "04",
      title: "Translational Research & Industry Impact",
      category: "Innovation & Incubation",
      summary: "Industry collaboration, open-source projects, and entrepreneurship.",
      description:
        "Close partnerships with industry leaders and national research institutes, nurturing student startups, patents, and high-impact publications.",
      href: "/campus",
    },
  ],

  // Section 4: Academics Preview
  academicsPreview: {
    overline: "Academic Programs",
    heading: "Rigorous undergraduate, postgraduate, and doctoral curricula.",
    description:
      "Our curricula follow international ACM/IEEE benchmarks, blending theoretical mathematical depth with intensive laboratory practice.",
    pathways: [
      {
        id: "btech-cse",
        title: "B.Tech in Computer Science and Engineering",
        gradeLevel: "4-Year B.Tech (8 Semesters)",
        overview:
          "Comprehensive engineering curriculum spanning data structures, algorithms, compiler design, operating systems, cloud computing, and network security.",
        focusAreas: ["Algorithmic Analysis", "Operating Systems", "Cloud & Distributed Systems", "Cybersecurity"],
        href: "/academics",
      },
      {
        id: "btech-aide",
        title: "B.Tech in Artificial Intelligence & Data Engineering",
        gradeLevel: "4-Year B.Tech (8 Semesters)",
        overview:
          "Cutting-edge specialization addressing big data systems, probabilistic graphical models, computer vision, deep reinforcement learning, and ethics in AI.",
        focusAreas: ["Deep Learning & NLP", "Computer Vision", "Big Data Pipelines", "Statistical Modeling"],
        href: "/academics",
      },
      {
        id: "btech-ece",
        title: "B.Tech in Electronics & Communication Engineering",
        gradeLevel: "4-Year B.Tech (8 Semesters)",
        overview:
          "Rigorous hardware and telecommunications training covering analog/digital VLSI design, embedded microcontrollers, wireless communications, and signal processing.",
        focusAreas: ["VLSI & Chip Design", "Embedded Systems & IoT", "Digital Signal Processing", "Wireless & 5G Systems"],
        href: "/academics",
      },
    ],
    cta: { label: "Explore Complete Curriculum & Syllabi", href: "/academics" },
  },

  // Section 5: Campus Preview
  campusPreview: {
    overline: "Ranpur Permanent Campus",
    heading: "100+ acres designed for focused research, learning, and student community.",
    description:
      "A modern campus featuring central academic complexes, specialized engineering laboratories, automated libraries, student residences, and sports facilities.",
    spaces: [
      {
        id: "central-library",
        title: "Main Academic Complex & Senate Hall",
        category: "Academic & Administrative Core",
        description:
          "The monumental central pavilion featuring air-conditioned lecture theatres, departmental chambers, smart tutorial rooms, and senate conference halls.",
        photographyStatus: "Official Campus Photography Verified",
        features: ["Air-conditioned tiered lecture halls", "Smart digital podiums & projection", "Senate hall & executive suites"],
      },
      {
        id: "discovery-labs",
        title: "Advanced Computing & VLSI Laboratories",
        category: "Computing & Hardware Research",
        description:
          "High-performance GPU computing clusters, EDA VLSI design software, FPGA development boards, and embedded systems prototyping benches.",
        photographyStatus: "Official Facility Documentation",
        features: ["High-speed gigabit networking", "Cadence & Synopsys EDA tools", "Dedicated robotics and IoT bays"],
      },
      {
        id: "performance-hall",
        title: "Central Automated Library & Digital Commons",
        category: "Library & Information Science",
        description:
          "Fully automated library using KOHA cataloging, with subscriptions to IEEE Xplore, ACM Digital Library, and the national e-ShodhSindhu consortium.",
        photographyStatus: "Official Facility Documentation",
        features: ["KOHA automated catalog", "e-ShodhSindhu e-journal access", "Quiet research carrels & reading cloisters"],
      },
    ],
    cta: { label: "Explore Campus Facilities", href: "/campus" },
  },

  // Section 6: Student Life Preview
  studentLifePreview: {
    overline: "Campus Culture & Innovation",
    heading: "A vibrant ecosystem powered by student leadership and innovation.",
    description:
      "Student life at IIIT Kota thrives on student-led technical councils, competitive coding hackathons, cultural festivals, and active sports tournaments.",
    areas: [
      {
        id: "fest",
        title: "Eigen — Annual Techno-Cultural Fest",
        category: "Flagship Institute Festival",
        description:
          "The premier annual techno-cultural extravaganza bringing together national hackathons, robotics arenas, esports tournaments, and star musical performances.",
        highlights: ["24-Hour Code Hackathons", "Robo-Soccer & Drone Challenges", "Esports Gaming Arenas", "Pro-Nights & Cultural Stages"],
      },
      {
        id: "technical-societies",
        title: "Technical Councils & Coding Guilds",
        category: "Innovation & Development",
        description:
          "Student-driven developer groups conducting open-source workshops, algorithmic bootcamps, and national competitive programming training.",
        highlights: ["Algorithmus (Coding Club)", "ARC (Robotics Club)", "Google Developer Student Club (GDSC)", "Competitive Programming"],
      },
      {
        id: "arts-culture",
        title: "Creative Arts, Media & Athletics",
        category: "Creativity & Well-being",
        description:
          "Diverse societies fostering creative talents in photography, theatrical production, literary debates, along with multi-sport grounds.",
        highlights: ["Artive (Design & Fine Arts)", "Capture (Photography Club)", "Odyssey (Debate & Literature)", "Hostel League Sports"],
      },
    ],
    cta: { label: "Discover Student Life & Clubs", href: "/student-life" },
  },

  // Section 7: School Values
  values: {
    overline: "Guiding Principles",
    heading: "The bedrock of our academic and research community.",
    subheading:
      "Rooted in ancient wisdom and modern scientific rigor, our core values guide engineering ethics, research integrity, and community stewardship.",
    items: [
      {
        name: "Technical Integrity",
        latinMotto: "Satyam Eva Jayate",
        description:
          "Steadfast commitment to scientific honesty, ethical software and hardware engineering, and transparent scholarship.",
      },
      {
        name: "Pursuit of Excellence",
        latinMotto: "Karmanye Vadhikaraste",
        description:
          "Upholding the highest international benchmarks in engineering rigor, algorithmic efficiency, and foundational research.",
      },
      {
        name: "Innovation for Society",
        latinMotto: "Bahujana Hitaya",
        description:
          "Deploying emerging technologies and computational solutions to address real challenges across India and the global community.",
      },
      {
        name: "Collaborative Stewardship",
        latinMotto: "Sanghachhadhwam",
        description:
          "Cultivating a welcoming, inclusive campus culture built on mutual mentorship, peer support, and interdisciplinary teamwork.",
      },
    ],
  },

  // Section 8: Admissions CTA
  admissionsCta: {
    overline: "National Entrance",
    heading: "Join IIIT Kota through JEE (Main) & JoSAA / CSAB.",
    description:
      "Undergraduate admissions to B.Tech programs are conducted through centralized national counseling (JoSAA / CSAB) based on JEE (Main) ranks. Postgraduate (M.Tech) admissions proceed via GATE and CCMT.",
    steps: [
      {
        step: "01",
        title: "Appear for JEE (Main)",
        description: "National Testing Agency (NTA) entrance examination for engineering aspirants across India.",
        timingNote: "Session 1 & Session 2 (January & April)",
      },
      {
        step: "02",
        title: "JoSAA / CSAB Registration",
        description: "Register online and participate in centralized choice filling for IIIT Kota branches (CSE, AI&DE, ECE).",
        timingNote: "June – July annually",
      },
      {
        step: "03",
        title: "Seat Allocation & Verification",
        description: "Accept allotted seat, submit verification documents, and pay the seat acceptance fee online.",
        timingNote: "Multi-round national counseling",
      },
      {
        step: "04",
        title: "Physical Reporting at Ranpur",
        description: "Complete in-person document verification, hostel room allocation, and orientation at the permanent campus.",
        timingNote: "August semester commencement",
      },
    ],
    primaryCta: { label: "JoSAA Counseling Portal", href: "/admissions" },
    secondaryCta: { label: "Admissions Information & Contact", href: "/contact" },
  },

  // Section 9: Portal Banner
  portalBanner: {
    overline: "Campus ERP & Management",
    heading: "Classroom & Academic Portal",
    description:
      "Enrolled students, faculty members, and administrative staff can access course directories, subjects, timetables, and active classroom records.",
    cta: { label: "Open Classroom Portal", href: "/portal" },
  },

  // Secondary Pages Complete Config
  about: {
    hero: {
      badge: "Institute of National Importance • Act of Parliament",
      title: "An institution dedicated to technical mastery, impactful research, and national service.",
      description:
        "Established in 2013 under a Public-Private Partnership (PPP) model by the Ministry of Education, Government of India, the Government of Rajasthan, and industry partners, IIIT Kota is mandated to produce world-class technological leaders.",
      disclaimer: "Official institutional data verified from the IIIT Kota administrative charter and official notifications.",
    },
    mission: {
      overline: "Our Fundamental Purpose",
      heading: "Cultivating innovative minds, technological excellence, and ethical leadership.",
      statement:
        "To empower students through transformative technical education by fostering an environment that encourages intellectual curiosity, scientific creativity, and critical thinking in service of societal advancement.",
      vision:
        "To stand as a globally recognized technological institute that contributes to the nation and the world through cutting-edge education, interdisciplinary research, entrepreneurship, and sustainable innovation.",
      ethosSummary:
        "We believe technical education must transcend rote coding. Through deep systems analysis, rigorous mathematical foundations, and collaborative laboratory design, students learn to build robust technological futures.",
    },
    leadership: {
      overline: "Academic Stewardship",
      heading: "Guided by dedicated faculty mentors and researchers.",
      description:
        "Our faculty members combine doctoral training from premier national and international institutions with active research in AI, computer vision, VLSI design, wireless networks, and distributed computing.",
      verificationNote:
        "Faculty profiles, board of governors, and senate resolutions are maintained in accordance with Ministry of Education guidelines.",
      commitments: [
        {
          title: "Research-Led Pedagogy",
          description: "Classroom instruction is enriched by active faculty research, funded projects, and contemporary industrial practices.",
        },
        {
          title: "Mentorship & Project Guidance",
          description: "Close interaction between students and faculty advisors fosters hands-on innovation and academic excellence.",
        },
        {
          title: "Holistic Student Development",
          description: "Dedicated faculty advisors support students through academic advising, career counseling, and personal wellbeing.",
        },
      ],
    },
    heritage: {
      overline: "Institutional Milestones",
      heading: "A trajectory of growth, innovation, and permanent infrastructure.",
      description:
        "From its early foundation under MNIT Jaipur mentorship to its state-of-the-art permanent campus in Ranpur, Kota.",
      milestones: [
        {
          period: "2013",
          title: "Establishment of IIIT Kota",
          detail: "Founded under the Public-Private Partnership (PPP) model by the Ministry of Education (Govt. of India), Govt. of Rajasthan, and Industry Partners.",
          status: "Official Founding",
        },
        {
          period: "2017",
          title: "Enactment of IIIT (PPP) Act",
          detail: "Conferred the prestigious status of Institute of National Importance by an Act of Parliament (Act 23 of 2017).",
          status: "Parliamentary Charter",
        },
        {
          period: "2023 – Present",
          title: "Transition to Permanent Ranpur Campus",
          detail: "Relocation of operations to the expansive 100.37-acre permanent campus at Ranpur, Kota, featuring modern academic and residential complexes.",
          status: "Fully Operational Campus",
        },
      ],
    },
    governance: {
      overline: "Statutory Governance",
      heading: "Autonomous governance under the Ministry of Education, Govt. of India.",
      description:
        "Governed by a distinguished Board of Governors comprising senior government officials, academic leaders from IITs/NITs, and prominent industry representatives.",
      affiliationStatus: "Institute of National Importance under Ministry of Education, Government of India",
      accountabilityNotice:
        "All institutional operations, academic curricula, and audited financial statements are submitted directly to the Parliament of India via the Ministry of Education.",
    },
  },

  academics: {
    hero: {
      badge: "Engineering Curricula & Research",
      title: "Cultivating analytical rigor and technological leadership across computing disciplines.",
      description:
        "Our academic framework weaves foundational discrete mathematics, computer systems architecture, microelectronics, and artificial intelligence into comprehensive 4-year degree programs.",
      disclaimer: "All curricula are approved by the Senate of IIIT Kota following national engineering accreditation frameworks.",
    },
    philosophy: {
      overline: "Curriculum Pedagogy",
      heading: "Engineering rigor, empirical discovery, and systems design.",
      lead:
        "We reject passive memorization in favor of hands-on laboratory implementation, algorithmic analysis, and collaborative semester-long projects. Students learn how to architect scalable, resilient software and hardware systems.",
      principles: [
        {
          title: "Foundational Mathematical Rigor",
          description: "Discrete mathematics, linear algebra, probability, and optimization form the bedrock of all engineering specializations.",
        },
        {
          title: "Intensive Laboratory Practice",
          description: "Every theoretical course is paired with hands-on laboratory exercises, code reviews, and hardware experimentation.",
        },
        {
          title: "Interdisciplinary Project Synthesis",
          description: "Students collaborate across CSE, AI, and ECE disciplines to tackle complex real-world engineering challenges.",
        },
        {
          title: "Ethics in Engineering & AI",
          description: "Computational systems are analyzed through the lens of data privacy, algorithmic fairness, and societal consequence.",
        },
      ],
    },
    divisions: [
      {
        id: "undergraduate",
        division: "Undergraduate Engineering (B.Tech)",
        grades: "4-Year Program (8 Semesters)",
        ageSpan: "Undergraduate Students",
        summary:
          "Rigorous undergraduate programs in Computer Science & Engineering, Artificial Intelligence & Data Engineering, and Electronics & Communication Engineering.",
        keyCompetencies: [
          "Data structures, advanced algorithms, and computational complexity",
          "Operating systems, compilers, computer architecture, and distributed networks",
          "Machine learning models, neural networks, computer vision, and NLP pipelines",
          "VLSI circuit design, embedded microcontrollers, and digital communications",
        ],
      },
      {
        id: "postgraduate",
        division: "Postgraduate Programs (M.Tech)",
        grades: "2-Year Program (4 Semesters)",
        ageSpan: "Graduate Students",
        summary:
          "Advanced specialization and thesis research in computer science and electronics, admitting GATE-qualified engineers.",
        keyCompetencies: [
          "Advanced algorithms and theoretical computer science",
          "Specialized research seminars and peer-reviewed literature critique",
          "Year-long dissertation research under faculty supervision",
          "Industrial co-ops and joint research publications",
        ],
      },
      {
        id: "doctoral",
        division: "Doctoral Research (Ph.D.)",
        grades: "3 to 5 Years (Full-time / Part-time)",
        ageSpan: "Doctoral Scholars",
        summary:
          "Rigorous independent research contributing novel methodologies in artificial intelligence, hardware security, VLSI, signal processing, and algorithms.",
        keyCompetencies: [
          "Original research contribution published in indexed international journals",
          "Comprehensive doctoral qualifying examination and coursework",
          "Teaching assistantship and undergraduate laboratory mentorship",
          "Sponsored research project execution and patent development",
        ],
      },
    ],
    departments: [
      {
        id: "cse",
        name: "Department of Computer Science & Engineering",
        category: "Software, Systems & Theory",
        overview:
          "Equips students with profound theoretical and practical foundations across algorithms, operating systems, distributed computing, database management, and network security.",
        focusDisciplines: [
          "Design & Analysis of Algorithms",
          "Distributed Systems & Cloud Computing",
          "Information & Network Security",
          "Software Engineering & Object-Oriented Architecture",
        ],
        pedagogy: "Intensive programming labs, open-source project submissions, and algorithmic problem solving.",
      },
      {
        id: "aide",
        name: "Department of Artificial Intelligence & Data Engineering",
        category: "Intelligent Systems & Big Data",
        overview:
          "Addresses modern machine intelligence, statistical learning, neural architectures, deep learning, computer vision, natural language processing, and scalable data pipelines.",
        focusDisciplines: [
          "Machine Learning & Pattern Recognition",
          "Deep Neural Networks & Transformers",
          "Computer Vision & Multimodal AI",
          "Large-Scale Data Engineering & Analytics",
        ],
        pedagogy: "GPU-accelerated laboratory computing, model training pipelines, and dataset engineering.",
      },
      {
        id: "ece",
        name: "Department of Electronics & Communication Engineering",
        category: "Hardware, Telecommunications & IoT",
        overview:
          "Fosters expertise in VLSI chip design, embedded microcontrollers, signal and image processing, wireless telecommunication protocols, and RF circuit engineering.",
        focusDisciplines: [
          "Digital & Analog VLSI Design",
          "Embedded Systems & Internet of Things (IoT)",
          "Digital Signal & Image Processing",
          "Wireless Communication & Antenna Design",
        ],
        pedagogy: "EDA tool simulations (Cadence/Synopsys), FPGA board synthesis, and hardware prototyping.",
      },
    ],
    academicSupport: {
      overline: "Academic Guidance",
      heading: "Comprehensive academic support for every engineering student.",
      description:
        "Technical rigour is backed by structured mentorship programs, peer tutorials, and faculty office hours.",
      programs: [
        {
          title: "Faculty Office Hours & Consultation",
          description: "Dedicated consultation blocks each week for students to clarify course concepts, review problem sets, and discuss research.",
        },
        {
          title: "Peer Coding Mentorship",
          description: "Senior student mentors through Algorithmus coding club assist juniors with competitive programming and technical problem sets.",
        },
        {
          title: "Training & Placement Cell (T&P)",
          description: "Structured industry readiness training, mock technical interviews, resume workshops, and national campus recruitment drives.",
        },
        {
          title: "Competitive Programming Coaching",
          description: "Targeted preparation for ACM-ICPC, Google Summer of Code (GSoC), and international hackathons.",
        },
      ],
    },
    calendarNotice: {
      overline: "Academic Calendar",
      heading: "Semester Structures & Examination Schedules",
      note: "The academic year is organized into two semesters: Autumn (July – December) and Spring (January – May). Official academic calendars, registration dates, and examination schedules are published by the Academic Section.",
    },
  },

  campus: {
    hero: {
      badge: "Ranpur Permanent Campus • 100+ Acres",
      title: "A purpose-built technological campus designed for focus, discovery, and community.",
      description:
        "Located in Ranpur, Kota, the permanent campus brings together state-of-the-art academic complexes, computing research centers, residential hostels, and expansive grounds.",
      disclaimer: "Photographs represent actual campus facilities verified from the IIIT Kota permanent campus.",
    },
    overview: {
      overline: "Campus Architecture",
      heading: "Modern technological infrastructure in the educational hub of Kota.",
      description:
        "Spread across more than 100 acres, the campus is master-planned with energy-efficient architectural blocks, high-speed fiber-optic connectivity, dedicated student living quarters, and open green courtyards.",
      principles: [
        {
          title: "High-Speed Digital Connectivity",
          description: "Campus-wide fiber-optic backbone providing high-speed Wi-Fi and gigabit ethernet to all academic halls, laboratories, and hostel rooms.",
        },
        {
          title: "Energy-Efficient Building Architecture",
          description: "Modern climate-conscious architecture with natural light penetration, thermal insulation, and landscaped open quadrangles.",
        },
        {
          title: "Integrated Living & Learning",
          description: "Close integration of academic pavilions, research laboratories, library resources, and residential living within short walking distances.",
        },
      ],
    },
    facilities: [
      {
        id: "humanities-library",
        name: "Central Academic Complex & Lecture Theatres",
        category: "Instructional Core",
        description:
          "The flagship academic complex featuring air-conditioned stepped lecture theatres, digital podiums, tutorial rooms, faculty cabins, and the Senate Hall.",
        features: [
          "Acoustically treated stepped lecture halls",
          "Interactive digital smartboards and HD projection",
          "Dedicated conference and seminar facilities",
          "Central air conditioning and ergonomic seating",
        ],
        photoStatus: "Official Campus Photography Verified",
      },
      {
        id: "science-pavilion",
        name: "Computing Centers & Specialized Research Labs",
        category: "Research & Computing",
        description:
          "Advanced computing labs equipped with high-performance desktop workstations, GPU clusters for deep learning, and dedicated VLSI testbenches.",
        features: [
          "High-performance workstations with Linux/Windows environments",
          "EDA software suites for microelectronics simulation",
          "FPGA prototyping kits and embedded hardware stations",
          "Secure network segmentation for cybersecurity research",
        ],
        photoStatus: "Official Campus Facility",
      },
      {
        id: "arts-forum",
        name: "Central Automated Library & Information Resource",
        category: "Library & Information Science",
        description:
          "Modern library holding extensive collections of textbooks, international research journals, and online digital database access through e-ShodhSindhu.",
        features: [
          "Automated KOHA library management system",
          "Comprehensive book bank facility for all semesters",
          "Access to IEEE, ACM, Springer, and ScienceDirect journals",
          "Quiet study alcoves and reading halls",
        ],
        photoStatus: "Official Campus Facility",
      },
      {
        id: "athletics-pavilion",
        name: "Sports Complex & Outdoor Grounds",
        category: "Athletics & Recreation",
        description:
          "Expansive sports infrastructure supporting competitive athletic tournaments, hostel matches, and daily physical fitness.",
        features: [
          "Full-size cricket and association football grounds",
          "Floodlit basketball, volleyball, and badminton courts",
          "Table tennis, chess, and carrom recreation rooms in hostels",
          "Fitness conditioning and gymnasium equipment",
        ],
        photoStatus: "Official Campus Facility",
      },
      {
        id: "dining-commons",
        name: "Student Hostels & Dining Facilities",
        category: "Residential Living",
        description:
          "Dedicated on-campus hostel blocks for boys and girls, featuring furnished rooms, high-speed internet, common recreation lounges, and dining messes serving nutritious meals.",
        features: [
          "Furnished single/shared rooms with study desks and storage",
          "High-speed Wi-Fi connectivity and power backup",
          "Hygienic student dining messes providing balanced meals",
          "24/7 security surveillance and resident wardens",
        ],
        photoStatus: "Official Campus Facility",
      },
    ],
    accessibilityAndSafety: {
      overline: "Health, Safety & Campus Security",
      heading: "A safe, secure, and supportive environment for all campus residents.",
      description:
        "IIIT Kota prioritizes student safety with 24/7 security personnel, monitored perimeter access, and an on-campus medical dispensary.",
      policies: [
        {
          title: "Round-the-Clock Campus Security",
          description: "24/7 manned security checkpoints at campus gates, electronic visitor registration, and CCTV surveillance in common areas.",
        },
        {
          title: "On-Campus Medical Dispensary",
          description: "Primary health clinic with resident medical staff offering immediate first-aid, outpatient consultation, and emergency ambulance access.",
        },
        {
          title: "Anti-Ragging & Inclusive Culture",
          description: "Strict zero-tolerance policy against ragging with an active Anti-Ragging Committee and Student Grievance Redressal Cell.",
        },
      ],
    },
    visiting: {
      overline: "Campus Location & Access",
      heading: "Visiting IIIT Kota's Permanent Campus in Ranpur.",
      description:
        "Located in Ranpur, Kota, easily accessible from Kota Junction Railway Station (approx. 18 km) and connected via National Highway 52.",
      hours: "Administrative Office Hours: Monday – Friday, 9:00 AM – 5:30 PM",
      guidelines: [
        "Visitors must register at the main security gate and obtain visitor passes",
        "Official campus visits and academic inquiries can be scheduled through office@iiitkota.ac.in",
        "Frequent public and private transit connects Ranpur with Kota city and the railway terminal",
      ],
    },
  },

  studentLife: {
    hero: {
      badge: "Student Culture & Leadership",
      title: "An energetic campus life shaped by innovation, creativity, and camaraderie.",
      description:
        "Life at IIIT Kota extends far beyond lectures. Students organize national technical hackathons, manage creative societies, compete in sports tournaments, and build lifelong friendships.",
      disclaimer: "Activities are managed by student bodies under the TechKnow Council and Creative Arts & Cultural Society.",
    },
    ethos: {
      overline: "Co-Curricular Philosophy",
      heading: "Developing well-rounded engineers through peer leadership.",
      description:
        "We believe participation in hackathons, dramatic productions, and competitive sports develops the leadership resilience, team synergy, and communication skills essential for engineering leaders.",
      pillars: [
        {
          title: "Student-Led Autonomy",
          description: "Clubs and technical events are ideated, organized, and executed by student committees, fostering genuine management experience.",
        },
        {
          title: "Competitive Spirit & Sportsmanship",
          description: "Students actively participate in national hackathons, inter-IIIT sports meets, and coding tournaments across India.",
        },
        {
          title: "Inclusive Creative Expression",
          description: "Platforms for arts, music, photography, and literature allow every student to discover and cultivate creative passions.",
        },
      ],
    },
    coCurricular: [
      {
        id: "technical-clubs",
        title: "Technical Clubs & Developer Societies",
        category: "Coding & Engineering",
        description:
          "Specialized technical clubs focused on competitive programming, robotics, artificial intelligence, and open-source software.",
        activities: [
          "Algorithmus — The Official Coding Club",
          "ARC — Automated Robotics & Hardware Club",
          "Google Developer Student Club (GDSC) Chapter",
          "Weekly Coding Sprints & Algorithmic Contests",
        ],
      },
      {
        id: "cultural-societies",
        title: "Cultural & Creative Societies",
        category: "Arts & Humanities",
        description:
          "Creative platforms under the Creative Arts and Cultural Society (CACS) supporting visual arts, photography, drama, and debate.",
        activities: [
          "Artive — Fine Arts, Graphic Design & UI/UX",
          "Capture — The Photography & Cinematography Club",
          "Odyssey — Literary, Quizzing & Debating Society",
          "Incognito — Dramatics, Theatre & Stagecraft",
        ],
      },
      {
        id: "sports-athletics",
        title: "Athletics & Inter-College Sports",
        category: "Fitness & Teamwork",
        description:
          "Competitive sporting events fostering team spirit, endurance, and physical health across indoor and outdoor games.",
        activities: [
          "Cricket, Football & Volleyball Tournaments",
          "Inter-IIIT Annual Sports Meet (Twaran)",
          "Table Tennis, Badminton & Chess Championships",
          "Fit India & Campus Yoga Initiatives",
        ],
      },
      {
        id: "social-initiatives",
        title: "Social Welfare & Community Outreach",
        category: "Civic Engagement",
        description:
          "Student-led social awareness campaigns, environmental conservation drives, and educational outreach to local schools.",
        activities: [
          "National Service Scheme (NSS) Outreach",
          "Campus Tree Plantation & Green Drives",
          "Digital Literacy Workshops for Community Youth",
          "Blood Donation & Health Awareness Camps",
        ],
      },
    ],
    traditions: [
      {
        season: "Spring",
        name: "Eigen — Annual Techno-Cultural Festival",
        description:
          "The flagship multi-day fest featuring national coding hackathons, robotics arenas, esports tournaments, cultural competitions, and live pro-shows.",
        status: "Annual Flagship Event",
      },
      {
        season: "Autumn",
        name: "Freshers' Orientation & Induction",
        description:
          "Welcoming the incoming B.Tech cohort with academic briefings, campus orientation tours, club presentations, and cultural icebreakers.",
        status: "Annual Tradition",
      },
      {
        season: "Winter",
        name: "Inter-Hostel Sports & Cultural League",
        description:
          "Intense inter-hostel competitions in cricket, football, volleyball, debate, and music celebrating campus camaraderie.",
        status: "Semester Tournament",
      },
      {
        season: "Monsoon",
        name: "Independence Day & Hindi Pakhwada",
        description:
          "Ceremonial flag hoisting followed by patriotic cultural performances, elocution contests, and literary recitations.",
        status: "National Observance",
      },
    ],
    studentSupport: {
      overline: "Student Welfare",
      heading: "A supportive scaffolding for personal and academic well-being.",
      description:
        "The Dean of Student Welfare (DSW) office, faculty advisors, and counseling cells ensure every student receives guidance whenever needed.",
      services: [
        {
          title: "Faculty Advisor System",
          description: "Every student is assigned a dedicated faculty advisor to monitor academic progression, course registrations, and personal growth.",
        },
        {
          title: "Student Counseling Cell",
          description: "Professional counseling support offering guidance for stress management, emotional wellbeing, and personal challenges.",
        },
        {
          title: "Senior Student Mentorship",
          description: "Senior students guide incoming first-year students to help them seamlessly adjust to hostel living and institute academics.",
        },
      ],
    },
  },

  admissions: {
    hero: {
      badge: "National Admissions • JEE (Main) & GATE",
      title: "Begin your engineering journey at IIIT Kota.",
      description:
        "Undergraduate admissions to B.Tech programs are conducted through centralized national counseling (JoSAA / CSAB) based on JEE (Main) ranks. Postgraduate admissions proceed via GATE through CCMT.",
      disclaimer: "Seat matrices, eligibility rules, and reservation policies strictly follow Ministry of Education, Govt. of India directives.",
    },
    philosophy: {
      overline: "Admission Process",
      heading: "Merit-based, centralized, and transparent national admissions.",
      description:
        "Admissions to IIIT Kota reflect the highest standards of transparency and national competition, welcoming the brightest engineering talent from across India through JEE (Main).",
    },
    journey: [
      {
        step: "01",
        stage: "Entrance Exam",
        title: "Appear for JEE (Main)",
        description: "Register and appear for the Joint Entrance Examination (Main) conducted by the National Testing Agency (NTA).",
        checklist: [
          "Complete JEE (Main) registration on the official NTA portal",
          "Appear for Paper 1 (B.E. / B.Tech)",
          "Obtain All India Rank (AIR) in CRL and Category",
        ],
        timing: "Session 1 (Jan) & Session 2 (Apr) annually",
      },
      {
        step: "02",
        stage: "National Counseling",
        title: "JoSAA / CSAB Online Choice Filling",
        description: "Participate in centralized counseling by registering on the Joint Seat Allocation Authority (JoSAA) portal.",
        checklist: [
          "Register on the JoSAA portal using JEE (Main) application number",
          "Fill preferred choices: IIIT Kota (CSE, AI&DE, ECE)",
          "Lock choices prior to the national deadline",
        ],
        timing: "June – July annually",
      },
      {
        step: "03",
        stage: "Seat Allocation",
        title: "Seat Acceptance & Fee Payment",
        description: "Upon seat allotment, complete online document upload, seat acceptance fee payment, and choose Freeze/Float.",
        checklist: [
          "Check multi-round seat allotment results on JoSAA portal",
          "Upload verified class 10 & 12 marksheets and category certificates",
          "Pay the mandatory Seat Acceptance Fee (SAF)",
        ],
        timing: "Conducted over multiple JoSAA & CSAB rounds",
      },
      {
        step: "04",
        stage: "Enrollment",
        title: "Physical Reporting at Ranpur Campus",
        description: "Report to IIIT Kota permanent campus in Ranpur, complete in-person verification, hostel allocation, and attend orientation.",
        checklist: [
          "Carry original documents, provisional seat allotment letter, and photographs",
          "Complete institute fee balance payment and biometric registration",
          "Obtain hostel room keys, institute email ID, and attend academic orientation",
        ],
        timing: "August semester commencement",
      },
    ],
    documentation: {
      overline: "Verification Documents",
      heading: "Mandatory documents for JoSAA / CSAB reporting.",
      description:
        "Candidates must present original certificates along with self-attested photocopies during physical reporting at IIIT Kota.",
      categories: [
        {
          category: "Academic Credentials",
          items: [
            "Class 10 Certificate / Birth Certificate (as proof of date of birth)",
            "Class 12 (or equivalent) Examination Marksheet and Passing Certificate",
            "JEE (Main) Scorecard and Admit Card",
            "JoSAA / CSAB Provisional Seat Allotment Letter",
          ],
        },
        {
          category: "Category & Medical Certificates",
          items: [
            "GEN-EWS / OBC-NCL / SC / ST Certificate (issued on or after April 1 of the admission year)",
            "PwD Certificate issued by competent authority (if applicable)",
            "Medical Fitness Certificate in the prescribed JoSAA format",
            "State of Eligibility Certificate",
          ],
        },
        {
          category: "Identification & Administrative",
          items: [
            "Aadhaar Card or Government Photo Identity Card",
            "Passport-size colored photographs (6-8 copies)",
            "Transfer Certificate / Migration Certificate from previous institution",
            "Anti-Ragging Affidavits signed by student and parent",
          ],
        },
      ],
      statusNotice:
        "All category certificates must strictly conform to the formats prescribed by the Ministry of Education and JoSAA guidelines.",
    },
    datesAndFeesNotice: {
      overline: "Important Notices",
      heading: "Official counseling dates and institute fee structures.",
      datesNotice:
        "Detailed schedules for JoSAA rounds, CSAB special rounds, and reporting dates are published directly on https://josaa.nic.in and https://iiitkota.ac.in.",
      feeNotice:
        "Semester tuition fees, hostel seat rent, mess charges, and refundable security deposits are fixed by the Board of Governors of IIIT Kota. Detailed fee breakdowns are updated annually on the institute admissions portal.",
    },
    faqs: [
      {
        question: "How do I secure admission to B.Tech programs at IIIT Kota?",
        answer:
          "Undergraduate admissions are based solely on the All India Rank (AIR) in JEE (Main) Paper 1 through the centralized JoSAA and CSAB counseling process. There is no direct management quota.",
      },
      {
        question: "What B.Tech branches are currently offered at IIIT Kota?",
        answer:
          "IIIT Kota offers B.Tech degrees in Computer Science & Engineering (CSE), Artificial Intelligence & Data Engineering (AI&DE), and Electronics & Communication Engineering (ECE).",
      },
      {
        question: "Is IIIT Kota operating from its permanent campus?",
        answer:
          "Yes, IIIT Kota is fully operational from its permanent 100+ acre campus in Ranpur, Kota, featuring modern academic pavilions, computing laboratories, and residential hostels.",
      },
      {
        question: "Are hostel accommodations guaranteed for all admitted students?",
        answer:
          "Yes, on-campus residential hostel facilities with modern amenities, Wi-Fi, and mess dining are provided for both male and female students at the Ranpur campus.",
      },
    ],
  },

  contactPage: {
    hero: {
      badge: "Campus Directory & Inquiries",
      title: "Connect with the Indian Institute of Information Technology, Kota.",
      description:
        "Reach out to administrative sections, academic departments, or the admissions cell at our permanent campus in Ranpur, Kota.",
    },
    departments: [
      {
        department: "Office of the Director & Registrar",
        purpose: "General institutional affairs, statutory matters, and official correspondence.",
        email: "office@iiitkota.ac.in",
        phone: "+91-0744-2667000",
        hours: "Monday – Friday: 9:00 AM – 5:30 PM IST",
      },
      {
        department: "Academic & Admissions Section",
        purpose: "Course registration, grade records, JoSAA/CSAB counseling, and transcripts.",
        email: "admissions@iiitkota.ac.in",
        phone: "+91-0744-2667010",
        hours: "Monday – Friday: 9:00 AM – 5:30 PM IST",
      },
      {
        department: "Training & Placement Cell",
        purpose: "Corporate recruitment drives, internships, and industry partnerships.",
        email: "placements@iiitkota.ac.in",
        phone: "+91-0744-2667020",
        hours: "Monday – Friday: 9:00 AM – 5:30 PM IST",
      },
    ],
    visitInfo: {
      overline: "Campus Location",
      heading: "Visiting IIIT Kota Permanent Campus",
      description:
        "The permanent campus is situated in Ranpur, Kota, approximately 18 km from Kota Junction Railway Station.",
      address: "Indian Institute of Information Technology Kota, Ranpur, Kota, Rajasthan – 325003, India",
      parkingTransit:
        "Visitor parking is available inside the main security gate. Taxis, auto-rickshaws, and public buses operate regularly between Kota city, the railway station, and the Ranpur industrial/institutional area.",
      toursNotice:
        "Prospective students and visitors should register at the main security gate with a valid government photo identity card upon arrival.",
    },
    inquiryNotice: {
      overline: "Contact Channels",
      heading: "Direct Communication & Inquiries",
      description:
        "For all admissions, academic, or administrative inquiries, please communicate directly via the official email addresses and phone numbers listed above.",
      status: "Official Communication Channels Active",
      alternativeInstructions:
        "General inquiries can be emailed to office@iiitkota.ac.in or directed to the reception desk at +91-0744-2667000 during working hours.",
    },
  },
};
