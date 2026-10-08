import fs from "node:fs/promises";
import path from "node:path";
import type {
  JobListing,
  ServiceItem,
  IndustryItem,
  ReasonItem,
  ValueItem,
  LegalData,
  SiteSettings,
  PagesData,
  InquiryItem,
} from "./types";

const STORE_DIR = path.join(process.cwd(), "data", "store");

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(STORE_DIR, filename);
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`[ContentStore] Error reading ${filename}:`, error);
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    await fs.mkdir(STORE_DIR, { recursive: true });
    const filePath = path.join(STORE_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`[ContentStore] Error writing ${filename}:`, error);
    throw error;
  }
}

// ============================================================================
// Jobs CRUD
// ============================================================================
export async function getJobs(): Promise<JobListing[]> {
  return readJsonFile<JobListing[]>("jobs.json", []);
}

export async function getJobBySlug(slug: string): Promise<JobListing | null> {
  const jobs = await getJobs();
  return jobs.find((j) => j.slug === slug) || null;
}

export async function getJobById(id: string): Promise<JobListing | null> {
  const jobs = await getJobs();
  return jobs.find((j) => j.id === id) || null;
}

export async function saveJobs(jobs: JobListing[]): Promise<void> {
  await writeJsonFile("jobs.json", jobs);
}

export async function createJob(job: Omit<JobListing, "id"> & { id?: string }): Promise<JobListing> {
  const jobs = await getJobs();
  const newJob: JobListing = {
    ...job,
    id: job.id || `job-${Date.now()}`,
    status: job.status || "active",
  };
  jobs.unshift(newJob);
  await saveJobs(jobs);
  return newJob;
}

export async function updateJob(id: string, updates: Partial<JobListing>): Promise<JobListing | null> {
  const jobs = await getJobs();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return null;
  const updated = { ...jobs[index], ...updates };
  jobs[index] = updated;
  await saveJobs(jobs);
  return updated;
}

export async function deleteJob(id: string): Promise<boolean> {
  const jobs = await getJobs();
  const initialLength = jobs.length;
  const filtered = jobs.filter((j) => j.id !== id);
  if (filtered.length === initialLength) return false;
  await saveJobs(filtered);
  return true;
}

// ============================================================================
// Services CRUD
// ============================================================================
export async function getServices(): Promise<ServiceItem[]> {
  return readJsonFile<ServiceItem[]>("services.json", []);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

export async function saveServices(services: ServiceItem[]): Promise<void> {
  await writeJsonFile("services.json", services);
}

export async function createService(service: ServiceItem): Promise<ServiceItem> {
  const services = await getServices();
  services.push(service);
  await saveServices(services);
  return service;
}

export async function updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> {
  const services = await getServices();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  const updated = { ...services[index], ...updates };
  services[index] = updated;
  await saveServices(services);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  const services = await getServices();
  const initialLength = services.length;
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === initialLength) return false;
  await saveServices(filtered);
  return true;
}

// ============================================================================
// Industries CRUD
// ============================================================================
export async function getIndustries(): Promise<IndustryItem[]> {
  return readJsonFile<IndustryItem[]>("industries.json", []);
}

export async function getIndustryBySlug(slug: string): Promise<IndustryItem | null> {
  const industries = await getIndustries();
  return industries.find((i) => i.slug === slug) || null;
}

export async function saveIndustries(industries: IndustryItem[]): Promise<void> {
  await writeJsonFile("industries.json", industries);
}

export async function createIndustry(industry: IndustryItem): Promise<IndustryItem> {
  const industries = await getIndustries();
  industries.push(industry);
  await saveIndustries(industries);
  return industry;
}

export async function updateIndustry(id: string, updates: Partial<IndustryItem>): Promise<IndustryItem | null> {
  const industries = await getIndustries();
  const index = industries.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const updated = { ...industries[index], ...updates };
  industries[index] = updated;
  await saveIndustries(industries);
  return updated;
}

export async function deleteIndustry(id: string): Promise<boolean> {
  const industries = await getIndustries();
  const initialLength = industries.length;
  const filtered = industries.filter((i) => i.id !== id);
  if (filtered.length === initialLength) return false;
  await saveIndustries(filtered);
  return true;
}

