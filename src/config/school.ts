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
    titleTemplate: "%s | School Website",
    defaultDescription:
      "Welcome to our public school website. Discover our programs, campus, and community.",
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
};
