"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { JobListing } from "@/lib/types";
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

interface CareersClientProps {
  initialJobs: JobListing[];
  pageContent?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    searchPlaceholder?: string;
    noResultsText?: string;
  };
}

const types = ["All Types", "Full-Time", "Contract", "Direct Hire", "Contingent"];
const PAGE_SIZE_OPTIONS = [5, 10, 20];

export function CareersClient({ initialJobs, pageContent }: CareersClientProps) {
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs || []);
  const [query, setQuery] = useState("");
  const [ind, setInd] = useState("All");
  const [type, setType] = useState("All Types");
  const [loc, setLoc] = useState("All Locations");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const jobsListRef = useRef<HTMLDivElement | null>(null);

  // Synchronize if initialJobs changes
  useEffect(() => {
    setJobs(initialJobs || []);
  }, [initialJobs]);

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.industry)))],
    [jobs]
  );

  const locations = useMemo(
    () => ["All Locations", ...Array.from(new Set(jobs.map((j) => j.location)))],
    [jobs]
  );

  // Filter logic
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return jobs.filter((j) => {
      // If status is explicitly draft, omit
      if (j.status === "draft") return false;

      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.industry.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.requirements?.some((req) => req.toLowerCase().includes(q)) ||
        j.description.toLowerCase().includes(q);
      const matchI = ind === "All" || j.industry === ind;
      const matchT = type === "All Types" || j.type === type;
      const matchL = loc === "All Locations" || j.location === loc;
      return matchQ && matchI && matchT && matchL;
    });
  }, [jobs, query, ind, type, loc]);

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
    <div className="pt-16 bg-white min-h-screen">
      {/* ── Page Header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            {pageContent?.eyebrow || "Open Positions"}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            {pageContent?.title || "Build your career at the intersection of ambition and opportunity."}
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            {pageContent?.description ||
              "Explore active mandates across specialized technical, clinical, and corporate disciplines."}
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
                placeholder={pageContent?.searchPlaceholder || "Search roles, skills, keywords…"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Dropdowns */}
            {[
              { value: ind, setter: setInd, options: industries, label: "Industry" },
              { value: type, setter: setType, options: types, label: "Type" },
              { value: loc, setter: setLoc, options: locations, label: "Location" },
            ].map((filter) => (
              <div key={filter.label} className="relative">
                <select
                  value={filter.value}
                  onChange={(e) => filter.setter(e.target.value)}
                  className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700 transition-all cursor-pointer font-medium"
                >
                  {filter.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
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
      <div className="py-12 bg-slate-50/50" ref={jobsListRef}>
        <Container>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Showing{" "}
                <span className="font-mono text-blue-600 font-bold">
                  {totalItems === 0 ? 0 : `${startIndex + 1}-${endIndex}`}
                </span>{" "}
                of <span className="font-mono text-slate-900 font-bold">{totalItems}</span> roles
              </p>
              {(query || ind !== "All" || type !== "All Types" || loc !== "All Locations") && (
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs text-slate-400">Filtered by:</span>
                  {query && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      &quot;{query}&quot;
                    </span>
                  )}
                  {ind !== "All" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {ind}
                    </span>
                  )}
                  {type !== "All Types" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {type}
                    </span>
                  )}
                  {loc !== "All Locations" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {loc}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setInd("All");
                      setType("All Types");
                      setLoc("All Locations");
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 ml-1 underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Show per page:</span>
              <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPageSize(size)}
                    className={`px-2.5 py-1 rounded-md font-mono text-xs font-semibold transition-all ${
                      pageSize === size
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs Listing */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/80 my-8 shadow-xs">
              <p className="text-base font-semibold text-slate-900 font-display">
                {pageContent?.noResultsText || "No positions match your search."}
              </p>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Try clearing your search terms or selecting different industry / location filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setInd("All");
                  setType("All Types");
                  setLoc("All Locations");
                }}
                className="mt-6 px-4 py-2 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200/80 my-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 sm:p-8 hover:bg-slate-50/70 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {job.industry}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        {job.type}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                    </div>

                    <div>
                      <Link href={`/careers/${job.slug}`}>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h2>
                      </Link>
                      <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-1">
                      <span className="font-semibold text-slate-900 font-mono">
                        {job.salary}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Posted {job.postedDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <Button
                      href={`/careers/${job.slug}`}
                      variant="outline"
                      size="sm"
                      className="group-hover:border-blue-300 group-hover:text-blue-600"
                    >
                      View Role
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 order-2 sm:order-1">
                Page <span className="font-semibold text-slate-900 font-mono">{currentPage}</span> of{" "}
                <span className="font-semibold text-slate-900 font-mono">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                    currentPage === 1
                      ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                      : "border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white shadow-2xs cursor-pointer"
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-xs text-slate-400 font-mono">
                      …
                    </span>
                  ) : (
                    <button
                      key={`page-${page}`}
                      type="button"
                      onClick={() => handlePageChange(Number(page))}
                      className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-100 bg-white shadow-2xs"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                    currentPage === totalPages
                      ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                      : "border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white shadow-2xs cursor-pointer"
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