// ============================================================================
// Reasons CRUD
// ============================================================================
export async function getReasons(): Promise<ReasonItem[]> {
  return readJsonFile<ReasonItem[]>("reasons.json", []);
}

export async function saveReasons(reasons: ReasonItem[]): Promise<void> {
  await writeJsonFile("reasons.json", reasons);
}

// ============================================================================
// Values CRUD
// ============================================================================
export async function getValues(): Promise<ValueItem[]> {
  return readJsonFile<ValueItem[]>("values.json", []);
}

export async function saveValues(values: ValueItem[]): Promise<void> {
  await writeJsonFile("values.json", values);
}

// ============================================================================
// Legal (Cookies & Terms & Conditions)
// ============================================================================
export async function getLegal(): Promise<LegalData> {
  return readJsonFile<LegalData>("legal.json", {
    cookies: {
      enabled: true,
      title: "Cookie & Privacy Preferences",
      message: "TIUM uses cookies to improve your browsing experience.",
      acceptAllText: "Accept All Cookies",
      declineText: "Necessary Only",
      settingsText: "Preferences",
      policyUrl: "/privacy",
      termsUrl: "/terms",
      lastUpdated: "October 2026",
    },
    terms: {
      enabled: true,
      version: "2.1",
      lastUpdated: "October 2026",
      modalTrigger: "first_visit",
      title: "Terms and Conditions",
      subtitle: "Please accept our terms of service.",
      checkboxLabel: "I have read and agree to the Terms & Conditions.",
      agreeButtonText: "I Agree",
      declineButtonText: "Decline",
      content: "Default terms content...",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "October 2026",
      intro: "Privacy intro...",
      sections: [],
    },
  });
}

export async function saveLegal(legal: LegalData): Promise<void> {
  await writeJsonFile("legal.json", legal);
}

// ============================================================================
// Site Settings
// ============================================================================
export async function getSettings(): Promise<SiteSettings> {
  return readJsonFile<SiteSettings>("settings.json", {
    companyName: "TIUM Staffing LLC",
    tagline: "Connecting human potential with organizational purpose",
    phone: "+1 (307) 529 0201",
    email: "support@tiumtech.com",
    address: "5900 Balcone Dr STE 100, Austin, TX 78731",
    websiteUrl: "https://tiumtech.com",
    socials: {
      linkedin: "https://www.linkedin.com/company/tium",
      twitter: "https://twitter.com/tiumstaffing",
      github: "https://github.com/tium",
    },
    admin: {
      username: "admin@tiumtech.com",
      passwordHash: "admin123",
    },
  });
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeJsonFile("settings.json", settings);
}

// ============================================================================
// Pages Content
// ============================================================================
export async function getPages(): Promise<PagesData> {
  const fallback: PagesData = {
    home: {
      hero: {
        headlinePart1: "The right talent",
        headlineAccent: "can change",
        headlinePart2: "everything.",
        description:
          "TIUM connects businesses with exceptional talent through flexible, industry-focused workforce solutions.",
        primaryCtaText: "Find Talent",
        primaryCtaLink: "/contact?intent=talent",
        secondaryCtaText: "Explore Careers",
        secondaryCtaLink: "/careers",
        stats: [
          { value: "< 48h", label: "Average Shortlist" },
          { value: "98.4%", label: "SLA Fulfillment" },
          { value: "6", label: "Industry Practices" },
        ],
      },
      intro: {
        eyebrow: "WHO WE ARE",
        headline: "Precision workforce solutions for demanding industries.",
        description: "At TIUM Staffing, we recognize that people are everything.",
        quote: "People are the foundation of every successful organization.",
        quoteAuthor: "TIUM Staffing",
        proofPoints: [],
      },
      dualCta: {
        employers: {
          eyebrow: "FOR EMPLOYERS",
          title: "Scale your workforce.",
          desc: "Request staffing solutions.",
          ctaText: "Request Consultation",
          ctaLink: "/contact?intent=talent",
        },
        candidates: {
          eyebrow: "FOR PROFESSIONALS",
          title: "Find your next career.",
          desc: "Browse open jobs.",
          ctaText: "Browse Jobs",
          ctaLink: "/careers",
        },
      },
    },
    about: {
      eyebrow: "About TIUM Staffing",
      title: "Connecting human potential with organizational purpose.",
      storyTitle: "Redefining recruitment through consultative excellence.",
      storyParagraph1: "",
      storyParagraph2: "",
      statNumber: "98.4%",
      statLabel: "Client SLA Fulfillment Rate",
      missionTitle: "Our Mission",
      missionDesc: "",
      visionTitle: "Our Vision",
      visionDesc: "",
    },
    whyTium: {
      eyebrow: "WHY CHOOSE TIUM",
      title: "Built differently to deliver better staffing outcomes.",
      description: "",
      stats: [],
    },
    careers: {
      eyebrow: "CAREERS AT TIUM",
      title: "Join mission-driven teams shaping the future.",
      description: "Discover open positions.",
      searchPlaceholder: "Search by title, skill, or keyword...",
      noResultsText: "No positions found matching your criteria.",
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      title: "Let's discuss your workforce and talent strategy.",
      description: "",
      phone: "+1 (307) 529 0201",
      email: "support@tiumtech.com",
      address: "5900 Balcone Dr STE 100, Austin, TX 78731",
      hours: "Monday – Friday: 8:00 AM – 6:00 PM CST",
    },
  };
  return readJsonFile<PagesData>("pages.json", fallback);
}

