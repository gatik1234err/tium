import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-4 font-mono">
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.08]",
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-slate-500 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
