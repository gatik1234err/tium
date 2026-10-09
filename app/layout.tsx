import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalProvider } from "@/components/legal/LegalProvider";
import { getLegal } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TIUM Staffing | Workforce & Recruitment Solutions",
    template: "%s | TIUM Staffing",
  },
  description:
    "TIUM Staffing connects businesses with exceptional talent through flexible, reliable, and industry-focused workforce solutions.",
  metadataBase: new URL("https://tiumtech.com"),
  keywords: [
    "Staffing", "Recruitment Process Outsourcing", "RPO", "Contingent Staffing",
    "Direct Hire", "Austin Staffing Agency", "Tech Recruitment", "Healthcare Staffing",
  ],
  openGraph: {
    title: "TIUM Staffing | Workforce & Recruitment Solutions",
    description: "Connecting businesses with exceptional talent through tailored workforce solutions.",
    url: "https://tiumtech.com",
    siteName: "TIUM Staffing",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const legalData = await getLegal().catch(() => null);

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <LegalProvider
          initialCookies={legalData?.cookies}
          initialTerms={legalData?.terms}
        />
      </body>
    </html>
  );
}

