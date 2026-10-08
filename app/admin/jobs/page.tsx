"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  Copy,
  ChevronDown,
} from "lucide-react";
import type { JobListing } from "@/lib/types";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("All");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobListing> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Input states for arrays inside modal
  const [respInput, setRespInput] = useState("");
  const [reqInput, setReqInput] = useState("");
  const [benInput, setBenInput] = useState("");

  const loadJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const openNewJobModal = () => {
    setEditingJob({
      id: "",
      slug: "",
      title: "",
      industry: "Information Technology",
      location: "Austin, TX (Hybrid / Remote)",
      type: "Full-Time",
      experience: "Senior",
      salary: "$150,000 - $180,000 / year",
      postedDate: "Just now",
      description: "",
      responsibilities: [],
      requirements: [],
      benefits: [
        "Comprehensive medical, dental, and vision insurance",
        "401(k) matching",
        "Flexible hybrid/remote schedule and unlimited PTO",
      ],
      status: "active",
    });
    setRespInput("");
    setReqInput("");
    setBenInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobListing) => {
    setEditingJob({ ...job });
    setRespInput("");
    setReqInput("");
    setBenInput("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.title || !editingJob.industry) return;

    setSubmitting(true);
    const isEdit = Boolean(editingJob.id);

    try {
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch("/api/admin/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });

      if (!res.ok) throw new Error("Failed to save job");

      await loadJobs();
      setIsModalOpen(false);
      setEditingJob(null);
      setFeedbackMessage(isEdit ? "Job updated successfully!" : "Job posted successfully!");
      setTimeout(() => setFeedbackMessage(""), 3500);
    } catch {
      alert("Error saving job. Please check inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the job listing: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await loadJobs();
      setFeedbackMessage("Job deleted successfully.");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch {
      alert("Error deleting job.");
    }
  };

  const industriesList = ["All", ...Array.from(new Set(jobs.map((j) => j.industry)))];

  const filteredJobs = jobs.filter((j) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      j.title.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.industry.toLowerCase().includes(q);
    const matchesInd = filterIndustry === "All" || j.industry === filterIndustry;
    return matchesSearch && matchesInd;
  });

  return (
    <div className="space-y-6">
      {/* ── Top Header & Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-blue-500" />
            Careers & Job Requisitions
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage live postings, responsibilities, requirements, comp packages, and candidate visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewJobModal}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Job
        </button>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* ── Search & Filter Strip ── */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search jobs by title, location, skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Industry:</span>
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            {industriesList.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Jobs Table ── */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 font-mono">
            Loading job listings...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-300">No jobs found matching criteria.</p>
            <button
              type="button"
              onClick={openNewJobModal}
              className="text-xs text-blue-400 hover:underline"
            >
              Post your first job requisition →
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase font-mono text-slate-500 bg-slate-900/50">
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Type / Level</th>
                  <th className="py-3 px-4">Target Comp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white text-sm">{job.title}</div>
                      <div className="text-[11px] font-mono text-slate-500">/{job.slug}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono text-[10px]">
                        {job.industry}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{job.location}</td>
                    <td className="py-4 px-4">
                      <div className="text-slate-300 font-medium">{job.type}</div>
                      <div className="text-[11px] text-slate-500">{job.experience}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">{job.salary}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/careers/${job.slug}`}
                          target="_blank"
                          title="Preview on live site"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(job)}
                          title="Edit job"
                          className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(job.id, job.title)}
                          title="Delete job"
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-200 animate-in zoom-in-95">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-white">
                {editingJob.id ? "Edit Job Requisition" : "Create New Job Requisition"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Job Title <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingJob.title || ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      setEditingJob({
                        ...editingJob,
                        title,
                        slug: editingJob.id ? editingJob.slug : slug,
                      });
                    }}
                    placeholder="e.g. Senior Cloud Solutions Architect"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    URL Slug <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingJob.slug || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Industry Vertical</label>
                  <select
                    value={editingJob.industry || "Information Technology"}
                    onChange={(e) => setEditingJob({ ...editingJob, industry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Automobiles">Automobiles & EV</option>
                    <option value="Oil & Gas">Oil & Gas</option>
                    <option value="Aeronautics">Aeronautics</option>
                    <option value="Management">Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Employment Type</label>
                  <select
                    value={editingJob.type || "Full-Time"}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        type: e.target.value as JobListing["type"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Direct Hire">Direct Hire</option>
                    <option value="Contract">Contract</option>
                    <option value="Contingent">Contingent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Experience Level</label>
                  <select
                    value={editingJob.experience || "Senior"}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        experience: e.target.value as JobListing["experience"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    placeholder="e.g. Austin, TX (Hybrid / Remote)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Target Compensation</label>
                  <input
                    type="text"
                    value={editingJob.salary || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                    placeholder="e.g. $160,000 - $190,000 / year"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Role Overview & Description</label>
                <textarea
                  rows={3}
                  value={editingJob.description || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  placeholder="Comprehensive description of the position mandate and project scope..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
                />
              </div>

              {/* Responsibilities list manager */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-slate-300 font-semibold">Key Responsibilities</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={respInput}
                    onChange={(e) => setRespInput(e.target.value)}
                    placeholder="Add a key responsibility..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (respInput.trim()) {
                          setEditingJob({
                            ...editingJob,
                            responsibilities: [...(editingJob.responsibilities || []), respInput.trim()],
                          });
                          setRespInput("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (respInput.trim()) {
                        setEditingJob({
                          ...editingJob,
                          responsibilities: [...(editingJob.responsibilities || []), respInput.trim()],
                        });
                        setRespInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {(editingJob.responsibilities || []).map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300"
                    >
                      <span className="flex-1 mr-2">{resp}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingJob({
                            ...editingJob,
                            responsibilities: editingJob.responsibilities?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements list manager */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-slate-300 font-semibold">Required Qualifications</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reqInput}
                    onChange={(e) => setReqInput(e.target.value)}
                    placeholder="Add a requirement / credential..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (reqInput.trim()) {
                          setEditingJob({
                            ...editingJob,
                            requirements: [...(editingJob.requirements || []), reqInput.trim()],
                          });
                          setReqInput("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (reqInput.trim()) {
                        setEditingJob({
                          ...editingJob,
                          requirements: [...(editingJob.requirements || []), reqInput.trim()],
                        });
                        setReqInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {(editingJob.requirements || []).map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300"
                    >
                      <span className="flex-1 mr-2">{req}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingJob({
                            ...editingJob,
                            requirements: editingJob.requirements?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits list manager */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-slate-300 font-semibold">Benefits & Perks</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={benInput}
                    onChange={(e) => setBenInput(e.target.value)}
                    placeholder="Add a benefit item..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (benInput.trim()) {
                          setEditingJob({
                            ...editingJob,
                            benefits: [...(editingJob.benefits || []), benInput.trim()],
                          });
                          setBenInput("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (benInput.trim()) {
                        setEditingJob({
                          ...editingJob,
                          benefits: [...(editingJob.benefits || []), benInput.trim()],
                        });
                        setBenInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {(editingJob.benefits || []).map((ben, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300"
                    >
                      <span className="flex-1 mr-2">{ben}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingJob({
                            ...editingJob,
                            benefits: editingJob.benefits?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
                >
                  {submitting ? "Saving..." : editingJob.id ? "Update Job" : "Publish Job Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
