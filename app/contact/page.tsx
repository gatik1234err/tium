"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", service: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Get in Touch
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            Let&apos;s find the right solution for your workforce.
          </h1>
        </Container>
      </div>

      {/* Main content */}
      <section className="border-b border-slate-100 py-0">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 py-0">
          {/* Left: Form */}
          <div className="lg:col-span-7 py-16 lg:pr-16">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">Message received.</h2>
                <p className="text-slate-500 max-w-xs">
                  A TIUM consultant will be in touch within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"",email:"",phone:"",company:"",service:"",message:"" }); }}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-blue-600" />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
                    Contact Form
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", name: "name", type: "text", required: true },
                    { label: "Business Email", name: "email", type: "email", required: true },
                    { label: "Phone Number", name: "phone", type: "tel" },
                    { label: "Company", name: "company", type: "text" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label htmlFor={field.name} className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                        {field.label} {field.required && <span className="text-blue-600">*</span>}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        value={(form as any)[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {/* Service dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    How can we help?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select a service…</option>
                    <option>RPO (Recruitment Process Outsourcing)</option>
                    <option>Contingent Staffing</option>
                    <option>Direct Hire</option>
                    <option>Contract Hire</option>
                    <option>Lead Generation</option>
                    <option>Candidate Sourcing</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Message <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your staffing requirements, timeline, or any other relevant context…"
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Right: contact info + image */}
          <div className="lg:col-span-5 py-16 lg:pl-16 space-y-10">
            {/* Image placeholder */}
            <div className="img-placeholder rounded-xl h-48 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <p className="text-sm text-blue-700/50">Austin Office / Team</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-display">Austin Headquarters</h3>
              <p className="text-sm text-slate-500">
                Our home office coordinates national sourcing and delivery. Visits by appointment.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Address", value: "5900 Balcone Dr STE 100\nAustin, TX 78731" },
                { icon: Phone, label: "Phone", value: "+1 (307) 529 0201", href: "tel:+13075290201" },
                { icon: Mail, label: "Email", value: "support@tiumtech.com", href: "mailto:support@tiumtech.com" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-slate-800 hover:text-blue-600 transition-colors whitespace-pre-line">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700 whitespace-pre-line">{c.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response time badge */}
            <div className="border border-blue-100 bg-blue-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide font-mono">
                  Response Commitment
                </span>
              </div>
              <p className="text-sm text-slate-600">
                All enterprise inquiries receive a response from a senior consultant within{" "}
                <strong className="text-slate-800">one business day</strong>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
