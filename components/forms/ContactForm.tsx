"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get("intent");
  const serviceParam = searchParams.get("service");
  const jobParam = searchParams.get("job");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    intent: "Staffing",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (intentParam === "career") {
      setFormData((prev) => ({
        ...prev,
        intent: "Career Opportunity",
        message: jobParam ? `Inquiring about role: ${jobParam}` : prev.message,
      }));
    } else if (intentParam === "talent" || intentParam === "staffing") {
      setFormData((prev) => ({
        ...prev,
        intent: "Staffing",
        message: serviceParam ? `Inquiring about service: ${serviceParam}` : prev.message,
      }));
    }
  }, [intentParam, serviceParam, jobParam]);

  const intentOptions = ["Staffing", "RPO", "Recruitment", "Career Opportunity"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields (Name, Email, and Message).");
      return;
    }
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again or email support@tiumtech.com.");
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5";

  if (status === "success") {
    return (
      <div className="rounded-xl p-8 sm:p-10 border border-emerald-200 bg-emerald-50 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 font-display">
          Thank you for reaching out!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Your inquiry has been routed to our Austin recruitment team. We will review your
          details and follow up within one business day.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormData({ fullName: "", email: "", phone: "", company: "", intent: "Staffing", message: "" });
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="pb-2">
        <h2 className="text-2xl font-bold text-slate-900 font-display">Send a Message</h2>
        <p className="text-xs text-slate-400 mt-1">
          Fields marked with an asterisk (<span className="text-blue-600">*</span>) are required.
        </p>
      </div>

      {status === "error" && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Full Name <span className="text-blue-600">*</span>
          </label>
          <input
            type="text" required placeholder="Jane Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Work Email <span className="text-blue-600">*</span>
          </label>
          <input
            type="email" required placeholder="jane@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel" placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Company / Organization</label>
          <input
            type="text" placeholder="Acme Corporation"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 3: Intent Selector */}
      <div>
        <label className={labelClass}>
          I&apos;m looking for <span className="text-blue-600">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {intentOptions.map((opt) => (
            <button
              key={opt} type="button"
              onClick={() => setFormData({ ...formData, intent: opt })}
              className={`py-2 px-3 rounded text-xs font-semibold border text-center transition-all ${
                formData.intent === opt
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label className={labelClass}>
          Message / Role Specifications <span className="text-blue-600">*</span>
        </label>
        <textarea
          rows={4} required
          placeholder="Briefly describe your hiring requirements, desired start timeline, or candidate profile..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button
        type="submit" variant="primary" size="lg"
        disabled={status === "submitting"}
        className="w-full justify-center"
        withArrow
      >
        {status === "submitting" ? "Transmitting..." : "Send Message"}
      </Button>

      <div className="text-center text-[11px] text-slate-400">
        By submitting, you agree to our confidential handling of your data in accordance with our{" "}
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </div>
    </form>
  );
}
