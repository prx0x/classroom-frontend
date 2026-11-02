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
};
