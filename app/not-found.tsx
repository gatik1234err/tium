import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-white">
      <Container size="narrow" className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
          404 ERROR
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 font-display">
          Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
          The page or resource you requested cannot be located. It may have moved or been
          updated.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="lg" withArrow>
            Return to Homepage
          </Button>
          <Button href="/careers" variant="outline" size="lg">
            Explore Open Roles
          </Button>
        </div>

        <div className="pt-10 border-t border-slate-100 max-w-sm mx-auto">
          <p className="text-xs text-slate-400 mb-3">Popular Navigation Destinations:</p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/services" className="text-blue-600 hover:text-blue-700 hover:underline">
              Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/industries" className="text-blue-600 hover:text-blue-700 hover:underline">
              Industries
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/why-tium" className="text-blue-600 hover:text-blue-700 hover:underline">
              Why TIUM
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
