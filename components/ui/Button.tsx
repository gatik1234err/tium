import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary:
      "btn-gradient-blue text-white active:scale-[0.99]",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
    outline:
      "bg-transparent text-slate-800 border border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-700",
    ghost:
      "bg-transparent text-slate-600 hover:text-blue-700 hover:bg-blue-50/40",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5 rounded",
    md: "text-sm px-6 py-3 gap-2 rounded",
    lg: "text-base px-8 py-4 gap-2.5 rounded",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </>
  );

  if (href) {
    return <Link href={href} className={classes}>{inner}</Link>;
  }

  return <button className={classes} {...props}>{inner}</button>;
}
