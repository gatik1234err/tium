"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const navLinks = [
    { name: "About", href: "/about" },
    {
      name: "Services", href: "/services",
      children: services.map(s => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      name: "Industries", href: "/industries",
      children: industries.map(i => ({ label: i.name, href: `/industries/${i.slug}` })),
    },
    { name: "Why TIUM", href: "/why-tium" },
    { name: "Careers", href: "/careers" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-white border-b border-slate-200 shadow-sm py-3"
            : "bg-white/90 backdrop-blur-md border-b border-slate-100 py-4"
        )}
      >
        <Container className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" aria-label="TIUM Home" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg btn-gradient-blue flex items-center justify-center shadow-sm">
              <span className="text-white font-bold font-display tracking-tight text-lg leading-none">T</span>
            </div>
            <div>
              <span className="block text-xl font-bold text-slate-900 font-display tracking-tight leading-none">
                TIUM
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-[0.12em] font-mono leading-tight">
                Staffing LLC
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const hasChildren = !!link.children;
              const active = isActive(link.href);

              if (hasChildren) {
                const isOpen = openDropdown === link.name;
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors",
                        active ? "text-blue-600" : "text-slate-700 hover:text-slate-900"
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 opacity-50 transition-transform duration-150", isOpen && "rotate-180")}
                      />
                    </Link>

                    {isOpen && (
                      <div className="absolute top-full left-0 mt-0 pt-1 w-68 z-50">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">
                              {link.name}
                            </span>
                          </div>
                          <div className="py-1.5">
                            {link.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                            <Link
                              href={link.href}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                            >
                              View all {link.name} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded transition-colors",
                    active ? "text-blue-600" : "text-slate-700 hover:text-slate-900"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/contact?intent=talent"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Find Talent
            </Link>
            <Button href="/contact" variant="primary" size="sm" withArrow>
              Contact Us
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </Container>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Container className="py-8">
              <nav className="flex flex-col">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between py-5 border-b border-slate-100 group"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-mono text-slate-400 num-label">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-3xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-600 text-xl transition-colors">→</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-10 space-y-3">
                <Button
                  href="/contact?intent=talent"
                  variant="primary"
                  size="lg"
                  className="w-full justify-between"
                  withArrow
                  onClick={() => setMobileOpen(false)}
                >
                  Request Staffing Help
                </Button>
                <Button
                  href="/careers"
                  variant="outline"
                  size="lg"
                  className="w-full justify-between"
                  withArrow
                  onClick={() => setMobileOpen(false)}
                >
                  Browse Open Roles
                </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 text-sm text-slate-500 space-y-1">
                <p>Austin, TX 78731</p>
                <p>+1 (307) 529 0201</p>
                <p className="text-blue-600">support@tiumtech.com</p>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
