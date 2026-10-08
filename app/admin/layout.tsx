import React from "react";
import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: "TIUM Control Console | Admin",
  description: "Administrative Content & Settings Management Engine for TIUM Staffing LLC.",
  robots: "noindex, nofollow",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
