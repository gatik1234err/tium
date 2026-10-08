"use client";

import React, { useState, useEffect } from "react";
import { Award, Plus, Edit2, Trash2, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import type { ReasonItem } from "@/lib/types";

export default function AdminReasonsPage() {
  const [reasons, setReasons] = useState<ReasonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReason, setEditingReason] = useState<ReasonItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const loadReasons = async () => {
    try {
      const res = await fetch("/api/admin/reasons");
      const data = await res.json();
      setReasons(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReasons();
  }, []);

  const saveAllReasons = async (newReasons: ReasonItem[]) => {
    try {
      const res = await fetch("/api/admin/reasons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReasons),
      });
      if (!res.ok) throw new Error("Failed");
      setReasons(newReasons);
      setFeedback("Reasons saved successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch {
      alert("Error saving reasons.");
    }
  };

  const openNew = () => {
    setEditingReason({
      number: String(reasons.length + 1).padStart(2, "0"),
      title: "",
      tagline: "",
      description: "",
      highlight: "Custom Differentiator",
    });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEdit = (r: ReasonItem, idx: number) => {
    setEditingReason({ ...r });
    setEditingIndex(idx);
    setIsModalOpen(true);
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReason || !editingReason.title) return;

    let updated = [...reasons];
    if (editingIndex !== null) {
      updated[editingIndex] = editingReason;
    } else {
      updated.push(editingReason);
    }
    saveAllReasons(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (idx: number) => {
    if (!confirm("Are you sure you want to remove this reason?")) return;
    const updated = reasons.filter((_, i) => i !== idx);
    saveAllReasons(updated);
  };

  const moveReason = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= reasons.length) return;
    const updated = [...reasons];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    saveAllReasons(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Award className="w-6 h-6 text-blue-500" />
            Why TIUM — Differentiators & Pillars
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage the core value pillars showcased on the &quot;Why TIUM&quot; page and home section.
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Pillar
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reasons.map((r, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-500">{r.number}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {r.highlight}
                </span>
              </div>
              <h3 className="font-bold text-white text-base font-display">{r.title}</h3>
              <p className="text-xs font-medium text-blue-400 font-mono">{r.tagline}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveReason(idx, -1)}
                  className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === reasons.length - 1}
                  onClick={() => moveReason(idx, 1)}
                  className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(r, idx)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingReason && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-white font-display">
              {editingIndex !== null ? "Edit Differentiator" : "Add Differentiator"}
            </h2>

            <form onSubmit={handleModalSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Index</label>
                  <input
                    type="text"
                    value={editingReason.number}
                    onChange={(e) => setEditingReason({ ...editingReason, number: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingReason.title}
                    onChange={(e) => setEditingReason({ ...editingReason, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Highlight Badge</label>
                <input
                  type="text"
                  value={editingReason.highlight}
                  onChange={(e) => setEditingReason({ ...editingReason, highlight: e.target.value })}
                  placeholder="e.g. 15+ Years Industry Experience"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingReason.tagline}
                  onChange={(e) => setEditingReason({ ...editingReason, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingReason.description}
                  onChange={(e) => setEditingReason({ ...editingReason, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Save Reason
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
