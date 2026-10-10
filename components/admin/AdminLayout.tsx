"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  Factory,
  Award,
  HeartHandshake,
  FileText,
  Image as ImageIcon,
  ShieldAlert,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CheckCircle,
  Bell,
  Sparkles,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // If on login page, render children directly without admin shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Check auth status
    fetch("/api/admin/auth")
      .then((res) => {
        if (!res.ok) {
          router.replace("/admin/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.authenticated) {
          setUser(data.user);
          setLoading(false);
        } else if (!isLoginPage) {
          router.replace("/admin/login");
        }
      })
      .catch(() => {
        if (!isLoginPage) {
          router.replace("/admin/login");
        }
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-mono text-slate-400">Verifying TIUM Admin credentials...</p>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Jobs & Careers", href: "/admin/jobs", icon: Briefcase },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Industries", href: "/admin/industries", icon: Factory },
    { label: "Why TIUM", href: "/admin/reasons", icon: Award },
    { label: "Values & Mission", href: "/admin/values", icon: HeartHandshake },
    { label: "Page Content", href: "/admin/pages", icon: FileText },
    { label: "Media & Images", href: "/admin/media", icon: ImageIcon, highlight: true },
    { label: "Legal, Cookies & Terms", href: "/admin/legal", icon: ShieldAlert },
    { label: "Inquiries & Leads", href: "/admin/inquiries", icon: Inbox },
    { label: "Settings & Backup", href: "/admin/settings", icon: Settings },
  ];

  const currentNav = navItems.find(
    (item) => item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href))
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-blue-600 selection:text-white">
      {/* ── Sidebar (Desktop) ── */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/30 font-display text-base group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <span className="font-bold text-base tracking-tight font-display text-white">
                TIUM Admin
              </span>
              <span className="block text-[10px] text-blue-400 font-mono tracking-wider uppercase">
                Content Engine
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span className="flex-1">{item.label}</span>
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Live Site Quick Link & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-1 bg-slate-950/60">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              Live Website
            </span>
            <span className="text-[10px] font-mono text-slate-500">tiumtech.com</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            T
          </div>
          <span className="font-bold text-white font-display text-sm">TIUM Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-3 space-y-1 z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs ${
                  isActive ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-blue-400 flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-red-400 flex items-center gap-1.5 py-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-x-hidden">
        {/* Top Navbar */}
        <header className="h-14 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Admin</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-semibold text-white">
              {currentNav?.label || "Console"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-sky-400" />
              Preview Live Site
            </Link>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-xs font-semibold text-blue-300">
                A
              </div>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                {user?.username || "admin@tiumtech.com"}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
