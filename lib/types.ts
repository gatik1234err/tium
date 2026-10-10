export interface JobListing {
  id: string;
  slug: string;
  title: string;
  industry: string;
  location: string;
  type: "Full-Time" | "Contract" | "Direct Hire" | "Contingent";
  experience: "Junior" | "Mid-Level" | "Senior" | "Lead" | "Executive";
  salary: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status?: "active" | "draft";
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  description: string;
  fullOverview: string;
  benefits: string[];
  capabilities: string[];
  process: { step: string; title: string; desc: string }[];
  metrics: { label: string; value: string }[];
  roles: string[];
  imageUrl?: string;
  imageAlt?: string;
}

export interface IndustryItem {
  id: string;
  number: string;
  name: string;
  slug: string;
  tagline: string;
  subtitle: string;
  overview: string;
  marketInsights: string;
  specializations: string[];
  keyRoles: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface ReasonItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlight: string;
}

export interface ValueItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

export interface CookieSettings {
  enabled: boolean;
  title: string;
  message: string;
  acceptAllText: string;
  declineText: string;
  settingsText: string;
  policyUrl: string;
  termsUrl: string;
  lastUpdated: string;
}

export interface TermsSettings {
  enabled: boolean;
  version: string;
  lastUpdated: string;
  modalTrigger: "first_visit" | "form_submission" | "always" | "disabled";
  title: string;
  subtitle: string;
  checkboxLabel: string;
  agreeButtonText: string;
  declineButtonText: string;
  content: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

export interface PrivacySettings {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
}

export interface LegalData {
  cookies: CookieSettings;
  terms: TermsSettings;
  privacy: PrivacySettings;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  websiteUrl: string;
  logoUrl?: string;
  logoLightUrl?: string;
  faviconUrl?: string;
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  admin: {
    username: string;
    passwordHash: string;
  };
}

export interface PagesData {
  home: {
    hero: {
      headlinePart1: string;
      headlineAccent: string;
      headlinePart2: string;
      description: string;
      primaryCtaText: string;
      primaryCtaLink: string;
      secondaryCtaText: string;
      secondaryCtaLink: string;
      stats: { value: string; label: string }[];
      imageUrl?: string;
      imageAlt?: string;
    };
    intro: {
      eyebrow: string;
      headline: string;
      description: string;
      quote: string;
      quoteAuthor: string;
      proofPoints: string[];
      imageUrl?: string;
      imageAlt?: string;
    };
    aboutPreview?: {
      imageUrl?: string;
      imageAlt?: string;
    };
    missionVision?: {
      imageUrl?: string;
      imageAlt?: string;
    };
    dualCta: {
      employers: {
        eyebrow: string;
        title: string;
        desc: string;
        ctaText: string;
        ctaLink: string;
        imageUrl?: string;
        imageAlt?: string;
      };
      candidates: {
        eyebrow: string;
        title: string;
        desc: string;
        ctaText: string;
        ctaLink: string;
        imageUrl?: string;
        imageAlt?: string;
      };
    };
  };
  about: {
    eyebrow: string;
    title: string;
    storyTitle: string;
    storyParagraph1: string;
    storyParagraph2: string;
    statNumber: string;
    statLabel: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    storyImageUrl?: string;
    storyImageAlt?: string;
  };
  whyTium: {
    eyebrow: string;
    title: string;
    description: string;
    stats: { value: string; label: string; sub: string }[];
    heroImageUrl?: string;
  };
  careers: {
    eyebrow: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    noResultsText: string;
    bannerImageUrl?: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    officeImageUrl?: string;
    officeImageAlt?: string;
  };
}

export interface InquiryItem {
  id: string;
  type: "contact" | "job_application";
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  intent?: string;
  jobSlug?: string;
  jobTitle?: string;
  message: string;
  status: "new" | "reviewed" | "archived";
}
