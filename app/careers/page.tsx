"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { jobs } from "@/data/jobs";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

const industries = ["All", ...Array.from(new Set(jobs.map((j) => j.industry)))];
const types = ["All Types", "Full-Time", "Contract", "Direct Hire", "Contingent"];
const locations = ["All Locations", ...Array.from(new Set(jobs.map((j) => j.location)))];
const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [ind, setInd] = useState("All");
  const [type, setType] = useState("All Types");
  const [loc, setLoc] = useState("All Locations");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const jobsListRef = useRef<HTMLDivElement | null>(null);

  // Filter logic
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return jobs.filter((j) => {
      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.industry.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.requirements.some((req) => req.toLowerCase().includes(q));
      const matchI = ind === "All" || j.industry === ind;
      const matchT = type === "All Types" || j.type === type;
      const matchL = loc === "All Locations" || j.location === loc;
      return matchQ && matchI && matchT && matchL;
    });
  }, [query, ind, type, loc]);

  // Reset to first page whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, ind, type, loc, pageSize]);

  // Pagination math
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedJobs = filtered.slice(startIndex, endIndex);

  // Scroll smoothly to list header when page is clicked
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (jobsListRef.current) {
      const yOffset = -120;
      const element = jobsListRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Generate page numbers with intelligent truncation
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pt-16 bg-white">
      {/* ── Page Header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Open Positions
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            Build your career at the intersection of ambition and opportunity.
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            Explore active mandates across specialized technical, clinical, and corporate disciplines.
          </p>
        </Container>
      </div>

      {/* ── Filters Bar ── */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <Container className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search roles, skills, keywords…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Dropdowns */}
            {([
              { value: ind, setter: setInd, options: industries, label: "Industry" },
              { value: type, setter: setType, options: types, label: "Type" },
              { value: loc, setter: setLoc, options: locations, label: "Location" },
            ] as const).map((filter) => (
              <div key={filter.label} className="relative">
                <select
                  value={filter.value}
                  onChange={(e) => filter.setter(e.target.value)}
                  className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700 transition-all cursor-pointer font-medium"
                >
                  {filter.options.map((o) => (
                    <option key={o} value={o}>
                      {o === "All" || o.startsWith("All") ? filter.label + ": " + o : o}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Jobs List & Pagination ── */}
      <section ref={jobsListRef} className="py-12 border-b border-slate-100 scroll-mt-24">
        <Container>
          {/* Top Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">
                {totalItems} {totalItems === 1 ? "position" : "positions"}
              </span>
              {totalItems > 0 && (
                <span className="text-xs text-slate-400 font-mono">
                  • Showing {startIndex + 1}–{endIndex}
                </span>
              )}
            </div>

            {/* Per Page Selector */}
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span>Per page:</span>
              <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden bg-slate-50 p-0.5">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    onClick={() => setPageSize(size)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      pageSize === size
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Empty state */}
          {totalItems === 0 ? (
            <div className="text-center py-24 text-slate-400 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xl font-semibold text-slate-800">No matching positions found</p>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Try clearing your search terms or selecting different industry / location filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setInd("All");
                  setType("All Types");
                  setLoc("All Locations");
                }}
                className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {paginatedJobs.map((j) => (
                <Link
                  key={j.id}
                  href={`/careers/${j.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 hover:bg-slate-50 -mx-4 px-4 rounded-xl transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-mono border border-blue-100">
                        {j.industry}
                      </span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                          j.type === "Full-Time"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : j.type === "Contract"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : j.type === "Direct Hire"
                            ? "bg-purple-50 text-purple-700 border-purple-100"
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}
                      >
                        {j.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                        • {j.experience}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                      {j.title}
                    </h3>

                    <div className="flex items-center gap-5 text-sm text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {j.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" /> Posted {j.postedDate}
                      </span>
                      {j.salary && (
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" /> {j.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3 pt-2 sm:pt-0">
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Bottom Pagination Bar ── */}
          {totalPages > 1 && (
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Status copy */}
              <p className="text-xs text-slate-500 font-mono">
                Page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
                <span className="font-bold text-slate-900">{totalPages}</span> ({totalItems} roles total)
              </p>

              {/* Navigation controls */}
              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-all mr-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Numbered Page Buttons */}
                {getPageNumbers().map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 py-1 text-xs text-slate-400 select-none"
                      >
                        …
                      </span>
                    );
                  }

                  const pageNum = page as number;
                  const isActive = currentPage === pageNum;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={isActive ? "page" : undefined}
                      className={`min-w-9 h-9 px-2 text-xs font-semibold rounded-lg transition-all ${
                        isActive
                          ? "btn-gradient-blue text-white shadow-sm font-bold"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-all ml-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ── Employer CTA ── */}
      <section className="py-20 bg-slate-50">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
              For Employers
            </p>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              Looking to add specialized talent?
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Connect with our Austin talent consultants to access our network of 15,000+ pre-screened professionals across tech, healthcare, and engineering.
            </p>
            <div className="pt-2">
              <Button href="/contact?intent=talent" variant="primary" withArrow>
                Request Staffing Assistance
              </Button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="img-placeholder rounded-xl h-56 relative overflow-hidden flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm text-blue-700/60 font-medium">Enterprise Recruiting Network</p>
              <p className="text-xs text-blue-600/40 mt-1 font-mono">Austin HQ & National Delivery</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
