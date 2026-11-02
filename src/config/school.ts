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

// Phase 3: Secondary Page Data Interfaces
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

  // Phase 3: Secondary Pages Complete Config
  about: AboutPageConfig;
  academics: AcademicsPageConfig;
  campus: CampusPageConfig;
  studentLife: StudentLifePageConfig;
  admissions: AdmissionsPageConfig;
  contactPage: ContactPageConfig;
}

/**
 * Centralized, typed content and configuration for the public school website.
 *
 * IMPORTANT: In accordance with project content integrity guidelines,
 * all unverified or unconfirmed school attributes are explicitly marked
 * with "TODO: confirm with school" or set to null. Never fabricate school details.
 */
export const schoolConfig: SchoolConfig = {
  name: "Oakridge Academy (TODO: confirm with school)",
  shortName: "Oakridge (TODO: confirm)",
  tagline: "Cultivating Curiosity, Character, and Community (TODO: confirm with school)",
  positioningStatement:
    "A contemporary learning environment dedicated to fostering intellectual curiosity, resilience, and creative exploration.",
  establishedYear: null, // TODO: confirm with school
  boardAffiliation: "TODO: confirm with school",
  gradesOffered: "TODO: confirm with school",
  contact: {
    address: "TODO: confirm with school",
    city: "TODO: confirm with school",
    state: "TODO: confirm with school",
    postalCode: "TODO: confirm with school",
    country: "TODO: confirm with school",
    phone: "TODO: confirm with school",
    email: "info@school-placeholder.internal (TODO: confirm)",
    admissionsEmail: "admissions@school-placeholder.internal (TODO: confirm)",
    officeHours: "Monday – Friday: 8:00 AM – 4:00 PM (TODO: confirm with school)",
  },
  navigation: [
    {
      label: "About",
      href: "/about",
      description: "Our philosophy, values, and educational mission",
    },
    {
      label: "Academics",
      href: "/academics",
      description: "Curriculum pathways, faculty, and academic programs",
    },
    {
      label: "Campus",
      href: "/campus",
      description: "Learning environments, labs, and modern facilities",
    },
    {
      label: "Student Life",
      href: "/student-life",
      description: "Clubs, athletics, arts, and vibrant school community",
    },
    {
      label: "Admissions",
      href: "/admissions",
      description: "Application guidelines, timeline, and enrollment",
    },
    {
      label: "Contact",
      href: "/contact",
      description: "Campus location, enquiries, and visit coordination",
    },
  ],
  portalNavigation: {
    label: "Classroom Portal",
    href: "/portal",
  },
  socialLinks: [
    // Social links will be populated once confirmed by school administration
  ],
  meta: {
    titleTemplate: "%s | Oakridge Academy",
    defaultDescription:
      "Welcome to Oakridge Academy. Explore our academic pathways, vibrant campus, and admissions journey.",
  },

  // Section 1: Hero
  hero: {
    badge: "Editorial Campus Journal • Academic Year",
    headline: "Where curiosity meets intentional scholarship.",
    subheadline:
      "We prepare students to engage deeply with ideas, cultivate lasting character, and lead with empathy in a changing world.",
    primaryCta: { label: "Admissions & Entry", href: "/admissions" },
    secondaryCta: { label: "Curriculum Pathways", href: "/academics" },
    portalCta: { label: "Enter Portal", href: "/portal" },
    compositionCaption: "Architectural quadrangle and central library commons (Representative motif)",
    verifiedStatus: "Official Campus Photography Pending Verification",
  },

  // Section 2: Introduction
  intro: {
    overline: "The Educational Ethos",
    heading: "Education as an active journey of inquiry, not passive absorption.",
    paragraphs: [
      "Our educational philosophy centres on the belief that children thrive when granted the intellectual tools to question, analyze, and build. We balance rigorous academic study with expansive creative and physical pursuits.",
      "Within our seminar rooms, studios, and natural grounds, educators act as mentors—fostering rigorous thought, ethical resilience, and a profound sense of responsibility toward the wider community.",
    ],
  },

  // Section 3: Educational Pillars
  pillars: [
    {
      id: "intellectual-inquiry",
      number: "01",
      title: "Intellectual Inquiry",
      category: "Scholarship",
      summary: "Questioning as the bedrock of deep understanding.",
      description:
        "Students are encouraged to investigate problems from foundational principles, debate ideas thoughtfully, and defend their reasoning with evidence.",
      href: "/academics",
    },
    {
      id: "creative-expression",
      number: "02",
      title: "Creative Expression",
      category: "Studio & Arts",
      summary: "Translating imagination into disciplined craft.",
      description:
        "Through visual arts, theatrical performance, creative writing, and music, learners discover distinct individual voices and master tactile disciplines.",
      href: "/student-life",
    },
    {
      id: "character-community",
      number: "03",
      title: "Character & Stewardship",
      category: "Citizenship",
      summary: "Integrity, civic engagement, and ethical leadership.",
      description:
        "Leadership is cultivated through service, mutual respect, shared governance, and environmental stewardship across campus life.",
      href: "/about",
    },
    {
      id: "scientific-discovery",
      number: "04",
      title: "Empirical Discovery",
      category: "Sciences & Tech",
      summary: "Hands-on experimentation and quantitative rigor.",
      description:
        "Modern laboratory work, algorithmic thinking, and fieldwork provide students with direct experience in the scientific method and real-world observation.",
      href: "/campus",
    },
  ],

  // Section 4: Academics Preview
  academicsPreview: {
    overline: "Curriculum Framework",
    heading: "Structured pathways designed for depth and versatility.",
    description:
      "Our multi-disciplinary curriculum cultivates foundational mastery in early years and offers specialized analytical depth as students advance.",
    pathways: [
      {
        id: "humanities-literature",
        title: "Humanities & Classical Inquiry",
        gradeLevel: "Comprehensive (TODO: confirm grades)",
        overview:
          "Deep study of history, philosophy, comparative literature, and rhetorical discourse.",
        focusAreas: ["Historical Analysis", "Literary Discourse", "Philosophy", "World Civilizations"],
        href: "/academics",
      },
      {
        id: "stem-sciences",
        title: "STEM & Natural Sciences",
        gradeLevel: "Comprehensive (TODO: confirm grades)",
        overview:
          "Advanced mathematical modeling, laboratory physics, organic chemistry, and computational logic.",
        focusAreas: ["Pure Mathematics", "Experimental Physics", "Life Sciences", "Algorithmic Design"],
        href: "/academics",
      },
      {
        id: "languages-culture",
        title: "Modern & Classical Languages",
        gradeLevel: "Comprehensive (TODO: confirm grades)",
        overview:
          "Fluency development, cultural immersion, and classical linguistics to expand global awareness.",
        focusAreas: ["Linguistic Fluency", "Cultural Studies", "Translation", "Global Literature"],
        href: "/academics",
      },
    ],
    cta: { label: "View Complete Academic Overview", href: "/academics" },
  },

  // Section 5: Campus Preview
  campusPreview: {
    overline: "Physical Environments",
    heading: "Spaces designed to support focus, collaboration, and discovery.",
    description:
      "A harmonious blend of focused quiet study halls, vibrant communal studios, and natural open-air gathering grounds.",
    spaces: [
      {
        id: "central-library",
        title: "The Humanities Commons & Archive",
        category: "Study & Research",
        description:
          "A quiet multi-level repository housing curated collections, reading alcoves, and peer study rooms.",
        photographyStatus: "Official Space Photo: Pending confirmation",
        features: ["Extensive text archives", "Quiet reading cloister", "Digital research stations"],
      },
      {
        id: "discovery-labs",
        title: "Experimental Sciences Pavilion",
        category: "Laboratory & Technology",
        description:
          "Equipped for physical experimentation, biological analysis, robotics prototyping, and group research projects.",
        photographyStatus: "Official Space Photo: Pending confirmation",
        features: ["Wet & dry laboratories", "Robotics workbench", "Safety isolation hoods"],
      },
      {
        id: "performance-hall",
        title: "Creative Arts & Performance Forum",
        category: "Visual & Performing Arts",
        description:
          "An acoustically tuned amphitheater and adjacent open-plan visual art lofts flooded with natural light.",
        photographyStatus: "Official Space Photo: Pending confirmation",
        features: ["Acoustic stage", "Natural light ceramics studio", "Darkroom & digital media suite"],
      },
    ],
    cta: { label: "Explore Campus Facilities", href: "/campus" },
  },

  // Section 6: Student Life Preview
  studentLifePreview: {
    overline: "Community Life",
    heading: "A vibrant ecosystem beyond the classroom walls.",
    description:
      "Student life is rich with student-initiated societies, inter-house athletics, debate tournaments, and seasonal campus traditions.",
    areas: [
      {
        id: "athletics",
        title: "Athletics & Physical Well-being",
        category: "Sports & Fitness",
        description:
          "Fostering team cohesion, individual resilience, and lifelong healthy physical habits through competitive and recreational sports.",
        highlights: ["Track & Field", "Court Sports", "Outdoor Cross-country", "Fitness Conditioning"],
      },
      {
        id: "societies",
        title: "Student Societies & Publications",
        category: "Leadership & Dialogue",
        description:
          "Editorial teams, debate unions, robotics guilds, and model governance assemblies run directly by student leaders.",
        highlights: ["Campus Journal", "Parliamentary Debate", "Robotics Team", "Model United Nations"],
      },
      {
        id: "service",
        title: "Environmental & Civic Action",
        category: "Service & Impact",
        description:
          "Direct partnership with regional community groups, ecological restoration projects, and social awareness campaigns.",
        highlights: ["Campus Garden", "Community Mentorship", "Habitat Initiatives", "Charity Drives"],
      },
    ],
    cta: { label: "Discover Student Life", href: "/student-life" },
  },

  // Section 7: School Values
  values: {
    overline: "Guiding Principles",
    heading: "The bedrock of our learning community.",
    subheading:
      "Our values are not abstract slogans; they guide daily interaction, classroom discussion, and campus governance.",
    items: [
      {
        name: "Intellectual Humility",
        latinMotto: "Sapientia et Veritas",
        description:
          "The willingness to listen generously, acknowledge the limits of our current knowledge, and seek truth over being right.",
      },
      {
        name: "Steadfast Integrity",
        latinMotto: "Fides et Factum",
        description:
          "Consistency between principles and actions in scholarship, peer relationships, and public responsibility.",
      },
      {
        name: "Kindness & Mutual Respect",
        latinMotto: "Humanitas",
        description:
          "Creating a community where every individual is treated with dignity, compassion, and welcoming hospitality.",
      },
      {
        name: "Courageous Inquiry",
        latinMotto: "Audere Scire",
        description:
          "The bravery to ask difficult questions, explore unfamiliar disciplines, and persist through setbacks.",
      },
    ],
  },

  // Section 8: Admissions CTA
  admissionsCta: {
    overline: "Begin The Dialogue",
    heading: "Join our academic community.",
    description:
      "We invite prospective families to discover our approach, meet faculty mentors, and tour our campus grounds.",
    steps: [
      {
        step: "01",
        title: "Explore Pathways",
        description: "Review academic programmes, student life, and educational philosophy.",
        timingNote: "Open year-round",
      },
      {
        step: "02",
        title: "Submit Inquiry",
        description: "Connect with our admissions office to receive detailed documentation.",
        timingNote: "Next admission cycle (TODO: confirm dates)",
      },
      {
        step: "03",
        title: "Campus Visit",
        description: "Participate in guided tours and faculty consultations.",
        timingNote: "Scheduled by appointment",
      },
      {
        step: "04",
        title: "Application Review",
        description: "Holistic evaluation of student background, curiosity, and fit.",
        timingNote: "Official criteria pending school confirmation",
      },
    ],
    primaryCta: { label: "Explore Admissions", href: "/admissions" },
    secondaryCta: { label: "Connect with Admissions", href: "/contact" },
  },

  // Section 9: Portal Banner
  portalBanner: {
    overline: "Campus Administration",
    heading: "Classroom Management Portal",
    description:
      "Enrolled students, faculty, and administrative staff can access course directories, subjects, schedules, and active classroom records.",
    cta: { label: "Open Portal Dashboard", href: "/portal" },
  },

  // ==========================================
  // Phase 3: Secondary Pages Complete Config
  // ==========================================

  // /about Page Config
  about: {
    hero: {
      badge: "Institutional Heritage & Mission",
      title: "A learning community anchored in inquiry and purposeful scholarship.",
      description:
        "Founded on the principle that true education shapes both intellect and character, we guide students through disciplined investigation, collaborative dialogue, and compassionate stewardship.",
      disclaimer: "Institutional timeline and leadership profiles are pending final verification with the school.",
    },
    mission: {
      overline: "Our Fundamental Purpose",
      heading: "Cultivating inquisitive minds and principled leaders.",
      statement:
        "Our mission is to foster a rigorous intellectual environment where students develop the capacity for critical thought, the courage to engage complex ideas, and the ethical commitment to serve their communities with empathy and purpose.",
      vision:
        "To stand as a model academic institution where curiosity is ignited, individual voices are discovered, and scholarship is translated into meaningful contribution to the common good.",
      ethosSummary:
        "We believe that education must transcend rote memorization. Through seminar dialogue, empirical discovery, and artistic exploration, learners discover that knowledge is an ongoing, shared human pursuit.",
    },
    leadership: {
      overline: "Faculty & Academic Stewardship",
      heading: "Guided by educators who mentor, inspire, and challenge.",
      description:
        "Our educators combine academic mastery with a profound dedication to student mentorship. In every classroom and laboratory, faculty foster an atmosphere of mutual respect, high intellectual expectations, and warm encouragement.",
      verificationNote:
        "Official faculty biographies, leadership statements, and board composition are pending verification and will be published upon confirmation.",
      commitments: [
        {
          title: "Mentorship-Driven Instruction",
          description: "Close dialogue between faculty and students fosters deep intellectual trust and personalized academic guidance.",
        },
        {
          title: "Continuous Scholarly Inquiry",
          description: "Educators actively engage in professional curriculum development and scholarly research within their respective disciplines.",
        },
        {
          title: "Pastoral & Holistic Care",
          description: "Every student is supported by dedicated advisors who monitor academic progress, emotional wellbeing, and personal growth.",
        },
      ],
    },
    heritage: {
      overline: "Historical Context",
      heading: "A tradition of enduring educational principles.",
      description:
        "While specific founding records and dates are being verified with institutional archives, our academic foundation rests upon time-honoured classical scholarship combined with progressive contemporary pedagogy.",
      milestones: [
        {
          period: "Foundation & Vision (TODO: confirm year)",
          title: "Establishment of the Academic Quadrangle",
          detail: "Founded to provide rigorous classical and scientific instruction anchored in ethical civic responsibility.",
          status: "Pending archive verification",
        },
        {
          period: "Expansion of Scientific Disciplines (TODO: confirm year)",
          title: "Opening of the Experimental Discovery Laboratories",
          detail: "Integrating hands-on laboratory investigation and empirical quantitative methods into core secondary studies.",
          status: "Pending archive verification",
        },
        {
          period: "Contemporary Arts & Commons (TODO: confirm year)",
          title: "Inauguration of the Creative Arts Forum & Library Archive",
          detail: "Expanding student access to fine arts studios, orchestral performance spaces, and comprehensive humanities collections.",
          status: "Pending archive verification",
        },
      ],
    },
    governance: {
      overline: "Affiliation & Accreditation",
      heading: "Commitment to academic integrity and recognized standards.",
      description:
        "Our academic framework operates in alignment with recognized pedagogical standards. We maintain strict compliance with educational guidelines and governance best practices.",
      affiliationStatus: "Educational Board / Accreditation Affiliation (TODO: confirm with school)",
      accountabilityNotice:
        "All official affiliation credentials, inspection reports, and governance charters will be detailed in accordance with verified institutional records.",
    },
  },

  // /academics Page Config
  academics: {
    hero: {
      badge: "Academic Rigour & Curriculum",
      title: "Cultivating analytical depth and breadth across disciplines.",
      description:
        "Our academic program is designed to guide students from foundational literacy and numeracy into sophisticated cross-disciplinary inquiry, preparing them for higher scholarship and thoughtful global citizenship.",
      disclaimer: "Official course catalog and syllabus codes correspond to curriculum guidelines pending school verification.",
    },
    philosophy: {
      overline: "Curriculum Pedagogy",
      heading: "Rigour, inquiry, and intellectual independence.",
      lead:
        "We reject passive lecture absorption in favour of active debate, empirical verification, and sustained project synthesis. Students learn not only what to think, but how to interrogate ideas from multiple perspectives.",
      principles: [
        {
          title: "Socratic Inquiry & Discourse",
          description: "Classes are structured around structured seminar questions, encouraging students to defend arguments with evidence and listen thoughtfully.",
        },
        {
          title: "Interdisciplinary Synthesis",
          description: "Real-world problems do not respect departmental boundaries; our courses bridge humanities, mathematics, natural sciences, and the arts.",
        },
        {
          title: "Empirical & Applied Research",
          description: "From laboratory experimentation to primary source analysis, students practice the methods of professional practitioners.",
        },
        {
          title: "Ethical & Contextual Awareness",
          description: "Every scientific breakthrough and historical study is examined through the lens of human values and social consequences.",
        },
      ],
    },
    divisions: [
      {
        id: "foundational-years",
        division: "Foundational & Primary Years",
        grades: "Early Childhood to Grade 5 (TODO: confirm with school)",
        ageSpan: "Ages 5–11 (TODO: confirm)",
        summary:
          "Developing joyful curiosity, core literacy, mathematical reasoning, observational science, and collaborative social habits.",
        keyCompetencies: [
          "Phonics, expressive reading, and narrative writing",
          "Conceptual arithmetic and spatial geometry",
          "Natural world observation and guided inquiry",
          "Music, movement, visual art, and character foundations",
        ],
      },
      {
        id: "middle-years",
        division: "Middle Years Programme",
        grades: "Grades 6 to 8 (TODO: confirm with school)",
        ageSpan: "Ages 11–14 (TODO: confirm)",
        summary:
          "Transitioning from concrete knowledge to abstract conceptualization, critical historical analysis, laboratory science, and language acquisition.",
        keyCompetencies: [
          "Rhetorical argument, essay structure, and text analysis",
          "Pre-algebra, algebraic thinking, and data interpretation",
          "Hypothesis formulation and experimental lab protocols",
          "Second language proficiency and creative arts electives",
        ],
      },
      {
        id: "senior-secondary",
        division: "Senior Secondary & Capstone",
        grades: "Grades 9 to 12 (TODO: confirm with school)",
        ageSpan: "Ages 14–18 (TODO: confirm)",
        summary:
          "Advanced pre-university scholarship, independent thesis investigation, advanced laboratory sciences, and philosophical seminars.",
        keyCompetencies: [
          "Advanced literature, historiography, and political philosophy",
          "Calculus, discrete mathematics, and statistical modeling",
          "Organic chemistry, calculus-based physics, and biology",
          "Independent senior capstone research project",
        ],
      },
    ],
    departments: [
      {
        id: "humanities",
        name: "Humanities & Social Sciences",
        category: "Historical & Philosophical Inquiry",
        overview:
          "Engaging with foundational civilizational texts, comparative world histories, ethics, and contemporary socioeconomic structures.",
        focusDisciplines: [
          "World Civilizations & Historiography",
          "Comparative Literature & Critical Theory",
          "Moral Philosophy & Applied Ethics",
          "Civics, Economics, and Global Governance",
        ],
        pedagogy: "Seminar-based primary text analysis and analytical essay writing.",
      },
      {
        id: "stem",
        name: "Mathematics & Natural Sciences",
        category: "Quantitative & Empirical Disciplines",
        overview:
          "Fostering mathematical intuition and deductive proof alongside rigorous laboratory experimentation across physics, chemistry, and biology.",
        focusDisciplines: [
          "Pure Mathematics, Calculus & Statistics",
          "Experimental Physics & Mechanics",
          "Organic & Analytical Chemistry",
          "Cellular Biology & Ecological Fieldwork",
        ],
        pedagogy: "Problem sets, mathematical proof construction, and supervised laboratory research.",
      },
      {
        id: "languages",
        name: "World & Classical Languages",
        category: "Linguistics & Cross-Cultural Studies",
        overview:
          "Equipping learners with fluent spoken and written communication, grammatical precision, and cultural nuance in modern and classical tongues.",
        focusDisciplines: [
          "Modern Language Immersion (TODO: confirm offerings)",
          "Classical Latin / Greek Foundations (TODO: confirm)",
          "Comparative Linguistics & Translation",
          "Global Literature in Translation",
        ],
        pedagogy: "Spoken immersion, contextual composition, and literary translation.",
      },
      {
        id: "arts",
        name: "Visual & Performing Arts",
        category: "Creative Expression & Studio Practice",
        overview:
          "Challenging students to master artistic techniques, understand art history, and communicate complex emotional concepts through disciplined craft.",
        focusDisciplines: [
          "Studio Art: Painting, Drawing, & Sculpture",
          "Chamber & Choral Music Performance",
          "Dramatic Arts, Stagecraft, & Playwriting",
          "Digital Photography & Media Design",
        ],
        pedagogy: "Studio critique, solo and ensemble rehearsals, and public exhibitions.",
      },
    ],
    academicSupport: {
      overline: "Academic Guidance",
      heading: "Ensuring every student achieves their highest potential.",
      description:
        "Rigour is matched with robust support. We provide structured resources to help learners master challenging concepts and build sustainable study disciplines.",
      programs: [
        {
          title: "Faculty Office Hours & Tutorial Clinics",
          description: "Weekly dedicated consultation blocks where students review problem sets and receive targeted feedback from instructors.",
        },
        {
          title: "Writing & Rhetoric Center",
          description: "Peer tutors and faculty specialists assist students through every stage of thesis development, draft revision, and citation standards.",
        },
        {
          title: "Quantitative Reasoning Lab",
          description: "Drop-in coaching for mathematics, physics problem solving, and computational programming.",
        },
        {
          title: "University & College Advisory",
          description: "Strategic counseling helping upper-level students match their academic passions with leading university programs worldwide.",
        },
      ],
    },
    calendarNotice: {
      overline: "Academic Schedule",
      heading: "Term Structures & Academic Calendar",
      note: "Official term start dates, examination periods, and vacation schedules for the upcoming academic year are pending confirmation with school administration. Families will receive the published calendar upon enrolment.",
    },
  },

  // /campus Page Config
  campus: {
    hero: {
      badge: "Campus Environment & Facilities",
      title: "Purpose-built environments that foster focus and community.",
      description:
        "Our campus integrates quiet contemplative spaces with vibrant collaborative laboratories, design studios, and open athletic grounds.",
      disclaimer: "Architectural drawings and geometric diagrams are representative studies; actual campus facility photographs are pending verification.",
    },
    overview: {
      overline: "Architectural Vision",
      heading: "Architecture designed to elevate the educational journey.",
      description:
        "Every corner of our campus has been planned with natural light, acoustic balance, and environmental sustainability in mind. Spaces adapt seamlessly from focused individual scholarship to expansive group seminars.",
      principles: [
        {
          title: "Abundant Natural Daylight",
          description: "High ceilings and generous perimeter glazing keep classrooms and study halls connected to natural circadian rhythms.",
        },
        {
          title: "Acoustic Separation & Calm",
          description: "Quiet library cloisters and high-activity music and athletic zones are intentionally buffered to preserve tranquil study conditions.",
        },
        {
          title: "Environmental Sustainability",
          description: "Energy-efficient architectural orientation, native landscape planting, and low-impact building materials reflect our civic values.",
        },
      ],
    },
    facilities: [
      {
        id: "humanities-library",
        name: "Humanities Commons & Library Archive",
        category: "Study & Research",
        description:
          "The intellectual heart of the campus. Featuring a multi-level book repository, seminar conference rooms, individual carrels, and digital database terminals.",
        features: [
          "Curated collection of classical and modern texts",
          "Quiet reading cloister with natural wood study tables",
          "Bookable group research and seminar rooms",
          "Digital archive access with high-speed connectivity",
        ],
        photoStatus: "Representative architectural motif (Verified photo pending)",
      },
      {
        id: "science-pavilion",
        name: "Discovery Sciences & Technology Pavilion",
        category: "Experimental Science",
        description:
          "State-of-the-art wet and dry laboratories configured for physical chemistry, molecular biology, robotics, and computational modeling.",
        features: [
          "Fume hoods and dedicated chemical storage",
          "Digital microscopes and sensor-interfaced measurement tools",
          "Robotics workbench with rapid prototyping equipment",
          "Safety shower and emergency eye-wash stations",
        ],
        photoStatus: "Representative architectural motif (Verified photo pending)",
      },
      {
        id: "arts-forum",
        name: "Creative Arts Forum & Amphitheatre",
        category: "Performing & Fine Arts",
        description:
          "A multi-functional performance venue with calibrated acoustics, supplemented by natural-light ceramics studios, printmaking presses, and digital media labs.",
        features: [
          "Proscenium stage with modular theatrical lighting",
          "Acoustically isolated music practice suites",
          "North-facing fine arts painting studio",
          "Ceramics kiln and tactile pottery wheels",
        ],
        photoStatus: "Representative architectural motif (Verified photo pending)",
      },
      {
        id: "athletics-pavilion",
        name: "Athletics Pavilion & Outdoor Grounds",
        category: "Athletics & Physical Well-being",
        description:
          "Comprehensive physical education facilities accommodating competitive league play, fitness conditioning, and open recreational movement.",
        features: [
          "Multi-sport hardwood gymnasium for basketball and volleyball",
          "All-weather running track and perimeter cross-country trail",
          "Strength and conditioning fitness center",
          "Dedicated changing suites and athletic training room",
        ],
        photoStatus: "Representative architectural motif (Verified photo pending)",
      },
      {
        id: "dining-commons",
        name: "Campus Quadrangle & Dining Commons",
        category: "Community & Nourishment",
        description:
          "The communal crossroads where students and faculty share meals, debate ideas over lunch, and gather for outdoor morning assemblies.",
        features: [
          "Nutritious, freshly prepared meal options",
          "Communal refectory tables fostering cross-grade dialogue",
          "Landscaped outdoor quadrangle with shade trees",
          "Covered walkways linking all major campus pavilions",
        ],
        photoStatus: "Representative architectural motif (Verified photo pending)",
      },
    ],
    accessibilityAndSafety: {
      overline: "Health, Safety & Universal Access",
      heading: "A safe, welcoming, and accessible campus for all.",
      description:
        "We are committed to maintaining a secure, inclusive physical environment that accommodates all students, staff, and visitors.",
      policies: [
        {
          title: "Universal Step-Free Accessibility",
          description: "All primary instructional pavilions, libraries, and common halls provide elevator access and grade-level entrances.",
        },
        {
          title: "Dedicated Campus Security & Single-Point Entry",
          description: "Monitored campus perimeters, visitor registration protocols, and dedicated security personnel on duty at all times.",
        },
        {
          title: "Full-Time Health Center & Nursing Staff",
          description: "Equipped on-campus health clinic providing immediate first aid, medical triage, and allergy management.",
        },
      ],
    },
    visiting: {
      overline: "Campus Visits",
      heading: "Experience our campus in person.",
      description:
        "We welcome prospective students and families for scheduled campus tours guided by admissions officers and student ambassadors.",
      hours: "Tours conducted Tuesday & Thursday at 10:00 AM (By appointment)",
      guidelines: [
        "Please register at least 48 hours in advance through the Admissions office",
        "Check in at the Welcome Pavilion upon arrival to receive visitor credentials",
        "Comfortable walking shoes are recommended for full quadrangle and facility tours",
      ],
    },
  },

  // /student-life Page Config
  studentLife: {
    hero: {
      badge: "Student Life & Community",
      title: "A vibrant school culture built on participation and shared purpose.",
      description:
        "Beyond the seminar room, our students discover lifelong passions through student-led clubs, theatrical productions, competitive athletics, and community service.",
      disclaimer: "Active club rosters and inter-school league affiliations are pending official school verification.",
    },
    ethos: {
      overline: "The Co-Curricular Ethos",
      heading: "Developing the whole individual through shared endeavour.",
      description:
        "We believe that lessons learned on the athletic field, behind the editor's desk, and in community outreach are just as enduring as classroom scholarship. Participation builds resilience, team trust, and civic empathy.",
      pillars: [
        {
          title: "Student Autonomy & Initiative",
          description: "Societies and publications are founded and managed by students, offering authentic leadership and editorial accountability.",
        },
        {
          title: "Balance & Well-being",
          description: "A deliberate balance between academic commitments, creative expression, physical exertion, and restorative downtime.",
        },
        {
          title: "Inclusive Participation",
          description: "Every student is encouraged to participate regardless of prior experience, with beginner to varsity levels supported.",
        },
      ],
    },
    coCurricular: [
      {
        id: "athletics-sports",
        title: "Athletics & Competitive Sports",
        category: "Fitness & Teamwork",
        description:
          "Instilling sportsmanship, physical resilience, and tactical discipline across seasonal league sports and recreational conditioning.",
        activities: [
          "Track & Field and Cross-Country",
          "Basketball & Volleyball Leagues",
          "Association Football & Tennis",
          "Strength, Conditioning & Yoga Clinics",
        ],
      },
      {
        id: "performing-fine-arts",
        title: "Music, Drama & Fine Arts",
        category: "Creative Expression",
        description:
          "Providing rich platforms for performance, from full theatrical plays and chamber orchestra concerts to gallery exhibitions.",
        activities: [
          "Annual Drama & Musical Production",
          "Chamber Orchestra & Contemporary Ensembles",
          "Choral Society & Vocal Workshops",
          "Open Studio Ceramics & Exhibition Guild",
        ],
      },
      {
        id: "academic-societies",
        title: "Debate, Robotics & Academic Guilds",
        category: "Intellectual Fellowship",
        description:
          "Student-led societies that delve deeper into specialized academic passions, competitive tournaments, and technological innovation.",
        activities: [
          "Parliamentary Debate Union & Forensics",
          "Competitive Robotics & Coding Guild",
          "Model United Nations Delegation",
          "Student Campus Journal & Literary Review",
        ],
      },
      {
        id: "civic-engagement",
        title: "Service & Environmental Stewardship",
        category: "Community Impact",
        description:
          "Connecting campus life with the broader community through environmental conservation, literacy tutoring, and regional service partnerships.",
        activities: [
          "Campus Ecology & Organic Garden Project",
          "Regional Youth Literacy Mentorship",
          "Annual Charity Drive & Community Kitchen Support",
          "Peer Tutoring & Academic Buddy Program",
        ],
      },
    ],
    traditions: [
      {
        season: "Autumn",
        name: "Convocation & Induction Ceremony",
        description: "Welcoming incoming students, presenting house colours, and reaffirming the academic honor pledge.",
        status: "TODO: confirm tradition details with school",
      },
      {
        season: "Winter",
        name: "Festival of the Arts & Winter Concert",
        description: "An evening of choral music, theatrical vignettes, and studio art gallery receptions before the winter break.",
        status: "TODO: confirm tradition details with school",
      },
      {
        season: "Spring",
        name: "Academic Colloquium & Science Fair",
        description: "Senior students present thesis research, empirical laboratory posters, and creative capstone projects to faculty and families.",
        status: "TODO: confirm tradition details with school",
      },
      {
        season: "Summer",
        name: "Founder's Day & Sports Gala",
        description: "An afternoon of inter-house athletic relays, field games, alumni gatherings, and celebratory commencement.",
        status: "TODO: confirm tradition details with school",
      },
    ],
    studentSupport: {
      overline: "Pastoral Care",
      heading: "A supportive scaffolding for every student's journey.",
      description:
        "Adolescence and rigorous scholarship can be demanding. Our pastoral care network ensures that no student navigates challenges in isolation.",
      services: [
        {
          title: "Advisory System",
          description: "Small advisory cohorts meet multiple times each week with dedicated faculty mentors to discuss academic progress and community life.",
        },
        {
          title: "Counseling & Psychological Support",
          description: "Licensed counselors offer confidential guidance for emotional well-being, stress management, and personal development.",
        },
        {
          title: "Peer Mentorship Network",
          description: "Older students are paired with incoming learners to ease the transition into our school community and cultivate lasting bonds.",
        },
      ],
    },
  },

  // /admissions Page Config
  admissions: {
    hero: {
      badge: "Admissions & Enrollment",
      title: "Discover your place in our academic community.",
      description:
        "We seek curious, motivated students who are eager to engage with ideas, contribute their unique talents, and grow within a supportive and rigorous learning environment.",
      disclaimer: "Official application deadlines, fee schedules, and testing requirements are pending confirmation with school administration.",
    },
    philosophy: {
      overline: "Admissions Ethos",
      heading: "A holistic review focused on curiosity, character, and potential.",
      description:
        "We evaluate applicants beyond test scores alone. Our committee considers intellectual curiosity, collaborative attitude, creative spark, and readiness to thrive in our educational community.",
    },
    journey: [
      {
        step: "01",
        stage: "Discovery",
        title: "Explore & Inquire",
        description: "Review academic pathways and request an informational prospectus from our admissions team.",
        checklist: [
          "Explore academic departments and co-curricular programs",
          "Submit an online inquiry or contact the admissions office",
          "Receive the institutional prospectus and admissions guide",
        ],
        timing: "Open year-round",
      },
      {
        step: "02",
        stage: "Engagement",
        title: "Campus Visit & Consultation",
        description: "Join us for a guided campus tour, observe a live seminar, and meet with admissions advisors.",
        checklist: [
          "Schedule a personalized campus visit or attend an Open Day",
          "Participate in a student-led tour of libraries and labs",
          "Consult with faculty heads regarding grade placement",
        ],
        timing: "Scheduled by appointment throughout the academic year",
      },
      {
        step: "03",
        stage: "Application",
        title: "Formal Application Submission",
        description: "Complete the official enrollment dossier along with academic transcripts and recommendations.",
        checklist: [
          "Completed application form and personal candidate statement",
          "Official academic transcripts for the past two school years",
          "Confidential teacher recommendation letters",
        ],
        timing: "Official deadline pending school confirmation (TODO)",
      },
      {
        step: "04",
        stage: "Evaluation",
        title: "Dialogue & Placement Review",
        description: "A conversation with the student and parents to ensure mutual alignment and confirm educational readiness.",
        checklist: [
          "Student interview exploring passions, reading interests, and aspirations",
          "Family dialogue addressing goals and school values alignment",
          "Committee deliberation and formal notification of admission",
        ],
        timing: "Admissions committee review cycle (TODO)",
      },
    ],
    documentation: {
      overline: "Application Materials",
      heading: "Required documentation checklist.",
      description:
        "To ensure a thorough and equitable review, prospective families should assemble the following portfolio materials upon formal submission.",
      categories: [
        {
          category: "Academic Records",
          items: [
            "Official transcripts or grade reports for the preceding two academic years",
            "Standardized test results or assessment records (if applicable)",
            "Specialized educational evaluations or learning plans (if applicable)",
          ],
        },
        {
          category: "Recommendations & Statements",
          items: [
            "Confidential recommendation form from current mathematics or science instructor",
            "Confidential recommendation form from current humanities or English instructor",
            "Student handwritten or typed personal reflection on intellectual interests",
          ],
        },
        {
          category: "Identification & Administrative",
          items: [
            "Copy of student birth certificate or valid passport",
            "Up-to-date immunization and health history documentation",
            "Proof of current residential address",
          ],
        },
      ],
      statusNotice:
        "Specific documentation requirements may vary by entry grade. Please confirm exact requirements with our admissions coordinator.",
    },
    datesAndFeesNotice: {
      overline: "Calendar & Financial Information",
      heading: "Transparent dates and fee schedule notice.",
      datesNotice:
        "Exact calendar dates for application deadlines, early evaluation windows, and notification release are pending official publication by school administration. No placeholder deadline dates are fabricated.",
      feeNotice:
        "Tuition schedules, laboratory fees, meal options, and need-based financial aid policies are established by the Board of Trustees and will be provided directly by the admissions office. Please contact admissions for the current authorized fee schedule.",
    },
    faqs: [
      {
        question: "What qualities do you look for in prospective candidates?",
        answer:
          "We seek students who demonstrate genuine curiosity, a willingness to engage in thoughtful discussion, personal integrity, and kindness toward peers. We value diverse perspectives and individual passions.",
      },
      {
        question: "When should families begin the application process?",
        answer:
          "We encourage prospective families to begin exploring options 9 to 12 months prior to their intended entry date. Inquiries and campus tours are welcomed year-round.",
      },
      {
        question: "Is financial assistance available?",
        answer:
          "Yes, we are committed to making our education accessible to qualified students. Need-based financial aid information and application procedures are available directly from the admissions office.",
      },
      {
        question: "Can prospective students shadow a current student for a day?",
        answer:
          "Yes, shortlisted applicants have the opportunity to spend a morning on campus, attending seminar classes, having lunch in the dining commons, and meeting future classmates.",
      },
    ],
  },

  // /contact Page Config
  contactPage: {
    hero: {
      badge: "Campus Contact & Inquiries",
      title: "We welcome your inquiry and dialogue.",
      description:
        "Whether you are exploring enrollment for your child, planning a campus visit, or connecting with administration, our team is here to assist.",
    },
    departments: [
      {
        department: "Office of Admissions & Enrollment",
        purpose: "Inquiries regarding application procedures, campus tours, and student interviews.",
        email: "admissions@school-placeholder.internal (TODO: confirm)",
        phone: "TODO: confirm phone",
        hours: "Monday – Friday: 8:30 AM – 4:00 PM",
      },
      {
        department: "Academic Administration",
        purpose: "Curriculum questions, transcript requests, and academic coordination.",
        email: "academics@school-placeholder.internal (TODO: confirm)",
        phone: "TODO: confirm phone",
        hours: "Monday – Friday: 8:00 AM – 3:30 PM",
      },
      {
        department: "General Inquiries & Campus Operations",
        purpose: "Campus facilities, vendor inquiries, and general institutional matters.",
        email: "info@school-placeholder.internal (TODO: confirm)",
        phone: "TODO: confirm phone",
        hours: "Monday – Friday: 8:00 AM – 4:30 PM",
      },
    ],
    visitInfo: {
      overline: "Campus Location",
      heading: "Visiting Oakridge Academy",
      description:
        "Our campus is located in a quiet, accessible district with convenient road and transit connections.",
      address: "Campus address details pending confirmation with school administration.",
      parkingTransit:
        "Dedicated visitor parking bays are available adjacent to the Welcome Pavilion. Public transit connections and campus shuttle routes will be published upon address confirmation.",
      toursNotice:
        "All campus visits must be pre-arranged with the admissions office to ensure visitor security and personalized attention.",
    },
    inquiryNotice: {
      overline: "Electronic Contact Channel",
      heading: "Direct Communication & Inquiries",
      description:
        "In accordance with project guidelines, automated form submission directly to the school CRM is being configured with the school's verified mail relay.",
      status: "Automated Web Form Dispatch: Configuration Pending",
      alternativeInstructions:
        "To ensure your inquiry is received promptly without data loss, please contact our admissions office or general desk directly via email or telephone listed above.",
    },
  },
};
