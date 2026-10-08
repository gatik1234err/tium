"use client";

import React, { useState, useEffect } from "react";
import { HeartHandshake, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import type { ValueItem } from "@/lib/types";

export default function AdminValuesPage() {
  const [values, setValues] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<ValueItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [pointInput, setPointInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const loadValues = async () => {
    try {
      const res = await fetch("/api/admin/values");
      const data = await res.json();
      setValues(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadValues();
  }, []);

  const saveAllValues = async (newValues: ValueItem[]) => {
    try {
      const res = await fetch("/api/admin/values", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newValues),
      });
      if (!res.ok) throw new Error("Failed");
      setValues(newValues);
      setFeedback("Values updated successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch {
      alert("Error saving values.");
    }
  };

  const openNew = () => {
    setEditingValue({
      number: String(values.length + 1).padStart(2, "0"),
      title: "",
      tagline: "",
      description: "",
      points: [],
    });
    setEditingIndex(null);
    setPointInput("");
    setIsModalOpen(true);
  };

  const openEdit = (v: ValueItem, idx: number) => {
    setEditingValue({ ...v, points: [...(v.points || [])] });
    setEditingIndex(idx);
    setPointInput("");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingValue || !editingValue.title) return;

    let updated = [...values];
    if (editingIndex !== null) {
      updated[editingIndex] = editingValue;
    } else {
      updated.push(editingValue);
    }
    saveAllValues(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (idx: number) => {
    if (!confirm("Are you sure you want to delete this value?")) return;
    const updated = values.filter((_, i) => i !== idx);
    saveAllValues(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-blue-500" />
            Core Values & Culture Principles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage company values displayed on the About page and Homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Value
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {values.map((v, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-blue-500">{v.number}</span>
              <h3 className="font-bold text-white text-base font-display">{v.title}</h3>
              <p className="text-xs text-blue-400 font-mono">{v.tagline}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
              {v.points && v.points.length > 0 && (
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500 pt-1">
                  {v.points.map((p, pIdx) => (
                    <li key={pIdx}>{p}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openEdit(v, idx)}
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
        ))}
      </div>

      {isModalOpen && editingValue && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-white font-display">
              {editingIndex !== null ? "Edit Value" : "Add Value"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Index</label>
                  <input
                    type="text"
                    value={editingValue.number}
                    onChange={(e) => setEditingValue({ ...editingValue, number: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingValue.title}
                    onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingValue.tagline}
                  onChange={(e) => setEditingValue({ ...editingValue, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingValue.description}
                  onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white resize-none"
                />
              </div>

              {/* Points */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-slate-300 font-semibold">Key Points</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pointInput}
                    onChange={(e) => setPointInput(e.target.value)}
                    placeholder="Add a principle point..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (pointInput.trim()) {
                        setEditingValue({
                          ...editingValue,
                          points: [...(editingValue.points || []), pointInput.trim()],
                        });
                        setPointInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1 pt-1">
                  {(editingValue.points || []).map((p, pIdx) => (
                    <div key={pIdx} className="flex items-center justify-between p-1.5 rounded bg-slate-900 text-slate-300">
                      <span>{p}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingValue({
                            ...editingValue,
                            points: editingValue.points?.filter((_, i) => i !== pIdx),
                          })
                        }
                        className="text-red-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
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
                  Save Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