export async function savePages(pages: PagesData): Promise<void> {
  await writeJsonFile("pages.json", pages);
}

// ============================================================================
// Inquiries (Contact messages & Job applications)
// ============================================================================
export async function getInquiries(): Promise<InquiryItem[]> {
  return readJsonFile<InquiryItem[]>("inquiries.json", []);
}

export async function saveInquiries(inquiries: InquiryItem[]): Promise<void> {
  await writeJsonFile("inquiries.json", inquiries);
}

export async function addInquiry(inquiry: Omit<InquiryItem, "id" | "createdAt" | "status"> & { status?: InquiryItem["status"] }): Promise<InquiryItem> {
  const inquiries = await getInquiries();
  const newItem: InquiryItem = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: inquiry.status || "new",
  };
  inquiries.unshift(newItem);
  await saveInquiries(inquiries);
  return newItem;
}

export async function updateInquiry(id: string, updates: Partial<InquiryItem>): Promise<InquiryItem | null> {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const updated = { ...inquiries[index], ...updates };
  inquiries[index] = updated;
  await saveInquiries(inquiries);
  return updated;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const inquiries = await getInquiries();
  const initialLength = inquiries.length;
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length === initialLength) return false;
  await saveInquiries(filtered);
  return true;
}

// ============================================================================
// Backup & Restore
// ============================================================================
export async function exportAllData() {
  const [jobs, services, industries, reasons, values, legal, settings, pages, inquiries] =
    await Promise.all([
      getJobs(),
      getServices(),
      getIndustries(),
      getReasons(),
      getValues(),
      getLegal(),
      getSettings(),
      getPages(),
      getInquiries(),
    ]);

  return {
    exportedAt: new Date().toISOString(),
    version: "1.0",
    jobs,
    services,
    industries,
    reasons,
    values,
    legal,
    settings,
    pages,
    inquiries,
  };
}

export async function importAllData(data: Record<string, unknown>) {
  if (data.jobs && Array.isArray(data.jobs)) await saveJobs(data.jobs as JobListing[]);
  if (data.services && Array.isArray(data.services)) await saveServices(data.services as ServiceItem[]);
  if (data.industries && Array.isArray(data.industries)) await saveIndustries(data.industries as IndustryItem[]);
  if (data.reasons && Array.isArray(data.reasons)) await saveReasons(data.reasons as ReasonItem[]);
  if (data.values && Array.isArray(data.values)) await saveValues(data.values as ValueItem[]);
  if (data.legal) await saveLegal(data.legal as LegalData);
  if (data.settings) await saveSettings(data.settings as SiteSettings);
  if (data.pages) await savePages(data.pages as PagesData);
  if (data.inquiries && Array.isArray(data.inquiries)) await saveInquiries(data.inquiries as InquiryItem[]);
}
