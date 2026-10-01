import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "blue" | "outline" | "subtle";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    outline: "bg-transparent text-slate-700 border-slate-300",
    subtle: "bg-blue-50/50 text-blue-600 border-blue-100",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
